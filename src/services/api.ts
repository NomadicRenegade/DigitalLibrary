import { FileMetadata, BulkOperation, AnalysisResult } from '../types';
import { mockFiles } from '../data/mockData';

const API_BASE_URL = 'http://localhost:5000/api';

export async function getFiles(): Promise<FileMetadata[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockFiles;
}

export async function uploadFile(file: File, onProgress?: (progress: number) => void): Promise<FileMetadata> {
  // Simulate file upload with progress
  const totalChunks = 10;
  for (let i = 0; i < totalChunks; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));
    onProgress?.((i + 1) / totalChunks * 100);
  }
  
  const newFile: FileMetadata = {
    id: Date.now().toString(),
    fileName: file.name,
    fileType: file.type.split('/')[0] as 'image' | 'audio' | 'video',
    uploadDate: new Date().toISOString(),
    size: file.size,
    tags: [],
    location: `/uploads/${file.type.split('/')[0]}s/${file.name}`,
    analysis: {
      status: 'processing',
      metadata: {
        format: file.type,
        size: file.size,
        location: `/uploads/${file.type.split('/')[0]}s/${file.name}`
      },
      confidence: 0
    }
  };

  return newFile;
}

export async function getAnalysis(fileId: string): Promise<AnalysisResult> {
  await new Promise(resolve => setTimeout(resolve, 500));
  const file = mockFiles.find(f => f.id === fileId);
  if (!file) throw new Error('File not found');
  return file.analysis;
}

export async function analyzeFile(fileId: string): Promise<AnalysisResult> {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const file = mockFiles.find(f => f.id === fileId);
  if (!file) throw new Error('File not found');
  
  return {
    ...file.analysis,
    status: 'completed',
    confidence: 0.95
  };
}

export async function updateFileTags(fileId: string, tags: string[]): Promise<FileMetadata> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const file = mockFiles.find(f => f.id === fileId);
  if (!file) throw new Error('File not found');

  return {
    ...file,
    tags,
  };
}

export async function bulkUpdate(fileIds: string[], operation: BulkOperation): Promise<FileMetadata[]> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const filesToUpdate = mockFiles.filter(f => fileIds.includes(f.id));
  
  return filesToUpdate.map(file => {
    switch (operation.type) {
      case 'move':
        return {
          ...file,
          location: operation.targetLocation || file.location
        };
      case 'tag':
        return {
          ...file,
          tags: [...new Set([...file.tags, ...(operation.tags || [])])]
        };
      case 'untag':
        return {
          ...file,
          tags: file.tags.filter(tag => !(operation.tags || []).includes(tag))
        };
      case 'delete':
        return file;
      default:
        return file;
    }
  });
}