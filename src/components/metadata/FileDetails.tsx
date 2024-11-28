import React from 'react';
import { Card, CardHeader, CardContent } from '../common';
import { FileIcon } from '../files/FileIcon';
import { formatFileSize, formatDate } from '../../utils/formatters';
import { FileMetadata } from '../../types';

interface FileDetailsProps {
  file: FileMetadata;
}

export function FileDetails({ file }: FileDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <FileIcon type={file.fileType} className="w-6 h-6" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">{file.fileName}</h3>
            <p className="text-sm text-gray-500">
              Uploaded {formatDate(file.uploadDate)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Size</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatFileSize(file.size)}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Type</p>
            <p className="text-lg font-semibold text-gray-900 capitalize">
              {file.fileType}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Created</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatDate(file.createdAt)}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Last Modified</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatDate(file.updatedAt)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}