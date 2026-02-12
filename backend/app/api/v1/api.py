from fastapi import APIRouter
from app.api.v1.endpoints import tools, stacks, analytics, auth

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(tools.router, prefix="/tools", tags=["tools"])
api_router.include_router(stacks.router, prefix="/stacks", tags=["stacks"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
