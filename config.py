from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/digital_library"
    
    # File Storage
    UPLOAD_FOLDER: str = "uploads"
    MAX_CONTENT_LENGTH: int = 16 * 1024 * 1024  # 16MB
    ALLOWED_EXTENSIONS: set = {'png', 'jpg', 'jpeg', 'gif', 'mp3', 'wav', 'ogg', 'mp4', 'avi', 'mov'}
    
    # ML Models
    ML_MODELS_PATH: str = "app/ml/models"
    IMAGE_MODEL_PATH: Optional[str] = None
    AUDIO_MODEL_PATH: Optional[str] = None
    VIDEO_MODEL_PATH: Optional[str] = None
    
    # Processing
    ANALYSIS_QUEUE_SIZE: int = 100
    MAX_WORKERS: int = 4
    
    # Security
    SECRET_KEY: str = os.urandom(24).hex()
    CORS_ORIGINS: list = ["http://localhost:3000"]
    
    class Config:
        env_file = ".env"

settings = Settings()