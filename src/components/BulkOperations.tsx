import React, { useState } from 'react';
import { FolderInput, Tags, Trash2 } from 'lucide-react';
import { BulkOperation, FileMetadata } from '../types';

interface BulkOperationsProps {
  selectedFiles: FileMetadata[];
  onBulkOperation: (operation: BulkOperation) => void;
  onClearSelection: () => void;
}

export function BulkOperations({ selectedFiles, onBulkOperation, onClearSelection }: BulkOperationsProps) {
  const [newLocation, setNewLocation] = useState('');
  const [newTags, setNewTags] = useState('');

  if (selectedFiles.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-600">
            {selectedFiles.length} items selected
          </span>
          <button
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={onClearSelection}
          >
            Clear selection
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="New location..."
              className="text-sm border border-gray-300 rounded-md px-3 py-1.5"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
            />
            <button
              className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
              onClick={() => onBulkOperation({ type: 'move', targetLocation: newLocation })}
            >
              <FolderInput className="w-4 h-4" />
              <span>Move</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Add tags (comma-separated)..."
              className="text-sm border border-gray-300 rounded-md px-3 py-1.5"
              value={newTags}
              onChange={(e) => setNewTags(e.target.value)}
            />
            <button
              className="flex items-center space-x-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100"
              onClick={() => {
                const tags = newTags.split(',').map(tag => tag.trim()).filter(Boolean);
                onBulkOperation({ type: 'tag', tags });
                setNewTags('');
              }}
            >
              <Tags className="w-4 h-4" />
              <span>Tag</span>
            </button>
          </div>

          <button
            className="flex items-center space-x-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
            onClick={() => onBulkOperation({ type: 'delete' })}
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}