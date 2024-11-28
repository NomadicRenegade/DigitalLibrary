import React from 'react';
import { FileSearch } from 'lucide-react';

export function Header() {
  return (
    <div className="p-6 border-b border-[#D43D56]">
      <div className="flex items-center space-x-2">
        <FileSearch className="w-8 h-8" />
        <div>
          <h1 className="text-xl font-bold">Digital Media Library</h1>
          <p className="text-sm text-red-100">File Analysis System</p>
        </div>
      </div>
    </div>
  );
}