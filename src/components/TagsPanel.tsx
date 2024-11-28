import React from 'react';
import { Tag } from 'lucide-react';
import { TagCategory } from '../types';

interface TagsPanelProps {
  tags: TagCategory[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

export function TagsPanel({ tags, selectedTags, onTagSelect }: TagsPanelProps) {
  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center space-x-2 mb-4">
        <Tag className="w-5 h-5 text-gray-500" />
        <h2 className="text-lg font-semibold">Tags</h2>
      </div>

      <div className="space-y-2">
        {tags.map((tag) => (
          <button
            key={tag.id}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm ${
              selectedTags.includes(tag.name)
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => onTagSelect(tag.name)}
          >
            <span>{tag.name}</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              {tag.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}