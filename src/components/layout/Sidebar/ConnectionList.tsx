import React from 'react';
import { FolderPlus, Database } from 'lucide-react';

interface ConnectionListProps {
  onAddConnection: () => void;
}

export function ConnectionList({ onAddConnection }: ConnectionListProps) {
  return (
    <div className="p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-red-100 mb-2">Storage</h2>
      <button
        onClick={onAddConnection}
        className="flex items-center space-x-2 text-white hover:bg-[#B01B34] w-full px-3 py-2 rounded-md transition-colors"
      >
        <FolderPlus className="w-5 h-5" />
        <span>Add Connection</span>
      </button>
      
      <div className="flex items-center space-x-2 text-white px-3 py-2 mt-1">
        <Database className="w-5 h-5" />
        <span>Local Storage</span>
      </div>
    </div>
  );
}