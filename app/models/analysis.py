from sqlalchemy import Column, Integer, Float, JSON, ForeignKey, String
from sqlalchemy.orm import relationship
from app.database import Base

class Analysis(Base):
    __tablename__ = 'analysis'
    
    id = Column(Integer, primary_key=True)
    file_id = Column(Integer, ForeignKey('files.id'), nullable=False)
    confidence = Column(Float, default=0.0)
    status = Column(String(50), default='pending')
    results = Column(JSON)  # Stores analysis results (objects, transcripts, etc.)
    model_version = Column(String(50))  # Tracks which ML model version was used
    
    # Relationship
    file = relationship("File", back_populates="analysis")