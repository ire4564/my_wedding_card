'use client';

import { MapPin, Copy, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface LocationGuideProps {
  place: string;
  address: string;
  lat: number;
  lng: number;
  parkingInfo?: string;
  transportInfo?: string;
}

export default function LocationGuide({
  place,
  address,
  lat,
  lng,
  parkingInfo,
  transportInfo,
}: LocationGuideProps) {
  const [copied, setCopied] = useState(false);

  // 주소 복사
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('주소 복사 실패:', error);
    }
  };

  // 카카오맵 길찾기
  const openKakaoMap = () => {
    const url = `https://map.kakao.com/link/to/${place},${lat},${lng}`;
    window.open(url, '_blank');
  };

  // 네이버 지도 길찾기
  const openNaverMap = () => {
    const url = `https://map.naver.com/v5/directions/-/-/-/car?c=${lng},${lat},15,0,0,0,dh`;
    window.open(url, '_blank');
  };

  return (
    <section className="section-padding container-width bg-white">
      <h2 className="text-2xl sm:text-3xl font-light text-center mb-8 text-gray-800">
        오시는 길
      </h2>

      {/* 장소 정보 */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-medium text-gray-800">{place}</h3>
        </div>
        <p className="text-sm text-gray-600">{address}</p>
      </div>

      {/* 지도 placeholder (Phase 5에서 Kakao Map 추가 예정) */}
      <div className="w-full h-64 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
        <p className="text-gray-500 text-sm">지도가 여기에 표시됩니다</p>
      </div>

      {/* 주소 복사 및 길찾기 버튼 */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <Button
          onClick={copyAddress}
          variant="outline"
          className="flex-1 gap-2"
        >
          <Copy className="w-4 h-4" />
          {copied ? '복사 완료!' : '주소 복사'}
        </Button>

        <Button
          onClick={openKakaoMap}
          variant="outline"
          className="flex-1 gap-2"
        >
          <Navigation className="w-4 h-4" />
          카카오맵
        </Button>

        <Button
          onClick={openNaverMap}
          variant="outline"
          className="flex-1 gap-2"
        >
          <Navigation className="w-4 h-4" />
          네이버 지도
        </Button>
      </div>

      {/* 주차 및 대중교통 안내 */}
      {(parkingInfo || transportInfo) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {parkingInfo && (
            <div className="bg-secondary rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">주차 안내</h4>
              <p className="text-sm text-gray-600">{parkingInfo}</p>
            </div>
          )}

          {transportInfo && (
            <div className="bg-secondary rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">대중교통</h4>
              <p className="text-sm text-gray-600">{transportInfo}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
