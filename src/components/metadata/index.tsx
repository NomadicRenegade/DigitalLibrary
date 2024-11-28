import React, { useState } from 'react';
import { Modal } from '../common';
import { FileMetadata } from '../../types';
import { FileDetails } from './FileDetails';
import { FilePreview } from './FilePreview';
import { AnalysisResults } from './AnalysisResults';
import { TagList } from './TagList';

interface MetadataViewerProps {
  file: FileMetadata;
  isOpen: boolean;
  onClose: () => void;
  onUpdateTags: (fileId: string, tags: string[]) => void;
}

export function MetadataViewer({
  file,
  isOpen,
  onClose,
  onUpdateTags
}: MetadataViewerProps) {
  const [showPreview, setShowPreview] = useState(true);

  const handleUpdateTags = (tags: string[]) => {
    onUpdateTags(file.id, tags);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="File Details"
      size="lg"
    >
      <div className="space-y-6">
        <FileDetails file={file} />
        
        {file.previewUrl && (
          <FilePreview
            file={file}
            quality="high"
            showPreview={showPreview}
            onTogglePreview={() => setShowPreview(!showPreview)}
          />
        )}
        
        <TagList
          tags={file.tags}
          onAddTag={(tag) => handleUpdateTags([...file.tags, tag])}
          onRemoveTag={(tag) => handleUpdateTags(file.tags.filter(t => t !== tag))}
        />
        
        <AnalysisResults analysis={file.analysis} />
      </div>
    </Modal>
  );
}