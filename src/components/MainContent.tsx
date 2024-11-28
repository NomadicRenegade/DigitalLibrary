import React, { useState } from 'react';
import { FileManager } from './files/FileManager';
import { SearchBar } from './SearchBar';
import { MetadataViewer } from './metadata';
import { FileMetadata } from '../types';
import { AsyncBoundary } from './error';

interface MainContentProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  files: FileMetadata[];
  onFileSelect: (file: FileMetadata | null) => void;
  selectedFiles: FileMetadata[];
  onFileSelectionChange: (files: FileMetadata[]) => void;
  selectedFile: FileMetadata | null;
  loading: boolean;
  error: string | null;
}

export function MainContent({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  files,
  onFileSelect,
  selectedFiles,
  onFileSelectionChange,
  selectedFile,
  loading,
  error
}: MainContentProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [advancedFilters, setAdvancedFilters] = useState({
    minSize: undefined,
    maxSize: undefined,
    location: '',
    dateFrom: '',
    dateTo: '',
    owner: ''
  });

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-6 space-y-6">
        <AsyncBoundary>
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            selectedFilter={selectedFilter}
            onFilterChange={onFilterChange}
            advancedFilters={advancedFilters}
            onAdvancedFiltersChange={setAdvancedFilters}
          />
        </AsyncBoundary>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C41E3A] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading files...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : files.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No files found. Upload some files to get started.
          </div>
        ) : (
          <AsyncBoundary>
            <FileManager
              files={files}
              onFileSelect={onFileSelect}
              selectedFiles={selectedFiles}
              onFileSelectionChange={onFileSelectionChange}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </AsyncBoundary>
        )}

        {selectedFile && (
          <AsyncBoundary>
            <MetadataViewer
              file={selectedFile}
              onClose={() => onFileSelect(null)}
              onUpdateTags={(fileId, tags) => {
                // Handle tag updates
                console.log('Update tags', fileId, tags);
              }}
            />
          </AsyncBoundary>
        )}
      </div>
    </div>
  );
}