from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.api import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="ShipStack Backend API - The AI Builder Operating System",
    version="0.1.0",
)

# Create tables
from app.core.database import engine, Base
from app.models import stack, tool  # Import models to register them
Base.metadata.create_all(bind=engine)

# Set all CORS enabled origins
# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    origins = settings.BACKEND_CORS_ORIGINS
    # Also allow usage of FRONTEND_URL env var
    import os
    frontend_url = os.getenv("FRONTEND_URL")
    if frontend_url:
        origins.append(frontend_url)
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"], # Allow all for now to avoid CORS issues during initial setup
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {"message": "Welcome to ShipStack API", "version": "0.1.0"}

# Trigger reload
