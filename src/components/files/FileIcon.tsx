import React from 'react';
import { Image, Music, Video } from 'lucide-react';

interface FileIconProps {
  type: string;
  className?: string;
}

export function FileIcon({ type, className = "w-6 h-6" }: FileIconProps) {
  switch (type) {
    case 'image':
      return <Image className={`${className} text-blue-500`} />;
    case 'audio':
      return <Music className={`${className} text-purple-500`} />;
    case 'video':
      return <Video className={`${className} text-red-500`} />;
    default:
      return null;
  }
}