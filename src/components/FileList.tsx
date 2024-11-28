import React from 'react';
import { FileMetadata } from '../types';
import { Image, Music, Video, Clock, CheckCircle, XCircle, ChevronRight } from 'lucide-react';

interface FileListProps {
  files: FileMetadata[];
  onFileSelect: (file: FileMetadata) => void;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'failed':
      return <XCircle className="w-5 h-5 text-red-500" />;
    default:
      return <Clock className="w-5 h-5 text-yellow-500 animate-spin" />;
  }
};

const getFileIcon = (type: string) => {
  switch (type) {
    case 'image':
      return <Image className="w-6 h-6 text-blue-500" />;
    case 'audio':
      return <Music className="w-6 h-6 text-purple-500" />;
    case 'video':
      return <Video className="w-6 h-6 text-red-500" />;
    default:
      return null;
  }
};

export function FileList({ files, onFileSelect }: FileListProps) {
  return (
    <div className="w-full max-w-4xl">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {files.map((file) => (
            <button
              key={file.id}
              className="w-full p-4 hover:bg-gray-50 transition-colors text-left flex items-center"
              onClick={() => onFileSelect(file)}
            >
              <div className="flex-1 flex items-center space-x-4">
                {getFileIcon(file.fileType)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.fileName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(file.uploadDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(file.analysis.status)}
                  <span className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}