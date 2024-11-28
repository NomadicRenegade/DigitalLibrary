import os
import magic
import hashlib
from datetime import datetime
from typing import Generator, Dict, Any
from pathlib import Path
from app.database import session_scope
from app.models import File, Metadata
from app.utils.validators import allowed_file

class FileCrawler:
    """Crawls directories for media files and indexes them in the database"""
    
    def __init__(self, base_path: str):
        self.base_path = Path(base_path)
        self.mime = magic.Magic(mime=True)
        
    def crawl(self) -> Generator[Dict[str, Any], None, None]:
        """Crawl the base path for media files"""
        for path in self.base_path.rglob('*'):
            if path.is_file() and allowed_file(path.name):
                file_info = self._process_file(path)
                if file_info:
                    yield file_info
                    
    def _process_file(self, path: Path) -> Dict[str, Any]:
        """Process a single file and extract metadata"""
        try:
            stat = path.stat()
            mime_type = self.mime.from_file(str(path))
            
            with open(path, 'rb') as f:
                file_hash = hashlib.sha256(f.read()).hexdigest()
            
            return {
                'filename': path.name,
                'file_type': self._get_file_type(mime_type),
                'mime_type': mime_type,
                'size': stat.st_size,
                'created_at': datetime.fromtimestamp(stat.st_ctime),
                'updated_at': datetime.fromtimestamp(stat.st_mtime),
                'location': str(path.relative_to(self.base_path)),
                'hash': file_hash
            }
        except Exception as e:
            print(f"Error processing {path}: {str(e)}")
            return None
            
    def _get_file_type(self, mime_type: str) -> str:
        """Determine file type from MIME type"""
        if mime_type.startswith('image/'):
            return 'image'
        elif mime_type.startswith('audio/'):
            return 'audio'
        elif mime_type.startswith('video/'):
            return 'video'
        elif mime_type == 'application/pdf':
            return 'document'
        elif 'spreadsheet' in mime_type or 'excel' in mime_type:
            return 'spreadsheet'
        elif 'document' in mime_type or 'word' in mime_type:
            return 'document'
        else:
            return 'other'
            
    def sync_database(self):
        """Sync crawled files with database"""
        with session_scope() as session:
            for file_info in self.crawl():
                existing_file = session.query(File).filter_by(
                    location=file_info['location']
                ).first()
                
                if existing_file:
                    # Update if file has changed
                    if existing_file.hash != file_info['hash']:
                        for key, value in file_info.items():
                            setattr(existing_file, key, value)
                else:
                    # Create new file record
                    new_file = File(**file_info)
                    session.add(new_file)
                    
                    # Create metadata record
                    metadata = Metadata(
                        file=new_file,
                        content_type=file_info['mime_type'],
                        extra_data={}
                    )
                    session.add(metadata)