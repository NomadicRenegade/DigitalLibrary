from abc import ABC, abstractmethod
from typing import Dict, Tuple

class BaseAnalyzer(ABC):
    """Base class for all media analyzers"""
    
    @abstractmethod
    def analyze(self, file_path: str) -> Tuple[Dict, float]:
        """
        Analyze the media file and return metadata and confidence score
        
        Args:
            file_path: Path to the media file
            
        Returns:
            Tuple containing:
                - Dictionary of extracted metadata
                - Confidence score (0-1)
        """
        pass
    
    @abstractmethod
    def get_model_version(self) -> str:
        """Return the version of the ML model being used"""
        pass