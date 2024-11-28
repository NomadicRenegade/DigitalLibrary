import React from 'react';
import { Header } from './Header';
import { ConnectionList } from './ConnectionList';
import { Footer } from './Footer';
import { FileUpload } from '../../FileUpload';

interface SidebarProps {
  onAddConnection: () => void;
}

export function Sidebar({ onAddConnection }: SidebarProps) {
  return (
    <div className="w-64 bg-[#C41E3A] text-white h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 overflow-y-auto">
        <ConnectionList onAddConnection={onAddConnection} />

        <div className="p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-red-100 mb-2">Upload</h2>
          <FileUpload />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}