from typing import Dict, Any
from pathlib import Path
from PIL import Image
import logging
from .models.image_classifier import ImageClassifier
from .models.object_detector import ObjectDetector
from .models.text_extractor import TextExtractor
from .models.audio_analyzer import AudioAnalyzer

logger = logging.getLogger(__name__)

class AnalysisPipeline:
    """Orchestrates the ML analysis pipeline for different file types"""
    
    def __init__(self):
        self.image_classifier = ImageClassifier()
        self.object_detector = ObjectDetector()
        self.text_extractor = TextExtractor()
        self.audio_analyzer = AudioAnalyzer()
        
        # Load all models
        self._load_models()
        
    def _load_models(self):
        """Load all ML models"""
        try:
            self.image_classifier.load(None)  # Model paths would come from config
            self.object_detector.load(None)
            self.text_extractor.load(None)
            self.audio_analyzer.load(None)
        except Exception as e:
            logger.error(f"Error loading models: {str(e)}")
            raise
            
    def analyze_image(self, image_path: str) -> Dict[str, Any]:
        """Run complete image analysis"""
        try:
            image = Image.open(image_path)
            
            # Run all image analysis tasks
            classification = self.image_classifier.predict(
                self.image_classifier.preprocess(image)
            )
            objects = self.object_detector.predict(image_path)
            text = self.text_extractor.predict(image)
            
            return {
                'classification': self.image_classifier.postprocess(classification),
                'objects': self.object_detector.postprocess(objects),
                'text': self.text_extractor.postprocess(text)
            }
        except Exception as e:
            logger.error(f"Error analyzing image {image_path}: {str(e)}")
            return {'error': str(e)}
            
    def analyze_audio(self, audio_path: str) -> Dict[str, Any]:
        """Run complete audio analysis"""
        try:
            audio_data = self.audio_analyzer.preprocess(audio_path)
            features = self.audio_analyzer.predict(audio_data)
            
            return self.audio_analyzer.postprocess(features)
        except Exception as e:
            logger.error(f"Error analyzing audio {audio_path}: {str(e)}")
            return {'error': str(e)}
            
    def analyze_file(self, file_path: str, file_type: str) -> Dict[str, Any]:
        """Analyze any supported file type"""
        try:
            if file_type == 'image':
                return self.analyze_image(file_path)
            elif file_type == 'audio':
                return self.analyze_audio(file_path)
            else:
                raise ValueError(f"Unsupported file type: {file_type}")
        except Exception as e:
            logger.error(f"Error analyzing file {file_path}: {str(e)}")
            return {'error': str(e)}