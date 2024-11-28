import torch
from typing import Dict, Any, List
from ..core.base_model import BaseModel

class ObjectDetector(BaseModel):
    def __init__(self):
        super().__init__()
        
    def load(self, model_path: str):
        self.model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
        self.model.to(self.device)
        
    def preprocess(self, image_path: str) -> str:
        return image_path  # YOLOv5 handles preprocessing internally
        
    def predict(self, image_path: str) -> List[Dict[str, Any]]:
        results = self.model(image_path)
        return results.pandas().xyxy[0].to_dict('records')
        
    def postprocess(self, detections: List[Dict[str, Any]]) -> Dict[str, Any]:
        objects = []
        for det in detections:
            objects.append({
                'label': det['name'],
                'confidence': det['confidence'],
                'bbox': [det['xmin'], det['ymin'], det['xmax'], det['ymax']]
            })
            
        return {
            'objects': objects,
            'count': len(objects)
        }