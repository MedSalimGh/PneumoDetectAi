import os
# Force TensorFlow to use legacy Keras (via tf-keras package) to load older .h5 models
os.environ['TF_USE_LEGACY_KERAS'] = '1'

import io
import numpy as np
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from PIL import Image
import tensorflow as tf
import tf_keras

app = FastAPI()

# Enable CORS for frontend communication (still useful for local dev or if hosted separately)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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

# Mount the frontend's static assets
# Note: Vite builds to frontend/dist. We assume this structure relative to backend/main.py
frontend_dist = os.path.join(os.path.dirname(BASE_DIR), "frontend", "dist")

if os.path.exists(frontend_dist):
    # Mount assets (JS, CSS, images)
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")

@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    # If the file exists in dist, serve it (e.g. favicon.ico)
    possible_file = os.path.join(frontend_dist, full_path)
    if os.path.exists(possible_file) and os.path.isfile(possible_file):
        return FileResponse(possible_file)
    
    # Otherwise, return index.html for SPA routing
    index_path = os.path.join(frontend_dist, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"error": "Frontend not built. Run 'npm run build' in frontend directory."}

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
