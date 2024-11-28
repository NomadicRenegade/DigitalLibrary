import React from 'react';
import { Camera, Aperture } from 'lucide-react';

interface ImageMetadataProps {
  dimensions: string;
  camera?: string;
  iso?: string;
  aperture?: string;
}

export function ImageMetadata({ dimensions, camera, iso, aperture }: ImageMetadataProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Dimensions</p>
          <p className="text-lg font-semibold text-gray-900">{dimensions}</p>
        </div>
        {camera && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Camera className="w-4 h-4 text-gray-500" />
              <p className="text-sm font-medium text-gray-500">Camera</p>
            </div>
            <p className="text-lg font-semibold text-gray-900">{camera}</p>
          </div>
        )}
      </div>

      {(iso || aperture) && (
        <div className="grid grid-cols-2 gap-4">
          {iso && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-500">ISO</p>
              <p className="text-lg font-semibold text-gray-900">{iso}</p>
            </div>
          )}
          {aperture && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Aperture className="w-4 h-4 text-gray-500" />
                <p className="text-sm font-medium text-gray-500">Aperture</p>
              </div>
              <p className="text-lg font-semibold text-gray-900">{aperture}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}