# 모바일 결혼식 초대장 웹사이트

## 프로젝트 개요

이현준 & 김도희 결혼식 초대장 웹사이트 - 모바일 최적화된 반응형 웹 애플리케이션

### 결혼식 정보
- **신랑**: 이현준
- **신부**: 김도희
- **일시**: 2026년 6월 14일 11시
- **장소**: 대전 BNK 웨딩홀

### 목적
결혼식 정보 제공, 참석 여부 확인, 축하 메시지, 사진 공유 등의 기능을 제공하는 통합 플랫폼

---

## 기술 스택

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18+
- **Styling**: Tailwind CSS + styled-components
- **Component Library**: shadcn/ui (Headless UI)
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios

### Backend/External Services
- **Database**: Google Sheets API (참석자 명단, 방명록)
- **Storage**: Google Drive API (사진 업로드)
- **Maps**: Kakao Map API, Naver Map API
- **Payment**: Kakao Pay API, Toss API

### Deployment
- **Platform**: Vercel (서버리스 배포)

---

## 프로젝트 구조

```
pages/
├── index.tsx                 # 메인 페이지 (9개 섹션)
└── api/
    ├── attendance.ts         # 참석 여부 제출
    ├── guestbook.ts          # 방명록 조회/작성
    └── upload.ts             # 사진 업로드

components/
├── sections/
│   ├── Hero.tsx             # 메인 비주얼 + 배경음악
│   ├── BasicInfo.tsx        # 신랑신부, 날짜, 장소
│   ├── SnapPhotos.tsx       # 스냅 사진 앨범 (9장, 3열 그리드)
│   ├── LocationGuide.tsx    # 지도, 주소, 길찾기
│   ├── AttendanceModal.tsx  # 참석 여부 확인 모달
│   ├── Guestbook.tsx        # 방명록 (신랑측/신부측 탭)
│   ├── PhotoUpload.tsx      # 사진 업로드
│   ├── AccountInfo.tsx      # 계좌 정보
│   └── Footer.tsx           # 연락처
├── common/
│   ├── Header.tsx
│   ├── Navigation.tsx
│   └── MusicToggle.tsx
├── ui/                      # shadcn/ui 컴포넌트
│   ├── button.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   ├── tabs.tsx
│   ├── card.tsx
│   └── spinner.tsx
└── hooks/
    ├── useSettings.ts
    ├── useAttendance.ts
    ├── useGuestbook.ts
    └── usePhotoUpload.ts

lib/
├── googleSheets.ts          # Google Sheets API 클라이언트
├── googleDrive.ts           # Google Drive API 클라이언트
├── kakaoMap.ts              # Kakao Map 유틸
├── naverMap.ts              # Naver Map 유틸
└── api.ts                   # Axios 인스턴스

types/
├── attendance.ts
├── guestbook.ts
├── settings.ts
└── common.ts

styles/
├── globals.css              # Tailwind CSS
└── variables.css
```

---

## 화면 섹션 (스크롤 순서)

### 1. Hero
- 신랑/신부 메인 사진 (전체 화면 배경)
- 배경 음악 자동 재생 (2곡 중 랜덤)
- 음악 토글 버튼

### 2. BasicInfo
- 신랑/신부 이름
- 결혼식 날짜, 시간, 장소
- 인사말

### 3. SnapPhotos
- 스냅 사진 앨범 (약 9장, 3열 그리드 고정)
- 클릭 시 라이트박스 모달
- **이스터 에그 (Phase 6)**: 특정 사진 클릭 시 3D 카드 플립 애니메이션

### 4. LocationGuide
- Kakao Map 임베드
- 주소 복사 버튼
- 네이버/카카오 길찾기 버튼
- 주차 안내, 대중교통 정보

### 5. AttendanceModal
- Section 4 통과 후 자동 팝업
- 이름, 참석 여부, 참석 인원 입력
- Google Sheets 자동 기록

### 6. Guestbook
- 신랑측/신부측 탭
- 트위터 스레드 형식 (카드 UI)
- 작성자, 메시지, 비밀번호(선택)
- Google Sheets 자동 기록

### 7. PhotoUpload
- 파일 선택/드래그 앤 드롭
- 여러 파일 동시 업로드 (최대 5MB)
- Google Drive 자동 저장

### 8. AccountInfo
- 신랑측/신부측 계좌 정보
- 계좌번호 복사 버튼
- 카카오페이/토스 송금 버튼 (모바일만)

### 9. Footer
- 신랑/신부 연락처
- 예식장 연락처

---

## API 엔드포인트

### POST /api/attendance
참석 여부 제출
```typescript
Request: {
  name: string;
  attendance: 'yes' | 'no';
  count: number; // 1-5
}
Response: {
  success: boolean;
  message: string;
}
```

### GET /api/guestbook
방명록 조회
```typescript
Query: {
  side: 'bride' | 'groom';
  limit: number;
  offset: number;
}
Response: {
  messages: GuestbookMessage[];
  total: number;
}
```

### POST /api/guestbook
방명록 작성
```typescript
Request: {
  side: 'bride' | 'groom';
  author: string;
  message: string;
  password?: string;
}
Response: {
  success: boolean;
  id: string;
}
```

### POST /api/upload
사진 업로드 (multipart/form-data)
```typescript
Request: FormData with files
Response: {
  success: boolean;
  urls: string[];
}
```

---

## 환경 변수

### .env.local (로컬 개발)
```bash
# Google APIs
GOOGLE_SHEETS_ID=your_sheets_id
GOOGLE_DRIVE_FOLDER_ID=your_folder_id
GOOGLE_SERVICE_ACCOUNT={"type":"service_account",...}

# 공개 API (클라이언트)
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_key
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your_id

# 결혼식 정보
NEXT_PUBLIC_GROOM_NAME=이현준
NEXT_PUBLIC_BRIDE_NAME=김도희
NEXT_PUBLIC_WEDDING_DATE=2026-06-14
NEXT_PUBLIC_WEDDING_TIME=11:00
NEXT_PUBLIC_WEDDING_PLACE=대전 BNK 웨딩홀
NEXT_PUBLIC_WEDDING_ADDRESS=대전시 중구 ...
NEXT_PUBLIC_WEDDING_LAT=36.3263
NEXT_PUBLIC_WEDDING_LNG=127.4256

# 배경 음악
NEXT_PUBLIC_MUSIC_URL_1=https://...
NEXT_PUBLIC_MUSIC_URL_2=https://...

# 계좌 정보
NEXT_PUBLIC_ACCOUNT_GROOM=신한은행|이현준|110-XXX-XXXXX
NEXT_PUBLIC_ACCOUNT_BRIDE=신한은행|김도희|110-XXX-XXXXX

# 기타 정보
NEXT_PUBLIC_PARKING_INFO=웨딩홀 지하 주차장 이용 가능
NEXT_PUBLIC_TRANSPORT_INFO=서대전역에서 버스 101번, 차로 약 10분
```

---

## Google API 연동

### Google Sheets API
- **목적**: 참석자 명단, 방명록 데이터 관리
- **인증**: Service Account (JSON 키)
- **Sheet 구조**:
  - Sheet 1 (Attendance): `타임스탬프 | 이름 | 참석여부 | 참석인원`
  - Sheet 2 (Guestbook): `타임스탬프 | 측 | 작성자 | 메시지 | 비밀번호`

### Google Drive API
- **목적**: 사진 업로드 저장
- **인증**: Service Account (JSON 키)
- **폴더 구조**: `Wedding_2024/Photos/`

### Service Account 설정
1. Google Cloud Console → 프로젝트 생성
2. APIs 활성화 (Sheets API, Drive API)
3. 서비스 계정 생성 → JSON 키 다운로드
4. Google Drive 폴더에 Service Account 이메일 편집자 권한 부여
5. Vercel 환경 변수에 JSON 키 저장

---

## 외부 API 연동

### Kakao Map API
- 지도 표시, 마커

### Naver Map API
- 길찾기 (네비게이션 연동)
- 버튼 클릭 시 Naver Map 앱 열기

### Kakao Pay / Toss API
- 송금 기능
- 모바일: 앱 연동
- PC: "모바일 기기에서 시도해주세요" 모달

---

## 개발 가이드라인

### Phase 1: 기본 구조 & 환경 설정
- Next.js 프로젝트 설정
- 페이지 레이아웃 구성
- 환경 변수 설정
- Tailwind CSS + styled-components 셋업
- 반응형 디자인

### Phase 2: 정적 섹션 구현
- Hero, BasicInfo, SnapPhotos
- LocationGuide, AccountInfo, Footer

### Phase 3: Google API 연동
- Service Account 설정
- Google Sheets/Drive API 연결
- Next.js API Routes 구현

### Phase 4: 동적 기능 구현
- AttendanceModal
- Guestbook
- PhotoUpload
- TanStack Query 캐싱

### Phase 5: 지도 & 외부 API
- Kakao Map 임베드
- Naver Map 네비게이션
- Kakao Pay / Toss 링크
- 모바일 호환성 확인

### Phase 6: 이스터 에그 & 최적화 & 배포
- 스냅 사진 카드 플립 이스터 에그 (선택)
- 성능 최적화 (이미지, 번들)
- Lighthouse 점수 확인
- Vercel 배포
- 최종 QA

---

## 주요 기능 요구사항

### 참석 여부 확인
- Section 4 통과 시 자동 모달 팝업
- 이름, 참석 여부, 인원 입력
- Google Sheets 자동 기록
- 중복 참석 방지

### 방명록
- 신랑측/신부측 탭
- 트위터 스레드 스타일 카드 UI
- 실시간 메시지 표시
- 비밀번호로 수정/삭제
- 무한 스크롤 또는 페이지네이션

### 사진 업로드
- 여러 파일 동시 선택
- 파일 타입 검증 (jpg, png, webp)
- 크기 제한 (5MB)
- 진행률 표시
- Google Drive 자동 업로드

### 스냅 사진 카드 플립 (Phase 6)
- 특정 사진 클릭 시 3D 카드 플립 애니메이션
- 뒷면에 숨겨진 사진 표시
- Framer Motion 또는 CSS 3D Transform

---

## 반응형 디자인

### 브레이크포인트 (Tailwind)
- **Mobile**: 320px ~ 640px (주요 타겟)
- **Tablet**: 641px ~ 1024px
- **Desktop**: 1025px+

### 모바일 우선 설계
- 터치 타겟 최소 44x44px
- 안전 영역 고려 (노치)
- iOS Safari 비디오 자동재생 제한 확인

---

## 성능 최적화

### 이미지 최적화
- Next.js Image 컴포넌트 사용
- WebP 포맷, Lazy loading
- 반응형 이미지 srcset

### API 최적화
- TanStack Query 캐싱 (5분)
- Request debouncing
- 불필요한 쿼리 최소화

### 번들 최적화
- Code splitting (동적 import)
- Tree shaking

---

## 보안

### API 요청 검증
- CORS 설정
- Rate limiting (DDoS 방지)
- 입력값 검증 (XSS 방지)

### Google API 보안
- Service Account 키는 환경 변수에만 저장
- 클라이언트 사이드 API는 제한된 권한만
- Google Drive 폴더 공유 권한 최소화

---

## Vercel 배포

### 배포 단계
1. GitHub 저장소 생성 및 푸시
2. Vercel 프로젝트 생성 (GitHub 연동)
3. 환경 변수 입력 (Vercel 대시보드)
4. 자동 배포 확인

### 배포 후 확인
- 각 API 엔드포인트 테스트
- 모바일 브라우저 테스트
- Google Sheets/Drive 연동 확인
- Lighthouse 점수 확인

### 비용
- **Vercel Free 플랜**: 이 프로젝트 충분함
- API 요청: 월 10만 건
- Cold Start: 10초

---

## 데이터 모델

### GuestbookMessage
```typescript
interface GuestbookMessage {
  id: string;
  side: 'bride' | 'groom';
  author: string;
  message: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
}
```

### AttendanceRecord
```typescript
interface AttendanceRecord {
  name: string;
  attendance: 'yes' | 'no';
  count: number;
  timestamp: string;
}
```

### SnapPhoto (Phase 6 이스터 에그용)
```typescript
interface SnapPhoto {
  id: string;
  frontImage: string;
  backImage?: string; // 플립용
  hasFlip: boolean;
}
```

---

## 주의사항

### 코딩 스타일
- 모든 컴포넌트는 TypeScript로 작성
- 환경 변수는 `process.env.NEXT_PUBLIC_*`로 접근
- API Routes는 `/pages/api/` 하위에 작성
- shadcn/ui 컴포넌트 적극 활용

### 테스트
- 모바일 브라우저 (iOS Safari, Chrome Mobile) 우선 테스트
- 참석 여부 중복 방지 확인
- Google Sheets 자동 기록 확인
- 이미지 업로드 성공 확인

### 배포 전 체크리스트
- [ ] Service Account JSON 키 생성
- [ ] .env.local 파일 작성 및 테스트
- [ ] Vercel 환경 변수 입력
- [ ] Google Sheets 공유 권한 확인
- [ ] API 엔드포인트 테스트
- [ ] 모바일 브라우저 테스트
- [ ] Lighthouse 점수 확인 (목표: 90+)

---

**문서 버전**: 1.0
**최종 수정일**: 2026-01-14
**작성자**: Claude (based on PRD v2.1)
