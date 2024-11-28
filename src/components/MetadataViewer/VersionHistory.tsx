import React from 'react';
import { History, RotateCcw } from 'lucide-react';
import { FileVersion } from '../../types';

interface VersionHistoryProps {
  versions: FileVersion[];
  onRevertToVersion: (versionId: string) => void;
}

export function VersionHistory({ versions, onRevertToVersion }: VersionHistoryProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-500 flex items-center gap-2">
        <History className="w-4 h-4" />
        Version History
      </h4>
      <div className="space-y-2">
        {versions.map((version) => (
          <div
            key={version.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-md text-sm"
          >
            <div className="flex-1">
              <div className="font-medium text-gray-700">
                {new Date(version.timestamp).toLocaleString()}
              </div>
              <div className="text-gray-500 text-xs">
                {version.changeDescription}
              </div>
            </div>
            <button
              onClick={() => onRevertToVersion(version.id)}
              className="p-1 hover:bg-gray-200 rounded"
              title="Revert to this version"
            >
              <RotateCcw className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}