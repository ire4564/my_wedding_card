/**
 * 애플리케이션 설정 관련 타입 정의
 */

export interface MusicSettings {
  isPlaying: boolean;
  currentTrack: number;
  volume: number;
}

export interface AccountInfo {
  bank: string;
  owner: string;
  accountNumber: string;
}

export interface AccountSettings {
  groom: AccountInfo;
  bride: AccountInfo;
}

export interface TransportInfo {
  parking: string;
  publicTransport: string;
}

export interface SnapPhoto {
  id: string;
  frontImage: string;
  backImage?: string;
  hasFlip: boolean;
  alt: string;
}
