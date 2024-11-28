import React from 'react';
import { FileMetadata } from '../../types';

interface FilePreviewProps {
  file: FileMetadata;
  quality: 'low' | 'medium' | 'high';
}

export function FilePreview({ file, quality }: FilePreviewProps) {
  if (!file.previewUrl) {
    return null;
  }

  const previewClasses = "bg-gray-50 rounded-lg overflow-hidden";

  switch (file.fileType) {
    case 'image':
      return (
        <div className={previewClasses}>
          <img
            src={file.previewUrl}
            alt={file.fileName}
            className="w-full h-auto object-contain"
            loading={quality === 'low' ? 'lazy' : 'eager'}
          />
        </div>
      );
    case 'video':
      return (
        <div className={previewClasses}>
          <video
            src={file.previewUrl}
            controls
            className="w-full h-auto"
            preload={quality === 'low' ? 'none' : 'metadata'}
          >
            Your browser does not support video playback.
          </video>
        </div>
      );
    case 'audio':
      return (
        <div className={`${previewClasses} p-4`}>
          <audio
            src={file.previewUrl}
            controls
            className="w-full"
            preload={quality === 'low' ? 'none' : 'metadata'}
          >
            Your browser does not support audio playback.
          </audio>
        </div>
      );
    default:
      return null;
  }
}