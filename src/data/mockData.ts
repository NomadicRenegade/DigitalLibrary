import { FileMetadata } from '../types';

// Helper function to generate random dates within the last year
const randomDate = () => {
  const end = new Date();
  const start = new Date(end.getFullYear() - 1, end.getMonth(), end.getDate());
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

export const mockFiles: FileMetadata[] = [
  {
    id: '1',
    fileName: 'family-vacation-2023.jpg',
    fileType: 'image',
    createdAt: randomDate(),
    updatedAt: randomDate(),
    uploadDate: randomDate(),
    size: 3.2 * 1024 * 1024,
    tags: ['family', 'vacation', 'summer', 'beach', '2023'],
    location: '/uploads/images/vacation/2023/',
    previewUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200',
    analysis: {
      status: 'completed',
      metadata: {
        dimensions: '3840x2160',
        format: 'JPEG',
        location: '/uploads/images/vacation/2023/family-vacation-2023.jpg',
        camera: 'Sony A7 III',
        iso: '100',
        aperture: 'f/2.8',
        detected_objects: [
          { label: 'person', confidence: 0.98 },
          { label: 'beach', confidence: 0.95 },
          { label: 'umbrella', confidence: 0.89 }
        ]
      },
      confidence: 0.94
    }
  },
  // ... rest of the mock data with createdAt and updatedAt fields
];