import React, { useCallback, useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import type { UploadState } from '../types';
import { useFiles } from '../hooks/useFiles';

export function FileUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>({ progress: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile } = useFiles();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleUpload = useCallback(async (file: File) => {
    try {
      setUploadState({ progress: 0, fileName: file.name });
      await uploadFile(file, (progress) => {
        setUploadState(prev => ({ ...prev, progress }));
      });
      
      // Reset state after successful upload
      setTimeout(() => {
        setUploadState({ progress: 0 });
      }, 1000);
    } catch (error) {
      setUploadState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Upload failed',
      }));
    }
  }, [uploadFile]);

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
      className={`w-full p-4 rounded-lg border-2 border-dashed transition-colors ${
        dragActive ? 'border-red-200 bg-[#D43D56]' : 'border-red-200 bg-[#C41E3A]'
      }`}
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
        <button
          className="text-sm text-white hover:text-red-100 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Files
        </button>
        
        {uploadState.progress > 0 && (
          <div className="w-full">
            <div className="text-xs text-white mb-1 truncate">{uploadState.fileName}</div>
            <div className="w-full bg-[#B01B34] rounded-full h-1.5">
              <div
                className="bg-white h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadState.progress}%` }}
              />
            </div>
          </div>
        )}
        
        {uploadState.error && (
          <div className="text-xs text-red-200 bg-[#B01B34] px-2 py-1 rounded">
            {uploadState.error}
          </div>
        )}
      </div>
    </div>
  );
}