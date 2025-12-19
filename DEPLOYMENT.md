# 🚀 Deployment Guide for Render.com

This project is set up to be deployed easily on Render. You will need to create two separate services: one for the **Backend** and one for the **Frontend**.

## 1. Prepare your Repository

Ensure all your code is pushed to your GitHub repository:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

## 2. Deploy Backend (Web Service)

1.  Go to **[Render Dashboard](https://dashboard.render.com/)** and click **New +** -> **Web Service**.
2.  Connect your GitHub repository.
3.  Use the following settings:

| Setting | Value |
| :--- | :--- |
| **Name** | `pneumonia-backend` (or unique name) |
| **Root Directory** | `backend` |
| **Runtime** | **Python 3** |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| **Instance Type** | Free (or Starter if you need more RAM) |

4.  **Important**: Scroll down to **Advanced** (or Environment Variables) and add:
    *   **Key**: `PYTHON_VERSION`
    *   **Value**: `3.10.0` (or `3.11.0`)
    *   **Key**: `TF_USE_LEGACY_KERAS`
    *   **Value**: `1`

5.  Click **Create Web Service**.
6.  **Wait** for the deploy to finish. Copy the URL (e.g., `https://pneumonia-backend.onrender.com`). **You need this for the frontend!**

## 3. Deploy Frontend (Static Site)

1.  Go to Dashboard -> **New +** -> **Static Site**.
2.  Connect the **same** repository.
3.  Use the following settings:

| Setting | Value |
| :--- | :--- |
| **Name** | `pneumonia-frontend` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

4.  **Environment Variables**:
    *   **Key**: `VITE_API_URL`
    *   **Value**: `https://pneumonia-backend.onrender.com` (The backend URL you copied earlier, **no trailing slash**)

5.  Click **Create Static Site**.

## 4. Final Check

Once both are live:
1.  Open your **Frontend URL**.
2.  Upload an image.
3.  It should successfully talk to your **Backend URL** and give you a prediction!
