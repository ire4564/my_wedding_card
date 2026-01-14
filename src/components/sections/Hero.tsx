'use client';

import Image from 'next/image';

interface HeroProps {
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  backgroundImage?: string;
}

export default function Hero({
  groomName,
  brideName,
  weddingDate,
  weddingTime,
  backgroundImage = '/images/hero-background.jpg',
}: HeroProps) {
  // 날짜 포맷팅 (2026-06-14 -> 2026년 6월 14일)
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  // 요일 구하기
  const getDayOfWeek = (dateStr: string) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date(dateStr);
    return days[date.getDay()];
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Wedding Hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 text-center text-white px-8 max-w-[480px]">
        <h1 className="font-serif text-4xl sm:text-5xl font-light mb-4 tracking-[0.1em] drop-shadow-lg">
          {groomName} & {brideName}
        </h1>

        {/* 구분선 */}
        <div className="w-[60px] h-[1px] bg-white/70 mx-auto my-6" />

        <p className="text-lg font-light tracking-wide opacity-95 drop-shadow-md">
          {formatDate(weddingDate)} ({getDayOfWeek(weddingDate)}) {weddingTime}
        </p>
      </div>
    </section>
  );
}
