from typing import Dict, Optional
from app.models import File, Analysis
from app.ml import get_analyzer
from app.database import db_session
import asyncio
import logging

logger = logging.getLogger(__name__)

class AnalysisService:
    @staticmethod
    async def process_file(file_id: int) -> Optional[Dict]:
        """Process a file asynchronously using appropriate analyzer"""
        try:
            with db_session() as session:
                file = session.query(File).get(file_id)
                if not file:
                    return None
                
                # Get appropriate analyzer
                analyzer = get_analyzer(file.file_type)
                if not analyzer:
                    raise ValueError(f"No analyzer available for {file.file_type}")
                
                # Update analysis status
                analysis = Analysis(
                    file_id=file.id,
                    status='processing',
                    model_version=analyzer.get_model_version()
                )
                session.add(analysis)
                session.commit()
                
                # Perform analysis
                try:
                    metadata, confidence = await asyncio.to_thread(
                        analyzer.analyze,
                        file.location
                    )
                    
                    # Update analysis results
                    analysis.status = 'completed'
                    analysis.confidence = confidence
                    analysis.results = metadata
                    session.commit()
                    
                    return metadata
                    
                except Exception as e:
                    logger.error(f"Analysis failed for file {file_id}: {str(e)}")
                    analysis.status = 'failed'
                    session.commit()
                    raise
                    
        except Exception as e:
            logger.error(f"Error processing file {file_id}: {str(e)}")
            return None