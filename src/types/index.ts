import { ReactNode } from 'react';

export interface FileMetadata {
  id: string;
  fileName: string;
  fileType: 'image' | 'audio' | 'video';
  createdAt: string;
  updatedAt: string;
  uploadDate: string;
  size: number;
  tags: string[];
  location: string;
  analysis: AnalysisResult;
  versions?: FileVersion[];
  validatedTags?: {
    [tag: string]: boolean;
  };
  previewUrl?: string;
}

export interface AnalysisResult {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  metadata: Record<string, any>;
  confidence: number;
}

export interface UploadState {
  progress: number;
  error?: string;
  fileName?: string;
}

export interface BulkOperation {
  type: 'move' | 'delete' | 'tag' | 'untag';
  targetLocation?: string;
  tags?: string[];
}

export interface TagCategory {
  id: string;
  name: string;
  count: number;
}

export interface FileVersion {
  id: string;
  timestamp: string;
  changeDescription: string;
  metadata: FileMetadata;
}

export interface UserSettings {
  autoPreview: boolean;
  previewQuality: 'low' | 'medium' | 'high';
}