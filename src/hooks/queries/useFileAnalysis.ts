import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../../services/api';

export function useFileAnalysis(fileId: string) {
  const queryClient = useQueryClient();

  const { data: analysis, isLoading } = useQuery({
    queryKey: ['analysis', fileId],
    queryFn: () => api.getAnalysis(fileId),
    enabled: !!fileId,
  });

  const analyzeMutation = useMutation({
    mutationFn: api.analyzeFile,
    onSuccess: (result) => {
      queryClient.setQueryData(['analysis', fileId], result);
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });

  return {
    analysis,
    isLoading,
    analyze: () => analyzeMutation.mutate(fileId),
    isAnalyzing: analyzeMutation.isPending,
  };
}