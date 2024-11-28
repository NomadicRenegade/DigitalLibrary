from flask import Blueprint, jsonify
from app.services.analysis_service import AnalysisService

analysis_bp = Blueprint('analysis', __name__)

@analysis_bp.route('/<int:file_id>', methods=['POST'])
async def analyze_file(file_id: int):
    """Trigger analysis for a file"""
    try:
        result = await AnalysisService.process_file(file_id)
        if not result:
            return jsonify({'error': 'Analysis failed'}), 400
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@analysis_bp.route('/<int:file_id>/status', methods=['GET'])
def get_analysis_status(file_id: int):
    """Get analysis status for a file"""
    try:
        status = AnalysisService.get_status(file_id)
        if not status:
            return jsonify({'error': 'Analysis not found'}), 404
        return jsonify(status), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500