import { useState, useEffect } from 'react';
import { FileMetadata, BulkOperation } from '../types';
import * as api from '../services/api';

export function useFiles() {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  async function fetchFiles() {
    try {
      const data = await api.getFiles();
      setFiles(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch files');
    } finally {
      setLoading(false);
    }
  }

  async function uploadFile(file: File, onProgress?: (progress: number) => void) {
    try {
      const newFile = await api.uploadFile(file);
      setFiles(prev => [newFile, ...prev]);
      return newFile;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Upload failed');
    }
  }

  async function bulkUpdate(selectedFiles: FileMetadata[], operation: BulkOperation) {
    try {
      const updatedFiles = await api.bulkUpdate(selectedFiles.map(f => f.id), operation);
      setFiles(prev => {
        const updatedIds = new Set(updatedFiles.map(f => f.id));
        return [
          ...updatedFiles,
          ...prev.filter(f => !updatedIds.has(f.id))
        ];
      });
    } catch (err) {
      throw err instanceof Error ? err : new Error('Bulk operation failed');
    }
  }

  return {
    files,
    loading,
    error,
    uploadFile,
    refreshFiles: fetchFiles,
    bulkUpdate,
  };
}