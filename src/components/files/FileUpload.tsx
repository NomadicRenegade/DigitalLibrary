import React, { useCallback, useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '../common';
import { validateFileType, validateFileSize } from '../../utils/validation';
import type { UploadState } from '../../types';

interface FileUploadProps {
  onUpload: (file: File, onProgress: (progress: number) => void) => Promise<void>;
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>({ progress: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const validateFile = (file: File): string | null => {
    if (!validateFileType(file.name)) {
      return 'File type not supported';
    }
    if (!validateFileSize(file.size)) {
      return 'File size too large';
    }
    return null;
  };

  const handleUpload = useCallback(async (file: File) => {
    const error = validateFile(file);
    if (error) {
      setUploadState({ progress: 0, error });
      return;
    }

    try {
      setUploadState({ progress: 0, fileName: file.name });
      await onUpload(file, (progress) => {
        setUploadState(prev => ({ ...prev, progress }));
      });
      
      setTimeout(() => {
        setUploadState({ progress: 0 });
      }, 1000);
    } catch (error) {
      setUploadState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Upload failed',
      }));
    }
  }, [onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length) {
      handleUpload(files[0]);
    }
  }, [handleUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      handleUpload(files[0]);
    }
  }, [handleUpload]);

  return (
    <div
      className={`
        w-full p-4 rounded-lg border-2 border-dashed transition-colors
        ${dragActive ? 'border-red-200 bg-[#D43D56]' : 'border-red-200 bg-[#C41E3A]'}
      `}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileInput}
        accept=".jpg,.jpeg,.png,.gif,.mp3,.wav,.ogg,.mp4,.avi,.mov"
      />
      
      <div className="flex flex-col items-center justify-center space-y-2">
        <Upload className="w-8 h-8 text-white" />
        <Button
          variant="secondary"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Files
        </Button>
        
        {uploadState.progress > 0 && (
          <div className="w-full">
            <div className="text-xs text-white mb-1 truncate">
              {uploadState.fileName}
            </div>
            <div className="w-full bg-[#B01B34] rounded-full h-1.5">
              <div
                className="bg-white h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadState.progress}%` }}
              />
            </div>
          </div>
        )}
        
        {uploadState.error && (
          <div className="flex items-center space-x-2 text-xs text-red-200 bg-[#B01B34] px-2 py-1 rounded">
            <span>{uploadState.error}</span>
            <button
              onClick={() => setUploadState({ progress: 0 })}
              className="hover:text-red-100"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}