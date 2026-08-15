# 도서 검색 앱 (Book Search App)

Google Books API를 활용한 도서 검색 웹
검색어를 입력하면 관련 도서 목록을 표지·저자·출판일 표출 및 페이지네이션 지원

## 사용 기술
- React (Vite)
- JavaScript
- Google Books API

## 주요 기능
- 검색어 입력 시 자동 검색 (useEffect) -> App_useEffect.jsx
- 검색어 입력 시 버튼 검색 (이벤트 핸들러) -> App.jsx
- 로딩 / 에러 / 검색 결과 없음 / 결과 표시 상태 처리
- 도서 표지, 제목, 저자, 출판일 렌더링
- API 키 환경변수(.env) 관리
- 페이지네이션 (이전 / 다음)

## 실행 방법

```bash
npm install
npm run dev
```

프로젝트 루트에 .env 파일을 만들고 Google Books API 키를 설정 필요

```bash
VITE_GOOGLE_BOOKS_API_KEY=발급받은_키
```


## 진행 기록
- 2026-08-10: Vite로 프로젝트 생성, components 폴더 미리 생성, useState로 검색 input 구현
- 2026-08-10: fetch + async/await로 Google Books API 연동, 검색 결과 map으로 렌더링
- 2026-08-10: useEffect 자동 검색 구현(의존성 배열 query), 디바운스 적용(setTimeout + cleanup으로 clearTimeout)
- 2026-08-10: 로딩/에러/성공 상태 처리(try/catch/finally, response.ok 체크), BookItem 컴포넌트 분리
- 2026-08-11: API 키 발급, .env에 VITE_ 접두사로 저장(429 할당량 문제 해결)
- 2026-08-11: 버튼 검색 방식으로 전환(useEffect 없이 이벤트 핸들러에서 직접 fetch), searchFlag 상태로 검색 전 "결과 없음" 방지, Enter 검색 추가
- 2026-08-12: 페이지네이션 추가(startIndex/maxResults), useEffect 방식과 버튼 방식 둘 다 구현해봄
- 2026-08-12: Google Books API의 totalItems 신뢰성 문제 확인 → 응답 개수 기반으로 다음 페이지 판단하도록 변경



## 트러블슈팅

### Google Books API의 totalItems 신뢰성 문제
- **증상**: `totalItems`가 검색어와 무관하게 부정확한 값(예: 300)으로 반환되고,
  다음 페이지 요청 시 값이 급변하며(300 → 3) `items`가 빈 배열로 오는 경우 발생.
- **원인**: Google Books API의 `totalItems`는 전체 개수가 아니라
  "현재 인덱스 기준 남은 항목의 추정치"라, 요청마다 값이 달라지고 신뢰할 수 없음.
- **해결**: `totalItems` 기반 페이지 수 계산을 포기하고,
  "다음 페이지를 실제로 요청해본 뒤 결과가 있을 때만 페이지를 이동"하는 방식으로 변경.
  결과가 비어있으면 페이지를 넘기지 않고 마지막 페이지로 처리(`isLastPage`).
- **한계**: API 특성상 완벽한 전체 페이지 수 표시는 불가능하여,
  현재 페이지 번호만 노출하고 다음 페이지 유무는 응답 기반으로 판단함.