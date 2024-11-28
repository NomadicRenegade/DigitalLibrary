from typing import Optional
from .base_analyzer import BaseAnalyzer
from .image_analyzer import ImageAnalyzer
from .audio_analyzer import AudioAnalyzer
from .video_analyzer import VideoAnalyzer

def get_analyzer(file_type: str) -> Optional[BaseAnalyzer]:
    """Factory function to get appropriate analyzer based on file type"""
    
    analyzers = {
        'image': ImageAnalyzer,
        'audio': AudioAnalyzer,
        'video': VideoAnalyzer
    }
    
    analyzer_class = analyzers.get(file_type.lower())
    return analyzer_class() if analyzer_class else None