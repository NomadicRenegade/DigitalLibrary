from flask import Flask
from flask_cors import CORS
from .database import init_db
from .routes import api_bp
import os
from config import settings

def create_app():
    """Create and configure Flask application"""
    app = Flask(__name__)
    CORS(app)
    
    # Configure app
    app.config['UPLOAD_FOLDER'] = settings.UPLOAD_FOLDER
    app.config['MAX_CONTENT_LENGTH'] = settings.MAX_CONTENT_LENGTH
    
    # Ensure upload directory exists
    os.makedirs(settings.UPLOAD_FOLDER, exist_ok=True)
    
    # Initialize database
    init_db()
    
    # Register blueprints
    app.register_blueprint(api_bp)
    
    return app