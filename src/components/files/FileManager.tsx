import React from 'react';
import { FileMetadata } from '../../types';
import { FileGrid } from './FileGrid';
import { FileList } from './FileList';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '../common';

interface FileManagerProps {
  files: FileMetadata[];
  onFileSelect: (file: FileMetadata) => void;
  selectedFiles: FileMetadata[];
  onFileSelectionChange: (files: FileMetadata[]) => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

export function FileManager({
  files,
  onFileSelect,
  selectedFiles,
  onFileSelectionChange,
  viewMode = 'grid',
  onViewModeChange
}: FileManagerProps) {
  return (
    <div className="space-y-4">
      {onViewModeChange && (
        <div className="flex justify-end space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'secondary'}
            onClick={() => onViewModeChange('grid')}
            icon={LayoutGrid}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'secondary'}
            onClick={() => onViewModeChange('list')}
            icon={List}
          >
            List
          </Button>
        </div>
      )}

      {viewMode === 'grid' ? (
        <FileGrid
          files={files}
          onFileSelect={onFileSelect}
          selectedFiles={selectedFiles}
          onFileSelectionChange={onFileSelectionChange}
        />
      ) : (
        <FileList
          files={files}
          onFileSelect={onFileSelect}
          selectedFiles={selectedFiles}
          onFileSelectionChange={onFileSelectionChange}
        />
      )}
    </div>
  );
}