import Hero from '@/components/sections/Hero';
import MusicToggle from '@/components/common/MusicToggle';

export default function Home() {
  // 환경 변수에서 결혼식 정보 가져오기
  const groomName = process.env.NEXT_PUBLIC_GROOM_NAME || '이현준';
  const brideName = process.env.NEXT_PUBLIC_BRIDE_NAME || '김도희';
  const weddingDate = process.env.NEXT_PUBLIC_WEDDING_DATE || '2026-06-14';
  const weddingTime = process.env.NEXT_PUBLIC_WEDDING_TIME || '11:00';

  // 배경 음악 URL
  const musicUrls = [
    process.env.NEXT_PUBLIC_MUSIC_URL_1 || '',
    process.env.NEXT_PUBLIC_MUSIC_URL_2 || '',
  ].filter(Boolean);

  return (
    <main className="min-h-screen">
      <Hero
        groomName={groomName}
        brideName={brideName}
        weddingDate={weddingDate}
        weddingTime={weddingTime}
      />

      {/* 배경 음악 토글 버튼 */}
      {musicUrls.length > 0 && <MusicToggle musicUrls={musicUrls} />}
    </main>
  );
}
