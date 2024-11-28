import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PreviewToggleProps {
  showPreview: boolean;
  onToggle: () => void;
}

export function PreviewToggle({ showPreview, onToggle }: PreviewToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {showPreview ? (
        <>
          <EyeOff className="w-4 h-4 mr-2" />
          Hide Preview
        </>
      ) : (
        <>
          <Eye className="w-4 h-4 mr-2" />
          Show Preview
        </>
      )}
    </button>
  );
}