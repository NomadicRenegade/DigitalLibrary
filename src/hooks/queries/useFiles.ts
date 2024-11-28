import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../../services/api';
import { FileMetadata, BulkOperation } from '../../types';

export function useFiles() {
  const queryClient = useQueryClient();

  const { data: files = [], isLoading, error } = useQuery({
    queryKey: ['files'],
    queryFn: api.getFiles,
  });

  const uploadMutation = useMutation({
    mutationFn: ({ file, onProgress }: { file: File; onProgress: (progress: number) => void }) =>
      api.uploadFile(file, onProgress),
    onSuccess: (newFile) => {
      queryClient.setQueryData(['files'], (old: FileMetadata[] = []) => [newFile, ...old]);
    },
  });

  const bulkUpdateMutation = useMutation({
    mutationFn: ({ fileIds, operation }: { fileIds: string[]; operation: BulkOperation }) =>
      api.bulkUpdate(fileIds, operation),
    onSuccess: (updatedFiles) => {
      queryClient.setQueryData(['files'], (old: FileMetadata[] = []) => {
        const updatedIds = new Set(updatedFiles.map(f => f.id));
        return [...updatedFiles, ...old.filter(f => !updatedIds.has(f.id))];
      });
    },
  });

  const updateTagsMutation = useMutation({
    mutationFn: ({ fileId, tags }: { fileId: string; tags: string[] }) =>
      api.updateFileTags(fileId, tags),
    onSuccess: (updatedFile) => {
      queryClient.setQueryData(['files'], (old: FileMetadata[] = []) => {
        return old.map(f => f.id === updatedFile.id ? updatedFile : f);
      });
    },
  });

  return {
    files,
    isLoading,
    error,
    uploadFile: (file: File, onProgress: (progress: number) => void) =>
      uploadMutation.mutateAsync({ file, onProgress }),
    bulkUpdate: (selectedFiles: FileMetadata[], operation: BulkOperation) =>
      bulkUpdateMutation.mutateAsync({
        fileIds: selectedFiles.map(f => f.id),
        operation
      }),
    updateTags: (fileId: string, tags: string[]) =>
      updateTagsMutation.mutateAsync({ fileId, tags }),
  };
}