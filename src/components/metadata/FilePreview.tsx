import React from 'react';
import { Card, CardHeader, CardContent } from '../common';
import { FileMetadata } from '../../types';
import { Eye, EyeOff } from 'lucide-react';

interface FilePreviewProps {
  file: FileMetadata;
  quality: 'low' | 'medium' | 'high';
  onTogglePreview: () => void;
  showPreview: boolean;
}

export function FilePreview({ 
  file, 
  quality,
  onTogglePreview,
  showPreview 
}: FilePreviewProps) {
  if (!file.previewUrl) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Preview</h3>
          <button
            onClick={onTogglePreview}
            className="inline-flex items-center px-2 py-1 text-sm text-gray-600 hover:text-gray-900"
          >
            {showPreview ? (
              <>
                <EyeOff className="w-4 h-4 mr-1" />
                Hide Preview
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-1" />
                Show Preview
              </>
            )}
          </button>
        </div>
      </CardHeader>
      {showPreview && (
        <CardContent>
          {file.fileType === 'image' && (
            <img
              src={file.previewUrl}
              alt={file.fileName}
              className="w-full h-auto object-contain rounded-lg"
              loading={quality === 'low' ? 'lazy' : 'eager'}
            />
          )}
          {file.fileType === 'video' && (
            <video
              src={file.previewUrl}
              controls
              className="w-full rounded-lg"
              preload={quality === 'low' ? 'none' : 'metadata'}
            >
              Your browser does not support video playback.
            </video>
          )}
          {file.fileType === 'audio' && (
            <audio
              src={file.previewUrl}
              controls
              className="w-full"
              preload={quality === 'low' ? 'none' : 'metadata'}
            >
              Your browser does not support audio playback.
            </audio>
          )}
        </CardContent>
      )}
    </Card>
  );
}