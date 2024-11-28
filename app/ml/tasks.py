from celery import shared_task
from .pipeline import AnalysisPipeline
from app.database import session_scope
from app.models import File, Analysis
import logging

logger = logging.getLogger(__name__)

@shared_task
def analyze_file_task(file_id: int):
    """Celery task to analyze a file asynchronously"""
    try:
        pipeline = AnalysisPipeline()
        
        with session_scope() as session:
            file = session.query(File).get(file_id)
            if not file:
                raise ValueError(f"File not found: {file_id}")
                
            # Update analysis status
            analysis = Analysis(
                file_id=file.id,
                status='processing'
            )
            session.add(analysis)
            session.commit()
            
            try:
                # Run analysis
                results = pipeline.analyze_file(file.location, file.file_type)
                
                # Update analysis results
                analysis.status = 'completed'
                analysis.results = results
                analysis.confidence = results.get('confidence', 0.0)
                
            except Exception as e:
                logger.error(f"Analysis failed for file {file_id}: {str(e)}")
                analysis.status = 'failed'
                analysis.error = str(e)
                
            session.commit()
            
    except Exception as e:
        logger.error(f"Error in analysis task for file {file_id}: {str(e)}")
        raise