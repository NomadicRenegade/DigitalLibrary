import React from 'react';
import { FileMetadata } from '../../types';
import { FileIcon } from './FileIcon';
import { StatusIcon } from './StatusIcon';
import { formatFileSize, formatDate } from '../../utils/formatters';

interface FileListProps {
  files: FileMetadata[];
  onFileSelect: (file: FileMetadata) => void;
  selectedFiles: FileMetadata[];
  onFileSelectionChange: (files: FileMetadata[]) => void;
}

export function FileList({
  files,
  onFileSelect,
  selectedFiles,
  onFileSelectionChange
}: FileListProps) {
  const handleFileSelect = (file: FileMetadata, isMultiSelect: boolean) => {
    if (isMultiSelect) {
      const isSelected = selectedFiles.some(f => f.id === file.id);
      if (isSelected) {
        onFileSelectionChange(selectedFiles.filter(f => f.id !== file.id));
      } else {
        onFileSelectionChange([...selectedFiles, file]);
      }
    } else {
      onFileSelect(file);
    }
  };

  return (
    <div className="divide-y divide-gray-200">
      {files.map(file => (
        <div
          key={file.id}
          onClick={(e) => handleFileSelect(file, e.ctrlKey || e.metaKey)}
          className={`
            flex items-center p-4 hover:bg-gray-50 cursor-pointer
            ${selectedFiles.some(f => f.id === file.id) ? 'bg-red-50' : ''}
          `}
        >
          <FileIcon type={file.fileType} className="w-6 h-6 mr-3" />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3">
              <p className="text-sm font-medium text-gray-900 truncate">
                {file.fileName}
              </p>
              <StatusIcon status={file.analysis.status} />
            </div>
            <p className="text-sm text-gray-500">
              {formatDate(file.uploadDate)}
            </p>
          </div>

          <div className="ml-4 flex items-center space-x-4 text-sm text-gray-500">
            <span>{formatFileSize(file.size)}</span>
            {file.tags.length > 0 && (
              <span>{file.tags.length} tags</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}