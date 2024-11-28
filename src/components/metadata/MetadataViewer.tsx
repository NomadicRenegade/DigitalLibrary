import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FileMetadata } from '../../types';
import { FileDetails } from './FileDetails';
import { FilePreview } from './FilePreview';
import { AnalysisResults } from './AnalysisResults';
import { TagEditor } from './TagEditor';
import { useFileAnalysis } from '../../hooks/queries/useFileAnalysis';
import { Button } from '../common';

interface MetadataViewerProps {
  file: FileMetadata;
  onClose: () => void;
  onUpdateTags: (fileId: string, tags: string[]) => void;
}

export function MetadataViewer({
  file,
  onClose,
  onUpdateTags
}: MetadataViewerProps) {
  const [showPreview, setShowPreview] = useState(true);
  const { analysis, analyze, isAnalyzing } = useFileAnalysis(file.id);

  const handleUpdateTags = (tags: string[]) => {
    onUpdateTags(file.id, tags);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-[600px] bg-white shadow-xl overflow-y-auto">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">File Details</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <FileDetails file={file} />
        
        {file.previewUrl && (
          <FilePreview
            file={file}
            quality="high"
            showPreview={showPreview}
            onTogglePreview={() => setShowPreview(!showPreview)}
          />
        )}
        
        <TagEditor
          tags={file.tags}
          onUpdateTags={handleUpdateTags}
        />
        
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Analysis</h3>
          {file.analysis.status !== 'completed' && (
            <Button
              onClick={() => analyze()}
              disabled={isAnalyzing}
              variant="primary"
              className="text-sm"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze File'}
            </Button>
          )}
        </div>
        
        <AnalysisResults analysis={analysis || file.analysis} />
      </div>
    </div>
  );
}