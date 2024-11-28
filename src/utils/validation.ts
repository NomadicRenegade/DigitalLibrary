import { FILE_TYPES, MAX_FILE_SIZE } from './constants';

export function validateFileType(fileName: string): boolean {
  const extension = fileName.split('.').pop()?.toLowerCase();
  if (!extension) return false;
  
  return Object.values(FILE_TYPES).flat().includes(extension);
}

export function validateFileSize(size: number): boolean {
  return size <= MAX_FILE_SIZE;
}

export function getFileType(fileName: string): 'image' | 'audio' | 'video' | null {
  const extension = fileName.split('.').pop()?.toLowerCase();
  if (!extension) return null;
  
  for (const [type, extensions] of Object.entries(FILE_TYPES)) {
    if (extensions.includes(extension)) {
      return type.toLowerCase() as 'image' | 'audio' | 'video';
    }
  }
  
  return null;
}