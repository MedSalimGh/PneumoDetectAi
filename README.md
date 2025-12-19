# Pneumonia Detection System

This project is a web-based application for detecting pneumonia from chest X-ray images using a Convolutional Neural Network (CNN). It consists of a FastAPI backend to serve the model and a React (Vite) frontend for the user interface.

## Project Structure

- `backend/`: Contains the FastAPI application and the machine learning model.
- `frontend/`: Contains the React application.

## Setup Instructions

### Backend

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  (Optional but recommended) Create and activate a virtual environment:
    ```bash
    python -m venv .venv
    # Windows
    .venv\Scripts\activate
    # Mac/Linux
    source .venv/bin/activate
    ```

3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4.  Run the server:
    ```bash
    uvicorn main:app --reload
    ```
    The API will be available at `http://localhost:8000`.

### Frontend

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Usage

1.  Start both the backend and frontend servers.
2.  Open the frontend application in your browser.
3.  Upload a chest X-ray image (JPEG/PNG).
4.  The system will process the image and display the prediction (Normal or Pneumonia) along with a confidence score.
