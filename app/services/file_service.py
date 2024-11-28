from typing import Dict, List, Optional
from app.models import File
from app.database import db_session
from sqlalchemy import or_
import os
import logging

logger = logging.getLogger(__name__)

class FileService:
    @staticmethod
    def get_files(
        file_type: Optional[str] = None,
        tag: Optional[str] = None,
        search: Optional[str] = None
    ) -> List[Dict]:
        """Get files with optional filtering"""
        try:
            with db_session() as session:
                query = session.query(File)
                
                if file_type:
                    query = query.filter(File.file_type == file_type)
                
                if tag:
                    query = query.filter(File.tags.any(name=tag))
                
                if search:
                    query = query.filter(or_(
                        File.filename.ilike(f'%{search}%'),
                        File.tags.any(name.ilike(f'%{search}%'))
                    ))
                
                files = query.all()
                return [file.to_dict() for file in files]
        except Exception as e:
            logger.error(f"Error getting files: {str(e)}")
            raise

    @staticmethod
    def get_file(file_id: int) -> Optional[Dict]:
        """Get single file by ID"""
        try:
            with db_session() as session:
                file = session.query(File).get(file_id)
                return file.to_dict() if file else None
        except Exception as e:
            logger.error(f"Error getting file {file_id}: {str(e)}")
            raise

    @staticmethod
    def create_file(filepath: str, filename: str) -> Dict:
        """Create new file entry"""
        try:
            file_size = os.path.getsize(filepath)
            file_type = filename.rsplit('.', 1)[1].lower()
            
            with db_session() as session:
                file = File(
                    filename=filename,
                    file_type=file_type,
                    size=file_size,
                    location=filepath
                )
                session.add(file)
                session.commit()
                return file.to_dict()
        except Exception as e:
            logger.error(f"Error creating file {filename}: {str(e)}")
            raise

    @staticmethod
    def bulk_update(file_ids: List[int], operation: Dict) -> List[Dict]:
        """Perform bulk operations on files"""
        try:
            with db_session() as session:
                files = session.query(File).filter(File.id.in_(file_ids)).all()
                
                for file in files:
                    if operation['type'] == 'move':
                        file.location = operation['targetLocation']
                    elif operation['type'] == 'tag':
                        file.tags.extend(operation['tags'])
                    elif operation['type'] == 'delete':
                        session.delete(file)
                
                session.commit()
                return [f.to_dict() for f in files]
        except Exception as e:
            logger.error(f"Error in bulk update: {str(e)}")
            raise