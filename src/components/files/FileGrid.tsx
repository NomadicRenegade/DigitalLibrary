import React from 'react';
import { FileMetadata } from '../../types';
import { FileCard } from './FileCard';

interface FileGridProps {
  files: FileMetadata[];
  onFileSelect: (file: FileMetadata) => void;
  selectedFiles: FileMetadata[];
  onFileSelectionChange: (files: FileMetadata[]) => void;
}

export function FileGrid({
  files,
  onFileSelect,
  selectedFiles,
  onFileSelectionChange
}: FileGridProps) {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {files.map(file => (
        <FileCard
          key={file.id}
          file={file}
          isSelected={selectedFiles.some(f => f.id === file.id)}
          onClick={(e) => handleFileSelect(file, e.ctrlKey || e.metaKey)}
        />
      ))}
    </div>
  );
}