from sqlalchemy import Column, Integer, String, JSON, ForeignKey, Float, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class Metadata(Base):
    __tablename__ = 'metadata'
    
    id = Column(Integer, primary_key=True)
    file_id = Column(Integer, ForeignKey('files.id'), nullable=False)
    content_type = Column(String(100))
    dimensions = Column(String(100))  # For images/videos
    duration = Column(Float)          # For audio/video
    format = Column(String(50))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Document-specific fields
    page_count = Column(Integer)      # For PDFs and documents
    word_count = Column(Integer)      # For text documents
    has_images = Column(Boolean)      # For PDFs and documents
    sheet_count = Column(Integer)     # For spreadsheets
    
    # Additional metadata stored as JSON
    extra_data = Column(JSON)
    
    # Relationship
    file = relationship("File", back_populates="metadata")