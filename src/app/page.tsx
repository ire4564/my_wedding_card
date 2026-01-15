import Hero from '@/components/sections/Hero';
import BasicInfo from '@/components/sections/BasicInfo';
import SnapPhotos from '@/components/sections/SnapPhotos';
import LocationGuide from '@/components/sections/LocationGuide';
import AttendanceModal from '@/components/sections/AttendanceModal';
import AccountInfo from '@/components/sections/AccountInfo';
import Footer from '@/components/sections/Footer';
import MusicToggle from '@/components/common/MusicToggle';

export default function Home() {
  // 환경 변수에서 결혼식 정보 가져오기
  const groomName = process.env.NEXT_PUBLIC_GROOM_NAME || '이현준';
  const brideName = process.env.NEXT_PUBLIC_BRIDE_NAME || '김도희';
  const weddingDate = process.env.NEXT_PUBLIC_WEDDING_DATE || '2026-06-14';
  const weddingTime = process.env.NEXT_PUBLIC_WEDDING_TIME || '11:00';
  const weddingPlace = process.env.NEXT_PUBLIC_WEDDING_PLACE || '대전 BNK 웨딩홀';
  const weddingAddress = process.env.NEXT_PUBLIC_WEDDING_ADDRESS || '대전시 중구 대종로 480번길 15';
  const weddingLat = Number(process.env.NEXT_PUBLIC_WEDDING_LAT) || 36.3263;
  const weddingLng = Number(process.env.NEXT_PUBLIC_WEDDING_LNG) || 127.4256;
  const parkingInfo = process.env.NEXT_PUBLIC_PARKING_INFO;
  const transportInfo = process.env.NEXT_PUBLIC_TRANSPORT_INFO;

  // 계좌 정보
  const groomAccount = process.env.NEXT_PUBLIC_ACCOUNT_GROOM || '신한은행|이현준|110-XXX-XXXXX';
  const brideAccount = process.env.NEXT_PUBLIC_ACCOUNT_BRIDE || '신한은행|김도희|110-XXX-XXXXX';

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

      <BasicInfo
        groomName={groomName}
        brideName={brideName}
        weddingDate={weddingDate}
        weddingTime={weddingTime}
        weddingPlace={weddingPlace}
        weddingAddress={weddingAddress}
      />

      <SnapPhotos />

      <LocationGuide
        place={weddingPlace}
        address={weddingAddress}
        lat={weddingLat}
        lng={weddingLng}
        parkingInfo={parkingInfo}
        transportInfo={transportInfo}
      />

      <AccountInfo groomAccount={groomAccount} brideAccount={brideAccount} />

      <Footer groomName={groomName} brideName={brideName} />

      {/* 참석 여부 확인 모달 */}
      <AttendanceModal />

      {/* 배경 음악 토글 버튼 */}
      {musicUrls.length > 0 && <MusicToggle musicUrls={musicUrls} />}
    </main>
  );
}
