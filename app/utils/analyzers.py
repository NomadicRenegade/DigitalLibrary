from abc import ABC, abstractmethod
import tensorflow as tf
import numpy as np
from PIL import Image
import librosa
import cv2
import json

class FileAnalyzer(ABC):
    @abstractmethod
    def analyze(self, filepath: str) -> tuple[dict, float]:
        pass

class ImageAnalyzer(FileAnalyzer):
    def analyze(self, filepath: str) -> tuple[dict, float]:
        try:
            img = Image.open(filepath)
            width, height = img.size
            
            # Load pre-trained model for object detection
            model = tf.keras.applications.MobileNetV2(weights='imagenet')
            
            # Prepare image for model
            img_array = tf.keras.preprocessing.image.img_to_array(img.resize((224, 224)))
            img_array = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
            img_array = np.expand_dims(img_array, axis=0)
            
            # Get predictions
            predictions = model.predict(img_array)
            decoded_predictions = tf.keras.applications.mobilenet_v2.decode_predictions(predictions)
            
            metadata = {
                'dimensions': f'{width}x{height}',
                'format': img.format,
                'mode': img.mode,
                'detected_objects': [
                    {'label': label, 'confidence': float(score)}
                    for _, label, score in decoded_predictions[0][:3]
                ]
            }
            
            return metadata, float(decoded_predictions[0][0][2])
        except Exception as e:
            return {'error': str(e)}, 0.0

class AudioAnalyzer(FileAnalyzer):
    def analyze(self, filepath: str) -> tuple[dict, float]:
        try:
            # Load audio file
            y, sr = librosa.load(filepath)
            
            # Extract features
            tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
            spectral_centroids = librosa.feature.spectral_centroid(y=y, sr=sr)
            
            metadata = {
                'duration': float(len(y) / sr),
                'sample_rate': sr,
                'tempo': float(tempo),
                'mean_spectral_centroid': float(np.mean(spectral_centroids))
            }
            
            return metadata, 0.85  # Confidence score for audio analysis
        except Exception as e:
            return {'error': str(e)}, 0.0

class VideoAnalyzer(FileAnalyzer):
    def analyze(self, filepath: str) -> tuple[dict, float]:
        try:
            cap = cv2.VideoCapture(filepath)
            
            # Get video properties
            fps = cap.get(cv2.CAP_PROP_FPS)
            frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
            width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
            height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
            
            metadata = {
                'fps': float(fps),
                'frame_count': frame_count,
                'dimensions': f'{width}x{height}',
                'duration': float(frame_count / fps)
            }
            
            cap.release()
            return metadata, 0.90  # Confidence score for video analysis
        except Exception as e:
            return {'error': str(e)}, 0.0

def get_analyzer(file_type: str) -> FileAnalyzer:
    analyzers = {
        'png': ImageAnalyzer(),
        'jpg': ImageAnalyzer(),
        'jpeg': ImageAnalyzer(),
        'gif': ImageAnalyzer(),
        'mp3': AudioAnalyzer(),
        'wav': AudioAnalyzer(),
        'ogg': AudioAnalyzer(),
        'mp4': VideoAnalyzer(),
        'avi': VideoAnalyzer(),
        'mov': VideoAnalyzer()
    }
    
    return analyzers.get(file_type.lower(), ImageAnalyzer())