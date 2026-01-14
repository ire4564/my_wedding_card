/**
 * 참석 여부 관련 타입 정의
 */

export type AttendanceStatus = 'yes' | 'no';

export interface AttendanceRecord {
  name: string;
  attendance: AttendanceStatus;
  count: number;
  timestamp: string;
}

export interface AttendanceFormData {
  name: string;
  attendance: AttendanceStatus;
  count: number;
}

export interface AttendanceSubmitRequest {
  name: string;
  attendance: AttendanceStatus;
  count: number;
}

export interface AttendanceSubmitResponse {
  success: boolean;
  message: string;
}
