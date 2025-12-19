import os
# Force TensorFlow to use legacy Keras (via tf-keras package) to load older .h5 models
os.environ['TF_USE_LEGACY_KERAS'] = '1'

import io
import numpy as np
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import tensorflow as tf
import tf_keras

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "my_pneumonia_detection_model.h5")
model = None
loading_error = None

def get_model():
    global model, loading_error
    if model is not None:
        return model
    
    try:
        if os.path.exists(MODEL_PATH):
            # Use tf_keras explicitly
            model = tf_keras.models.load_model(MODEL_PATH, compile=False)
            print("Model loaded successfully.")
            loading_error = None
        else:
            loading_error = f"File not found at {MODEL_PATH}"
            print(loading_error)
            
    except Exception as e:
        loading_error = f"Error loading model: {str(e)}"
        print(loading_error)
        
    return model

def preprocess_image(image: Image.Image):
    # Resize image to match model input
    # Common sizes are 150x150, 224x224. 
    # TODO: CONFIRM MODEL INPUT SHAPE
    target_size = (150, 150) 
    if model:
        try:
             # Try to infer input shape from model
            input_shape = model.input_shape[1:3]
            if input_shape:
                target_size = input_shape
        except:
            pass
            
    image = image.resize(target_size)
    image = image.convert("RGB") # Ensure 3 channels
    image_array = np.array(image) / 255.0 # Normalize
    image_array = np.expand_dims(image_array, axis=0) # Add batch dimension
    return image_array

@app.get("/")
def read_root():
    return {"message": "Pneumonia Detection API is running"}

@app.get("/status")
def get_status():
    global model, loading_error
    # Attempt load if not loaded
    if model is None:
        get_model()
        
    return {
        "model_loaded": model is not None,
        "loading_error": loading_error,
        "model_path": MODEL_PATH,
        "exists": os.path.exists(MODEL_PATH),
        "tf_version": tf.__version__
    }

@app.post("/predict")
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    global model
    current_model = get_model()
    
    if current_model is None:
        raise HTTPException(status_code=503, detail=f"Model not loaded. Error: {loading_error}")
    
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        processed_image = preprocess_image(image)
        
        prediction = model.predict(processed_image)
        # Assuming binary classification: 0 = Normal, 1 = Pneumonia (or vice versa depending on training)
        # Typically Pneumonia > 0.5
        score = float(prediction[0][0])
        result = "Pneumonia" if score > 0.5 else "Normal"
        confidence = score if score > 0.5 else 1 - score
        
        return {
            "prediction": result,
            "confidence": confidence,
            "raw_score": score
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")
