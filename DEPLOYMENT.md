# 🚀 Deployment Guide for Render.com (Single Service)

This guide shows you how to deploy both the **Frontend** and **Backend** as a single **Web Service** on Render. This saves costs and simplifies configuration.

## 1. Prepare your Repository

Ensure all your code is pushed to your GitHub repository:
```bash
git add .
git commit -m "Configure single-server deployment"
git push origin main
```

## 2. Create Web Service on Render

1.  Go to **[Render Dashboard](https://dashboard.render.com/)** and click **New +** -> **Web Service**.
2.  Connect your GitHub repository.
3.  Use the following settings:

| Setting | Value |
| :--- | :--- |
| **Name** | `pneumonia-detection-app` (or your choice) |
| **Runtime** | **Python 3** |
| **Build Command** | `./render_build.sh` |
| **Start Command** | `uvicorn backend.main:app --host 0.0.0.0 --port $PORT` |
| **Instance Type** | Free (or Starter for better performance) |

4.  **Important**: Scroll down to **Advanced** (or Environment Variables) and add:

    | Key | Value |
    | :--- | :--- |
    | `PYTHON_VERSION` | `3.10.0` |
    | `TF_USE_LEGACY_KERAS` | `1` |

5.  Click **Create Web Service**.

## 3. How it Works

*   The **Build Command** (`./render_build.sh`) installs Node.js, builds your React frontend, and then installs Python dependencies.
*   The **Start Command** runs your FastAPI backend.
*   The **Backend** is configured to serve the frontend files (from `frontend/dist`) alongside the API.

## 4. Troubleshooting

*   **Build fails?** Check the logs. If it complains about permission denied for the script, you might need to run `git update-index --chmod=+x render_build.sh` locally and push again, although Render usually handles this.
*   **"Frontend not built" error?** Ensure the build script ran successfully and created the `frontend/dist` directory.
