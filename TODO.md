# 모바일 결혼식 초대장 개발 TODO

프로젝트: 이현준 & 김도희 결혼식 초대장 웹사이트
기술 스택: Next.js 14+, React 18+, Tailwind CSS, shadcn/ui, TanStack Query
배포: Vercel

---

## Phase 1: 기본 구조 & 환경 설정

- [x] Next.js 14+ 프로젝트 초기 설정 (TypeScript, ESLint)
- [ ] Tailwind CSS + styled-components 설치 및 설정
- [ ] shadcn/ui 설치 및 기본 컴포넌트 설정
- [ ] 환경 변수 설정 (.env.local 파일 생성)
- [ ] 프로젝트 디렉토리 구조 생성 (components, lib, types, styles)
- [ ] TypeScript 타입 정의 파일 작성 (attendance.ts, guestbook.ts, settings.ts, common.ts)
- [x] 반응형 디자인 브레이크포인트 설정 (Tailwind config)

---

## Phase 2: 정적 섹션 구현

- [ ] Hero 섹션 구현 (메인 비주얼, 배경음악 자동재생, 음악 토글)
- [ ] BasicInfo 섹션 구현 (신랑신부 이름, 날짜, 장소, 인사말)
- [ ] SnapPhotos 섹션 구현 (9장 스냅사진, 3열 그리드, 라이트박스)
- [ ] LocationGuide 섹션 구현 (지도, 주소, 주차 안내)
- [ ] AccountInfo 섹션 구현 (계좌 정보, 복사 버튼)
- [ ] Footer 섹션 구현 (연락처)

---

## Phase 3: Google API 연동

- [ ] Google Cloud Console에서 Service Account 생성 및 JSON 키 다운로드
- [ ] Google Sheets API 활성화 및 시트 생성 (Attendance, Guestbook)
- [ ] Google Drive API 활성화 및 사진 업로드 폴더 생성
- [ ] lib/googleSheets.ts 구현 (Sheets API 클라이언트)
- [ ] lib/googleDrive.ts 구현 (Drive API 클라이언트)
- [ ] API Route 구현 - POST /api/attendance
- [ ] API Route 구현 - GET/POST /api/guestbook
- [ ] API Route 구현 - POST /api/upload

---

## Phase 4: 동적 기능 구현

- [ ] TanStack Query (React Query) 설치 및 설정
- [ ] React Hook Form 설치 및 설정
- [ ] AttendanceModal 컴포넌트 구현 (스크롤 트리거, 폼 유효성 검사)
- [ ] Guestbook 컴포넌트 구현 (신랑측/신부측 탭, 카드 UI)
- [ ] PhotoUpload 컴포넌트 구현 (드래그앤드롭, 파일 검증, 진행률)
- [ ] Custom Hooks 구현 (useAttendance, useGuestbook, usePhotoUpload)

---

## Phase 5: 지도 & 외부 API

- [ ] Kakao Map API 키 발급 및 설정
- [ ] Naver Map API 클라이언트 ID 발급 및 설정
- [ ] LocationGuide에 Kakao Map 임베드 및 마커 표시
- [ ] 네이버/카카오 길찾기 버튼 구현 (앱 연동)
- [ ] AccountInfo에 카카오페이/토스 송금 버튼 구현
- [ ] 모바일/PC 환경 분기 처리 (송금 버튼)
- [ ] 모바일 브라우저 호환성 테스트 (iOS Safari, Chrome)

---

## Phase 6: 이스터 에그 & 최적화 & 배포

- [ ] 이미지 최적화 (Next.js Image, WebP, Lazy loading)
- [ ] 번들 최적화 (Code splitting, Tree shaking)
- [ ] Lighthouse 점수 확인 및 개선 (목표: 90+)
- [ ] 스냅 사진 3D 카드 플립 이스터 에그 구현 (선택사항)
- [ ] Vercel 프로젝트 생성 및 GitHub 연동
- [ ] Vercel 환경 변수 설정 및 배포
- [ ] 배포 후 전체 기능 테스트 (API, Google Sheets/Drive 연동)

---

## 진행 상황

- **총 작업 수**: 41개
- **완료**: 2개 ✅
- **진행률**: 4.9%

### Phase별 진행 상황
- **Phase 1**: 2/7 완료 (28.6%)
- **Phase 2**: 0/6 완료 (0%)
- **Phase 3**: 0/8 완료 (0%)
- **Phase 4**: 0/6 완료 (0%)
- **Phase 5**: 0/7 완료 (0%)
- **Phase 6**: 0/7 완료 (0%)

---

## 추가 작업 완료

- [x] 패키지 매니저를 npm에서 pnpm으로 변경 (2026-01-14)

---

## 주요 기능 체크리스트

### 필수 기능
- [ ] 9개 섹션 모두 구현 (Hero ~ Footer)
- [ ] 참석 여부 확인 모달 (Google Sheets 연동)
- [ ] 방명록 (신랑측/신부측 탭, Google Sheets 연동)
- [ ] 사진 업로드 (Google Drive 연동)
- [ ] 지도 및 길찾기 (Kakao Map, Naver Map)
- [ ] 계좌 정보 및 송금 버튼 (Kakao Pay, Toss)
- [ ] 배경 음악 자동 재생 및 토글
- [ ] 모바일 반응형 디자인

### 선택 기능
- [ ] 스냅 사진 3D 카드 플립 이스터 에그

---

## 배포 전 체크리스트

- [ ] Service Account JSON 키 생성
- [ ] .env.local 파일 작성 및 테스트
- [ ] Vercel 환경 변수 입력
- [ ] Google Sheets 공유 권한 확인
- [ ] API 엔드포인트 테스트
- [ ] 모바일 브라우저 테스트 (iOS Safari, Chrome Mobile)
- [ ] Lighthouse 점수 확인 (목표: 90+)

---

**작성일**: 2026-01-14
**최종 수정**: 2026-01-14 12:10 UTC
**완료 작업**: Phase 1-1, Phase 1-7, pnpm 마이그레이션
