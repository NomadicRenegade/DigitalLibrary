from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.database import Base

class File(Base):
    __tablename__ = 'files'
    
    id = Column(Integer, primary_key=True)
    filename = Column(String(255), nullable=False)
    file_type = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    upload_date = Column(DateTime, default=datetime.utcnow)
    size = Column(Integer, nullable=False)
    status = Column(String(50), default='pending')
    location = Column(String(512), nullable=False)
    
    # Relationships
    metadata = relationship("Metadata", back_populates="file", uselist=False)
    analysis = relationship("Analysis", back_populates="file", uselist=False)
    tags = relationship("Tag", secondary="file_tags", back_populates="files")