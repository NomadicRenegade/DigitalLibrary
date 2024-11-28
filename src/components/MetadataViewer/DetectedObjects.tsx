import React from 'react';
import { Tag } from 'lucide-react';

interface DetectedObject {
  label: string;
  confidence: number;
}

interface DetectedObjectsProps {
  objects: DetectedObject[];
}

export function DetectedObjects({ objects }: DetectedObjectsProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-500 flex items-center gap-2">
        <Tag className="w-4 h-4" />
        Detected Objects
      </h4>
      <div className="flex flex-wrap gap-2">
        {objects.map((obj, index) => (
          <div
            key={`${obj.label}-${index}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full"
          >
            <span className="text-sm font-medium text-blue-700">{obj.label}</span>
            <span className="text-xs text-blue-500">
              {(obj.confidence * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}