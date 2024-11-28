import React, { useState } from 'react';
import { FileMetadata } from '../../types';
import { X } from 'lucide-react';
import { FileIcon } from '../files/FileIcon';
import { FilePreview } from './FilePreview';
import { FileDetails } from './FileDetails';
import { PreviewToggle } from './PreviewToggle';

interface MetadataViewerProps {
  file: FileMetadata;
  onClose: () => void;
}

export function MetadataViewer({ file, onClose }: MetadataViewerProps) {
  const [showPreview, setShowPreview] = useState(true);
  const hasPreview = Boolean(file.previewUrl);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 w-[600px] bg-white shadow-xl overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-3">
              <FileIcon type={file.fileType} />
              <h3 className="text-lg font-semibold text-gray-900 truncate max-w-[400px]">
                {file.fileName}
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              {hasPreview && (
                <PreviewToggle
                  showPreview={showPreview}
                  onToggle={() => setShowPreview(!showPreview)}
                />
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {showPreview && hasPreview && (
            <FilePreview file={file} quality="high" />
          )}

          <FileDetails
            fileName={file.fileName}
            fileType={file.fileType}
            size={file.size}
            uploadDate={file.uploadDate}
            status={file.analysis.status}
            confidence={file.analysis.confidence}
          />

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h4 className="text-sm font-medium text-gray-900">Analysis Results</h4>
            </div>
            <div className="px-6 py-4 space-y-4">
              {Object.entries(file.analysis.metadata).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-sm font-medium text-gray-500 capitalize mb-1">
                    {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </dt>
                  <dd className="text-sm text-gray-900 bg-gray-50 p-2 rounded break-words whitespace-pre-wrap">
                    {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}