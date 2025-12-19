import os
os.environ['TF_USE_LEGACY_KERAS'] = '1'
import tensorflow as tf
import sys

MODEL_PATH = "my_pneumonia_detection_model.h5"

print(f"Python version: {sys.version}")
print(f"TensorFlow version: {tf.__version__}")
print(f"Checking for model file at: {os.path.abspath(MODEL_PATH)}")

if not os.path.exists(MODEL_PATH):
    print("ERROR: Model file not found!")
    sys.exit(1)

try:
    print("Attempting to load model...")
    model = tf.keras.models.load_model(MODEL_PATH, compile=False)
    print("SUCCESS: Model loaded successfully.")
    if hasattr(model, 'summary'):
        model.summary()
except Exception as e:
    print("ERROR: Failed to load model.")
    print(f"Exception type: {type(e).__name__}")
    print(f"Exception message: {e}")
    import traceback
    traceback.print_exc()
