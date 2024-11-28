import React from 'react';
import { Eye } from 'lucide-react';
import { UserSettings } from '../../types';

interface PreviewSettingsProps {
  settings: UserSettings;
  onUpdateSettings: (settings: Partial<UserSettings>) => void;
}

export function PreviewSettings({ settings, onUpdateSettings }: PreviewSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Eye className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium">Auto Preview Files</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={settings.autoPreview}
            onChange={(e) => onUpdateSettings({
              ...settings,
              autoPreview: e.target.checked
            })}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 block">Preview Quality</label>
        <p className="text-xs text-gray-500">
          Higher quality previews may affect performance and network usage
        </p>
        <select
          value={settings.previewQuality}
          onChange={(e) => onUpdateSettings({
            ...settings,
            previewQuality: e.target.value as 'low' | 'medium' | 'high'
          })}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="low">Low - Faster loading</option>
          <option value="medium">Medium - Balanced</option>
          <option value="high">High - Best quality</option>
        </select>
      </div>
    </div>
  );
}