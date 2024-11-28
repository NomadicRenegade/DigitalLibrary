import React from 'react';
import { FolderPlus, Database, Settings, FileSearch } from 'lucide-react';
import { FileUpload } from './FileUpload';

interface SidebarProps {
  onAddConnection: () => void;
}

export function Sidebar({ onAddConnection }: SidebarProps) {
  return (
    <div className="w-64 bg-[#C41E3A] text-white h-screen flex flex-col">
      <div className="p-6 border-b border-[#D43D56]">
        <div className="flex items-center space-x-2">
          <FileSearch className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold">DigitalLibrary</h1>
            <p className="text-sm text-red-100">File Analysis System</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
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

        <div className="p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-red-100 mb-2">Upload</h2>
          <FileUpload />
        </div>
      </div>
      
      <div className="p-4 border-t border-[#D43D56]">
        <button className="flex items-center space-x-2 text-white hover:bg-[#B01B34] w-full px-3 py-2 rounded-md transition-colors">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}