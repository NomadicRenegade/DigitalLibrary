from flask import Blueprint, request, jsonify
from app.services.metadata_service import MetadataService

metadata_bp = Blueprint('metadata', __name__)

@metadata_bp.route('/<int:file_id>', methods=['GET'])
def get_metadata(file_id: int):
    """Get metadata for a file"""
    try:
        metadata = MetadataService.get_metadata(file_id)
        if not metadata:
            return jsonify({'error': 'Metadata not found'}), 404
        return jsonify(metadata), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@metadata_bp.route('/<int:file_id>', methods=['PUT'])
def update_metadata(file_id: int):
    """Update metadata for a file"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        result = MetadataService.update_metadata(file_id, data)
        if not result:
            return jsonify({'error': 'File not found'}), 404
            
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500