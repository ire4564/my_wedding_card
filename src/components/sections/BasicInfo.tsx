'use client';

interface BasicInfoProps {
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  weddingPlace: string;
  weddingAddress: string;
  message?: string;
}

export default function BasicInfo({
  groomName,
  brideName,
  weddingDate,
  weddingTime,
  weddingPlace,
  weddingAddress,
  message = '서로가 마주보며 다져온 사랑을\n이제 함께 한 곳을 바라보며\n걸어갈 수 있는 큰 사랑으로 키우고자 합니다.\n\n저희 두 사람이 사랑의 이름으로 지켜나갈\n첫 걸음에 여러분을 초대합니다.',
}: BasicInfoProps) {
  // 날짜 포맷팅
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const dayOfWeek = days[date.getDay()];

    return { year, month, day, dayOfWeek };
  };

  const { year, month, day, dayOfWeek } = formatDate(weddingDate);

  return (
    <section className="section-padding container-width bg-white">
      {/* 인사말 */}
      <div className="text-center mb-12">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
          {message}
        </p>
      </div>

      {/* 신랑 신부 정보 */}
      <div className="grid grid-cols-2 gap-4 mb-12 max-w-md mx-auto">
        {/* 신랑 */}
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">신랑</p>
          <p className="text-xl font-medium text-gray-800">{groomName}</p>
        </div>

        {/* 신부 */}
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">신부</p>
          <p className="text-xl font-medium text-gray-800">{brideName}</p>
        </div>
      </div>

      {/* 날짜 및 장소 정보 */}
      <div className="bg-secondary rounded-lg p-8 text-center">
        {/* 날짜 */}
        <div className="mb-6">
          <p className="text-2xl font-light text-gray-800 mb-2">
            {year}. {month}. {day}
          </p>
          <p className="text-sm text-gray-600">
            {dayOfWeek} {weddingTime}
          </p>
        </div>

        {/* 장소 */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-lg font-medium text-gray-800 mb-2">{weddingPlace}</p>
          <p className="text-sm text-gray-600">{weddingAddress}</p>
        </div>
      </div>
    </section>
  );
}
