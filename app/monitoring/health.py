from typing import Dict, Any
import psutil
from pathlib import Path
from app.database import engine
from redis import Redis
from config import settings

class HealthChecker:
    @staticmethod
    def check_system_health() -> Dict[str, Any]:
        return {
            'system': HealthChecker._check_system(),
            'database': HealthChecker._check_database(),
            'redis': HealthChecker._check_redis(),
            'storage': HealthChecker._check_storage(),
            'ml_models': HealthChecker._check_ml_models()
        }
    
    @staticmethod
    def _check_system() -> Dict[str, Any]:
        return {
            'status': 'healthy',
            'cpu_usage': psutil.cpu_percent(),
            'memory_usage': psutil.virtual_memory().percent,
            'disk_usage': psutil.disk_usage('/').percent
        }
    
    @staticmethod
    def _check_database() -> Dict[str, Any]:
        try:
            with engine.connect() as conn:
                conn.execute("SELECT 1")
            return {'status': 'healthy'}
        except Exception as e:
            return {'status': 'unhealthy', 'error': str(e)}
    
    @staticmethod
    def _check_redis() -> Dict[str, Any]:
        try:
            redis = Redis.from_url(settings.REDIS_URL)
            redis.ping()
            return {'status': 'healthy'}
        except Exception as e:
            return {'status': 'unhealthy', 'error': str(e)}
    
    @staticmethod
    def _check_storage() -> Dict[str, Any]:
        try:
            storage_path = Path(settings.UPLOAD_FOLDER)
            if not storage_path.exists():
                return {'status': 'unhealthy', 'error': 'Upload directory does not exist'}
            if not os.access(storage_path, os.W_OK):
                return {'status': 'unhealthy', 'error': 'Upload directory is not writable'}
            return {
                'status': 'healthy',
                'free_space': psutil.disk_usage(str(storage_path)).free
            }
        except Exception as e:
            return {'status': 'unhealthy', 'error': str(e)}
    
    @staticmethod
    def _check_ml_models() -> Dict[str, Any]:
        try:
            models_path = Path(settings.ML_MODELS_PATH)
            if not models_path.exists():
                return {'status': 'unhealthy', 'error': 'ML models directory does not exist'}
            return {'status': 'healthy'}
        except Exception as e:
            return {'status': 'unhealthy', 'error': str(e)}