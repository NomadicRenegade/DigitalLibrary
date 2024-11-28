import torch
import torchvision.transforms as transforms
from PIL import Image
from typing import Dict, Any
from ..core.base_model import BaseModel

class ImageClassifier(BaseModel):
    def __init__(self):
        super().__init__()
        self.transform = transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])
        
    def load(self, model_path: str):
        self.model = torch.hub.load('pytorch/vision:v0.10.0', 'resnet50', pretrained=True)
        self.model.eval()
        self.model.to(self.device)
        
    def preprocess(self, image: Image.Image) -> torch.Tensor:
        return self.transform(image).unsqueeze(0).to(self.device)
        
    def predict(self, input_tensor: torch.Tensor) -> torch.Tensor:
        with torch.no_grad():
            return self.model(input_tensor)
            
    def postprocess(self, predictions: torch.Tensor) -> Dict[str, Any]:
        probabilities = torch.nn.functional.softmax(predictions[0], dim=0)
        confidence, class_idx = torch.max(probabilities, dim=0)
        
        return {
            'class_id': class_idx.item(),
            'confidence': confidence.item(),
            'probabilities': probabilities.cpu().numpy().tolist()
        }