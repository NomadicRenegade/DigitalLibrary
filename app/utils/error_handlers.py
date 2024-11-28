from flask import jsonify
from werkzeug.exceptions import HTTPException
import logging
import traceback

logger = logging.getLogger(__name__)

def register_error_handlers(app):
    @app.errorhandler(Exception)
    def handle_exception(e):
        """Handle all unhandled exceptions"""
        if isinstance(e, HTTPException):
            response = {
                'error': e.description,
                'status_code': e.code
            }
            status_code = e.code
        else:
            logger.error(f"Unhandled exception: {str(e)}\n{traceback.format_exc()}")
            response = {
                'error': 'An unexpected error occurred',
                'status_code': 500
            }
            status_code = 500
            
        return jsonify(response), status_code

def setup_logging(app):
    """Configure application logging"""
    handler = logging.StreamHandler()
    handler.setFormatter(logging.Formatter(
        '[%(asctime)s] %(levelname)s in %(module)s: %(message)s'
    ))
    app.logger.addHandler(handler)
    app.logger.setLevel(logging.INFO)