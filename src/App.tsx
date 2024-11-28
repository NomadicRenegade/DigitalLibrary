import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { ErrorBoundary } from './components/error';
import { Sidebar } from './components/layout';
import { MainContent } from './components/MainContent';
import { BulkOperations } from './components/BulkOperations';
import { TagsPanel } from './components/TagsPanel';
import { useFiles } from './hooks/useFiles';
import { FileMetadata } from './types';

function AppContent() {
  const { files, loading, error, bulkUpdate } = useFiles();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedFilter, setSelectedFilter] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState<FileMetadata | null>(null);
  const [selectedFiles, setSelectedFiles] = React.useState<FileMetadata[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const tags = React.useMemo(() => {
    const tagMap = new Map<string, number>();
    files.forEach(file => {
      file.tags?.forEach(tag => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    });
    return Array.from(tagMap.entries()).map(([name, count]) => ({
      id: name,
      name,
      count
    }));
  }, [files]);

  const filteredFiles = React.useMemo(() => {
    return files.filter(file => {
      const matchesSearch = file.fileName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = !selectedFilter || file.fileType === selectedFilter;
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => file.tags?.includes(tag));
      return matchesSearch && matchesFilter && matchesTags;
    });
  }, [files, searchQuery, selectedFilter, selectedTags]);

  const handleBulkOperation = async (operation: BulkOperation) => {
    await bulkUpdate(selectedFiles, operation);
    setSelectedFiles([]);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleAddConnection = () => {
    console.log('Add connection clicked');
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <ErrorBoundary>
        <Sidebar onAddConnection={handleAddConnection} />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <MainContent
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          files={filteredFiles}
          onFileSelect={setSelectedFile}
          selectedFiles={selectedFiles}
          onFileSelectionChange={setSelectedFiles}
          selectedFile={selectedFile}
          loading={loading}
          error={error}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <TagsPanel
          tags={tags}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
        />
      </ErrorBoundary>

      {selectedFiles.length > 0 && (
        <ErrorBoundary>
          <BulkOperations
            selectedFiles={selectedFiles}
            onBulkOperation={handleBulkOperation}
            onClearSelection={() => setSelectedFiles([])}
          />
        </ErrorBoundary>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}