/**
 * 공통 타입 정의
 */

export type Side = 'bride' | 'groom';

export interface WeddingInfo {
  groomName: string;
  brideName: string;
  date: string;
  time: string;
  place: string;
  address: string;
  lat: number;
  lng: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface UploadProgress {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  url?: string;
  error?: string;
}
