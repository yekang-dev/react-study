# 도서 검색 앱 (AI 어시스턴트 활용)

Google Books API를 이용한 도서 검색 웹
요구사항만 자연어로 전달하고 Claude Code가 구현한 두 번째 AI 실습 프로젝트

직접 구현한 [react-test-02](../react-test-02)와 같은 주제로, 같은 기능을 AI가 어떻게 구성하는지 비교.

## 사용 기술
- React (Vite)
- JavaScript
- Google Books API
- Claude Code (VS Code 확장)

## 주요 기능
- 검색 버튼 클릭 또는 Enter로 검색 (자동 검색 / 디바운스 없음)
- 도서 표지, 제목, 저자, 출판일 표시
- 로딩 / 에러 / 검색 결과 없음 / 검색 전 상태 표시
- 페이지네이션 (이전 · 페이지 번호 · 다음)
- API 키 없이도 동작하고, .env에 키가 있으면 자동으로 사용

## 실행 방법

```bash
npm install
npm run dev
```

### API 키
```bash
VITE_GOOGLE_BOOKS_API_KEY=발급받은_키
```

## 폴더 구조
```
src/
├── App.jsx                    # 상태(검색어, 결과, 상태값, 페이지)와 검색 로직
├── api/
│   └── googleBooks.js         # Google Books API 호출 + URL 조립
└── components/
    ├── SearchForm.jsx         # 입력창 + 검색 버튼 (form submit으로 버튼/Enter 처리)
    ├── StatusMessage.jsx      # 로딩 / 에러 / 결과 없음 / 검색 전 메시지
    ├── BookList.jsx           # 목록 반복 렌더링
    ├── BookItem.jsx           # 도서 1건 카드 (표지·제목·저자·출판일)
    └── Pagination.jsx         # 이전 / 페이지 번호 / 다음
```


## 진행 기록
- 2026-08-12: Claude Code에 요구사항(검색 방식, 표시 항목, 상태 표시, 페이지네이션) 전달 후 생성
- 2026-08-12: 컴포넌트 분리는 AI 판단에 맡김 → SearchForm / StatusMessage / BookList / BookItem / Pagination + api 모듈로 분리됨
- 2026-08-12: API 키는 필수가 아니라 선택(있으면 사용)으로 처리하도록 구현됨



## 구현 메모

### 버튼 · Enter 검색을 `<form>` 하나로 처리
입력창을 `<form>`으로 감싸고 `onSubmit`에서 검색을 실행하면
[검색 버튼 클릭]과 [입력창에서 Enter] 두 경우가 모두 같은 핸들러로 들어온다.
`onKeyDown`으로 Enter를 따로 감지할 필요가 없다. (`event.preventDefault()`로 새로고침만 막아주면 된다)

### 상태를 boolean 여러 개로 두지 않고 문자열 하나로
`loading`, `error`, `searched`를 각각 boolean으로 두면
"로딩 중이면서 에러" 같은 불가능한 조합이 생기고 JSX 조건문이 길어진다.
`status`를 `'idle' | 'loading' | 'error' | 'success'` 문자열 하나로 관리해
검색 전(`idle`)과 결과 0건(`success` + 빈 배열)을 명확히 구분했다.

### totalItems를 믿지 않는 페이지네이션
Google Books의 `totalItems`는 전체 개수가 아니라 추정치라서 페이지마다 값이 흔들린다.
- 페이지 수는 **1페이지 응답의 `totalItems`로만** 계산하고, 이후 페이지에서는 갱신하지 않는다.
- 최대 10페이지로 상한(`MAX_PAGES`)을 둔다.
- 넘어간 페이지가 비어 있으면 그 앞 페이지를 마지막으로 보고, 페이지 수를 줄인 뒤 한 번만 되돌아간다.

### 이전 요청 취소 (경쟁 상태 방지)
페이지 버튼을 빠르게 여러 번 누르면 응답이 뒤바뀐 순서로 도착해
나중에 누른 페이지가 먼저 그려질 수 있다.
`AbortController`를 `useRef`에 보관해 새 요청 전에 이전 요청을 취소하고,
`AbortError`는 사용자에게 보여줄 에러가 아니므로 무시한다.