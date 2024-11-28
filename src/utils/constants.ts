export const FILE_TYPES = {
  IMAGE: ['png', 'jpg', 'jpeg', 'gif'],
  AUDIO: ['mp3', 'wav', 'ogg'],
  VIDEO: ['mp4', 'avi', 'mov']
} as const;

export const ANALYSIS_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed'
} as const;

export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export const API_ENDPOINTS = {
  FILES: '/api/files',
  METADATA: '/api/metadata',
  ANALYSIS: '/api/analysis',
  TAGS: '/api/tags'
} as const;