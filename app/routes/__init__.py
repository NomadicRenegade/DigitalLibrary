from flask import Blueprint
from .file_routes import file_bp
from .metadata_routes import metadata_bp
from .analysis_routes import analysis_bp

# Create main API blueprint
api_bp = Blueprint('api', __name__, url_prefix='/api')

# Register route blueprints
api_bp.register_blueprint(file_bp, url_prefix='/files')
api_bp.register_blueprint(metadata_bp, url_prefix='/metadata')
api_bp.register_blueprint(analysis_bp, url_prefix='/analysis')