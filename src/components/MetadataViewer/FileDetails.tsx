import React from 'react';
import { FileIcon } from '../files/FileIcon';
import { formatFileSize } from '../../utils/formatters';

interface FileDetailsProps {
  fileName: string;
  fileType: string;
  size: number;
  uploadDate: string;
  status: string;
  confidence: number;
}

export function FileDetails({
  fileName,
  fileType,
  size,
  uploadDate,
  status,
  confidence,
}: FileDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-gray-50 rounded-lg">
          <FileIcon type={fileType} className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{fileName}</h2>
          <p className="text-sm text-gray-500">
            Uploaded on {new Date(uploadDate).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Size</p>
          <p className="text-lg font-semibold text-gray-900">{formatFileSize(size)}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Status</p>
          <p className="text-lg font-semibold text-gray-900 capitalize">{status}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Confidence</p>
          <p className="text-lg font-semibold text-gray-900">{(confidence * 100).toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}