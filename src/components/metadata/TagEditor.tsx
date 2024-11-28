import React, { useState } from 'react';
import { Tag, Plus, X } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../common';

interface TagEditorProps {
  tags: string[];
  onUpdateTags: (tags: string[]) => void;
}

export function TagEditor({ tags, onUpdateTags }: TagEditorProps) {
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
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Tag className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-900">Tags</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Add tag..."
              className="flex-1 text-sm border border-gray-300 rounded-md px-2 py-1"
            />
            <button
              onClick={handleAddTag}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Plus className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}