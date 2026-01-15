import axios from 'axios';
import type {
  AttendanceSubmitRequest,
  AttendanceSubmitResponse,
} from '@/types/attendance';
import type {
  GuestbookListResponse,
  GuestbookCreateRequest,
  GuestbookCreateResponse,
  GuestbookDeleteRequest,
  GuestbookDeleteResponse,
} from '@/types/guestbook';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

/**
 * 참석 여부 제출
 */
export async function submitAttendance(data: AttendanceSubmitRequest): Promise<AttendanceSubmitResponse> {
  const response = await api.post<AttendanceSubmitResponse>('/attendance', data);
  return response.data;
}

/**
 * 방명록 조회
 */
export async function getGuestbookMessages(
  side: 'bride' | 'groom',
  limit = 50,
  offset = 0
): Promise<GuestbookListResponse> {
  const response = await api.get<GuestbookListResponse>('/guestbook', {
    params: { side, limit, offset },
  });
  return response.data;
}

/**
 * 방명록 작성
 */
export async function createGuestbookMessage(
  data: GuestbookCreateRequest
): Promise<GuestbookCreateResponse> {
  const response = await api.post<GuestbookCreateResponse>('/guestbook', data);
  return response.data;
}

/**
 * 방명록 삭제
 */
export async function deleteGuestbookMessage(
  data: GuestbookDeleteRequest
): Promise<GuestbookDeleteResponse> {
  const response = await api.delete<GuestbookDeleteResponse>('/guestbook', {
    data,
  });
  return response.data;
}

/**
 * 사진 업로드
 */
export async function uploadPhotos(files: File[]): Promise<{ success: boolean; urls: string[] }> {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await api.post<{ success: boolean; message: string; urls: string[] }>(
    '/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000, // 사진 업로드는 더 긴 타임아웃
    }
  );

  return response.data;
}

export default api;
