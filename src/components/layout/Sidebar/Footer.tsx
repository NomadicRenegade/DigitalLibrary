import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { PreviewSettings } from '../../Settings/PreviewSettings';
import { useSettings } from '../../../hooks/useSettings';

export function Footer() {
  const [showSettings, setShowSettings] = useState(false);
  const { settings, updateSettings } = useSettings();

  return (
    <div className="p-4 border-t border-[#D43D56]">
      <button 
        className="flex items-center space-x-2 text-white hover:bg-[#B01B34] w-full px-3 py-2 rounded-md transition-colors"
        onClick={() => setShowSettings(!showSettings)}
      >
        <Settings className="w-5 h-5" />
        <span>Settings</span>
      </button>

      {showSettings && (
        <div className="mt-4 p-4 bg-white rounded-lg text-gray-900">
          <h3 className="text-sm font-semibold mb-4">Preview Settings</h3>
          <PreviewSettings
            settings={settings}
            onUpdateSettings={updateSettings}
          />
        </div>
      )}
    </div>
  );
}