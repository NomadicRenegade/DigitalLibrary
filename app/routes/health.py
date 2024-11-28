from flask import Blueprint, jsonify
from app.database import engine
from redis import Redis
from config import settings

health_bp = Blueprint('health', __name__)

@health_bp.route('/health', methods=['GET'])
def health_check():
    """Check the health of all system components"""
    status = {
        'status': 'healthy',
        'components': {
            'database': check_database(),
            'redis': check_redis(),
            'storage': check_storage(),
            'ml_models': check_ml_models()
        }
    }
    
    # If any component is unhealthy, mark overall status as unhealthy
    if any(v['status'] == 'unhealthy' for v in status['components'].values()):
        status['status'] = 'unhealthy'
    
    return jsonify(status)

def check_database():
    try:
        with engine.connect() as conn:
            conn.execute("SELECT 1")
        return {'status': 'healthy'}
    except Exception as e:
        return {'status': 'unhealthy', 'error': str(e)}

def check_redis():
    try:
        redis = Redis.from_url(settings.REDIS_URL)
        redis.ping()
        return {'status': 'healthy'}
    except Exception as e:
        return {'status': 'unhealthy', 'error': str(e)}

def check_storage():
    try:
        storage_path = Path(settings.UPLOAD_FOLDER)
        if not storage_path.exists():
            return {'status': 'unhealthy', 'error': 'Upload directory does not exist'}
        if not os.access(storage_path, os.W_OK):
            return {'status': 'unhealthy', 'error': 'Upload directory is not writable'}
        return {'status': 'healthy'}
    except Exception as e:
        return {'status': 'unhealthy', 'error': str(e)}

def check_ml_models():
    try:
        models_path = Path(settings.ML_MODELS_PATH)
        if not models_path.exists():
            return {'status': 'unhealthy', 'error': 'ML models directory does not exist'}
        # Add specific model checks here
        return {'status': 'healthy'}
    except Exception as e:
        return {'status': 'unhealthy', 'error': str(e)}