import pytesseract
from PIL import Image
from typing import Dict, Any
from ..core.base_model import BaseModel

class TextExtractor(BaseModel):
    def __init__(self):
        super().__init__()
        
    def load(self, model_path: str):
        # Tesseract doesn't need explicit loading
        pass
        
    def preprocess(self, image: Image.Image) -> Image.Image:
        # Convert to grayscale and apply basic preprocessing
        return image.convert('L')
        
    def predict(self, image: Image.Image) -> Dict[str, Any]:
        text = pytesseract.image_to_string(image)
        data = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)
        
        return {
            'text': text,
            'data': data
        }
        
    def postprocess(self, results: Dict[str, Any]) -> Dict[str, Any]:
        words = []
        confidences = []
        
        for i in range(len(results['data']['text'])):
            if results['data']['text'][i].strip():
                words.append(results['data']['text'][i])
                confidences.append(float(results['data']['conf'][i]))
                
        return {
            'extracted_text': results['text'],
            'words': words,
            'word_confidences': confidences,
            'average_confidence': sum(confidences) / len(confidences) if confidences else 0
        }