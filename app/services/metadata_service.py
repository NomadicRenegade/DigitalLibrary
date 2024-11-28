from typing import Dict, List, Optional
from app.models import File, Metadata, Tag
from app.database import db_session
from sqlalchemy.orm import joinedload
import logging

logger = logging.getLogger(__name__)

class MetadataService:
    @staticmethod
    def update_metadata(file_id: int, metadata: Dict) -> Optional[Dict]:
        """Update file metadata"""
        try:
            with db_session() as session:
                file = session.query(File).get(file_id)
                if not file:
                    return None
                
                # Update or create metadata
                if file.metadata:
                    for key, value in metadata.items():
                        setattr(file.metadata, key, value)
                else:
                    meta = Metadata(file_id=file.id, **metadata)
                    session.add(meta)
                
                session.commit()
                return metadata
        except Exception as e:
            logger.error(f"Error updating metadata for file {file_id}: {str(e)}")
            return None
    
    @staticmethod
    def get_metadata(file_id: int) -> Optional[Dict]:
        """Get file metadata"""
        try:
            with db_session() as session:
                file = session.query(File)\
                    .options(joinedload(File.metadata))\
                    .get(file_id)
                    
                if not file or not file.metadata:
                    return None
                    
                return {
                    'content_type': file.metadata.content_type,
                    'dimensions': file.metadata.dimensions,
                    'duration': file.metadata.duration,
                    'format': file.metadata.format,
                    'extra_data': file.metadata.extra_data
                }
        except Exception as e:
            logger.error(f"Error retrieving metadata for file {file_id}: {str(e)}")
            return None