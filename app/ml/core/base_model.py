from abc import ABC, abstractmethod
from typing import Dict, Any
import tensorflow as tf
import torch
import numpy as np

class BaseModel(ABC):
    """Base class for all ML models"""
    
    def __init__(self):
        self.model = None
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        
    @abstractmethod
    def load(self, model_path: str):
        """Load model from path"""
        pass
        
    @abstractmethod
    def predict(self, input_data: Any) -> Dict[str, Any]:
        """Make predictions"""
        pass
        
    @abstractmethod
    def preprocess(self, input_data: Any) -> Any:
        """Preprocess input data"""
        pass
        
    @abstractmethod
    def postprocess(self, predictions: Any) -> Dict[str, Any]:
        """Postprocess model output"""
        pass
        
    def get_version(self) -> str:
        """Get model version"""
        return getattr(self.model, 'version', 'unknown')