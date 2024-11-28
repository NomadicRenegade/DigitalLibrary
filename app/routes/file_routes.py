from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from typing import List
from app.services.file_service import FileService
from app.utils.validators import allowed_file
from config import settings

file_bp = Blueprint('files', __name__)

@file_bp.route('/', methods=['GET'])
def get_files():
    """Get all files with optional filtering"""
    try:
        file_type = request.args.get('type')
        tag = request.args.get('tag')
        search = request.args.get('search')
        
        files = FileService.get_files(
            file_type=file_type,
            tag=tag,
            search=search
        )
        return jsonify(files), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@file_bp.route('/<int:file_id>', methods=['GET'])
def get_file(file_id: int):
    """Get single file by ID"""
    try:
        file = FileService.get_file(file_id)
        if not file:
            return jsonify({'error': 'File not found'}), 404
        return jsonify(file), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@file_bp.route('/', methods=['POST'])
def upload_file():
    """Upload a new file"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
            
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
            
        if not allowed_file(file.filename):
            return jsonify({'error': 'File type not allowed'}), 400
            
        filename = secure_filename(file.filename)
        filepath = os.path.join(settings.UPLOAD_FOLDER, filename)
        
        # Save file and create database entry
        file.save(filepath)
        result = FileService.create_file(filepath, filename)
        
        return jsonify(result), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@file_bp.route('/bulk', methods=['POST'])
def bulk_operation():
    """Perform bulk operations on files"""
    try:
        data = request.get_json()
        if not data or 'fileIds' not in data or 'operation' not in data:
            return jsonify({'error': 'Invalid request data'}), 400
            
        file_ids: List[int] = data['fileIds']
        operation: dict = data['operation']
        
        result = FileService.bulk_update(file_ids, operation)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500