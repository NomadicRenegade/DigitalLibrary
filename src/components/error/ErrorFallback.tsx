import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../common';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-6 bg-red-50 rounded-lg">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-sm text-gray-600 mb-4">{error.message}</p>
      <Button variant="primary" onClick={resetErrorBoundary}>
        Try Again
      </Button>
    </div>
  );
}