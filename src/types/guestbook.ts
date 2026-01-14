/**
 * 방명록 관련 타입 정의
 */

import { Side } from './common';

export interface GuestbookMessage {
  id: string;
  side: Side;
  author: string;
  message: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GuestbookFormData {
  side: Side;
  author: string;
  message: string;
  password?: string;
}

export interface GuestbookCreateRequest {
  side: Side;
  author: string;
  message: string;
  password?: string;
}

export interface GuestbookCreateResponse {
  success: boolean;
  id: string;
  message?: string;
}

export interface GuestbookListRequest {
  side: Side;
  limit?: number;
  offset?: number;
}

export interface GuestbookListResponse {
  success: boolean;
  messages: GuestbookMessage[];
  total: number;
}

export interface GuestbookDeleteRequest {
  id: string;
  password: string;
}

export interface GuestbookDeleteResponse {
  success: boolean;
  message: string;
}
