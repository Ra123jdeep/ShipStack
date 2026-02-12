from pydantic_settings import BaseSettings
from typing import List, Union

class Settings(BaseSettings):
    PROJECT_NAME: str = "ShipStack"
    API_V1_STR: str = "/api/v1"
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000"]
    
    # Database
    DATABASE_URL: str = "sqlite:///./sql_app.db"
    
    # Validation logic to allow env var override
    @property
    def SQL_ALCHEMY_DATABASE_URL(self):
        import os
        return os.getenv("DATABASE_URL", self.DATABASE_URL)

    # JWT
    SECRET_KEY: str = "SUPER_SECRET_KEY_CHANGE_IN_PRODUCTION" # Use env var in prod
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        case_sensitive = True

settings = Settings()
