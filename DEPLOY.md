# ShipStack Split Deployment Guide

This project uses a split architecture:
- **Frontend**: Next.js on Vercel
- **Backend**: FastAPI on Render (or any Docker/Python host)

## Prerequisites

1.  **Vercel Account**
2.  **Render Account** (or similar)
3.  **Supabase Account** (for Database)

## Part 1: Deploy Backend (Render)

1.  **Create Web Service**:
    -   Connect your GitHub repo.
    -   **Root Directory**: `backend`
    -   **Runtime**: Python 3
    -   **Build Command**: `pip install -r requirements.txt`
    -   **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port 10000`

2.  **Environment Variables**:
    -   `DATABASE_URL`: Your Supabase connection string (`postgresql://...`).
    -   `SECRET_KEY`: A strong random string.
    -   `FRONTEND_URL`: Your Vercel frontend URL (add this *after* deploying frontend).
    -   `PYTHON_VERSION`: `3.11.0`

3.  **Deploy**:
    -   Click "Create Web Service".
    -   Wait for deployment. **Copy the backend URL** (e.g., `https://shipstack-api.onrender.com`).

## Part 2: Deploy Frontend (Vercel)

1.  **Project Settings**:
    -   **Root Directory**: `frontend` (Edit in General settings).
    -   **Build Command**: `next build` (Default)
    -   **Output Directory**: `.next` (Default)

2.  **Environment Variables**:
    -   `NEXT_PUBLIC_API_URL`: Paste your **Render Backend URL** (no trailing slash, e.g., `https://shipstack-api.onrender.com`).

3.  **Deploy**:
    -   Push to main or run `vercel --prod` from the `frontend` directory.

## Part 3: Final Wiring

1.  Go back to **Render Dashboard**.
2.  Add/Update `FRONTEND_URL` env var with your new Vercel URL (e.g., `https://shipstack.vercel.app`).
3.  Redeploy Backend (if needed) for CORS to take effect specifically for your domain (default is `*` so it might just work).

## Local Development

-   **Frontend**:
    ```bash
    cd frontend
    npm run dev
    ```
    (Connects to localhost:8000 by default via next.config.ts rewrites)

-   **Backend**:
    ```bash
    cd backend
    uvicorn app.main:app --reload
    ```
