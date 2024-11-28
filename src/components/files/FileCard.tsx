import React from 'react';
import { FileMetadata } from '../../types';
import { FileIcon } from './FileIcon';
import { StatusIcon } from './StatusIcon';
import { formatFileSize, formatDate } from '../../utils/formatters';

interface FileCardProps {
  file: FileMetadata;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export function FileCard({ file, isSelected, onClick }: FileCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative group cursor-pointer rounded-lg border p-4 transition-all
        ${isSelected 
          ? 'border-[#C41E3A] bg-red-50' 
          : 'border-gray-200 hover:border-gray-300 bg-white'
        }
      `}
    >
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-gray-50 rounded-lg">
          <FileIcon type={file.fileType} className="w-8 h-8" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {file.fileName}
          </h3>
          <p className="text-xs text-gray-500">
            {formatDate(file.uploadDate)}
          </p>
        </div>

        <StatusIcon status={file.analysis.status} />
      </div>

      {file.previewUrl && file.fileType === 'image' && (
        <div className="mt-3">
          <img
            src={file.previewUrl}
            alt={file.fileName}
            className="w-full h-32 object-cover rounded-md"
            loading="lazy"
          />
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <span>{formatFileSize(file.size)}</span>
        {file.tags.length > 0 && (
          <span>{file.tags.length} tags</span>
        )}
      </div>
    </div>
  );
}