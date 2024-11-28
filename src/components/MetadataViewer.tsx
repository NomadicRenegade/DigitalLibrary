import React from 'react';
import { FileMetadata } from '../types';
import { Image, Music, Video, Info } from 'lucide-react';

interface MetadataViewerProps {
  file: FileMetadata | null;
  onClose: () => void;
}

const formatMetadataValue = (value: any): string => {
  if (typeof value === 'number') {
    return value.toFixed(2);
  }
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value, null, 2);
  }
  return String(value);
};

export function MetadataViewer({ file, onClose }: MetadataViewerProps) {
  if (!file) return null;

  const getFileTypeIcon = () => {
    switch (file.fileType) {
      case 'image':
        return <Image className="w-6 h-6 text-blue-500" />;
      case 'audio':
        return <Music className="w-6 h-6 text-purple-500" />;
      case 'video':
        return <Video className="w-6 h-6 text-red-500" />;
      default:
        return <Info className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            {getFileTypeIcon()}
            <h3 className="text-lg font-semibold text-gray-900">{file.fileName}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 mb-2">File Information</h4>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
              <dt className="text-sm font-medium text-gray-500">Type</dt>
              <dd className="text-sm text-gray-900">{file.fileType}</dd>
              <dt className="text-sm font-medium text-gray-500">Size</dt>
              <dd className="text-sm text-gray-900">{(file.size / 1024 / 1024).toFixed(2)} MB</dd>
              <dt className="text-sm font-medium text-gray-500">Upload Date</dt>
              <dd className="text-sm text-gray-900">{new Date(file.uploadDate).toLocaleString()}</dd>
              <dt className="text-sm font-medium text-gray-500">Analysis Status</dt>
              <dd className="text-sm text-gray-900">{file.analysis.status}</dd>
              <dt className="text-sm font-medium text-gray-500">Confidence</dt>
              <dd className="text-sm text-gray-900">{(file.analysis.confidence * 100).toFixed(1)}%</dd>
            </dl>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Analysis Results</h4>
            <div className="space-y-2">
              {Object.entries(file.analysis.metadata).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 gap-x-4">
                  <dt className="text-sm font-medium text-gray-500">
                    {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </dt>
                  <dd className="text-sm text-gray-900">{formatMetadataValue(value)}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}