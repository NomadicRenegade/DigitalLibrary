import React, { useState } from 'react';
import { Tag, ThumbsUp, ThumbsDown, Plus, X } from 'lucide-react';

interface TagEditorProps {
  tags: string[];
  autoTags: { label: string; confidence: number }[];
  onUpdateTags: (tags: string[]) => void;
  onValidateTag: (tag: string, isValid: boolean) => void;
}

export function TagEditor({ tags, autoTags, onUpdateTags, onValidateTag }: TagEditorProps) {
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onUpdateTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onUpdateTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-500">Manual Tags</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-blue-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Add tag..."
              className="text-sm border border-gray-300 rounded-md px-2 py-1"
            />
            <button
              onClick={handleAddTag}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Plus className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-500">Auto-Generated Tags</h4>
        <div className="flex flex-wrap gap-2">
          {autoTags.map(({ label, confidence }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2 px-2 py-1 bg-gray-50 text-gray-700 rounded-md text-sm"
            >
              <span>{label}</span>
              <span className="text-xs text-gray-500">
                {(confidence * 100).toFixed(0)}%
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onValidateTag(label, true)}
                  className="p-1 hover:bg-green-100 rounded text-green-600"
                  title="Confirm tag"
                >
                  <ThumbsUp className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onValidateTag(label, false)}
                  className="p-1 hover:bg-red-100 rounded text-red-600"
                  title="Reject tag"
                >
                  <ThumbsDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}