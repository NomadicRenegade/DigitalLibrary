from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from .services import file_service
from .utils.validators import allowed_file
from config import settings

api_bp = Blueprint('api', __name__)

@api_bp.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
        
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
        
    if not allowed_file(file.filename):
        return jsonify({'error': 'File type not allowed'}), 400
        
    filename = secure_filename(file.filename)
    filepath = os.path.join(settings.UPLOAD_FOLDER, filename)
    file.save(filepath)
    
    # Process file and store metadata
    result = file_service.process_file(filepath, filename)
    
    return jsonify(result), 201

@api_bp.route('/files', methods=['GET'])
def get_files():
    files = file_service.get_all_files()
    return jsonify(files)