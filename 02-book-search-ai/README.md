# 도서 검색 앱 (AI 어시스턴트 활용)

Google Books API를 이용한 도서 검색 웹.
요구사항만 자연어로 전달하고 Claude Code가 구현한 두 번째 AI 실습 프로젝트

## 사용 기술
- React (Vite)
- JavaScript
- Google Books API
- Claude Code (VS Code 확장)

## 진행 방식
1. VS Code에 Claude Code 확장 설치
2. 프로젝트 경로 확인 후, Todo List에 필요한 기능을 자연어로 설명
3. AI가 생성한 코드 확인 및 실행

## 주요 기능
- 검색 버튼 클릭 또는 Enter로 검색 (버튼 검색으로만 진행)
- 도서 표지, 제목, 저자, 출판일 표시
- 로딩 / 에러 / 검색 결과 없음 / 검색 전 상태 표시
- 페이지네이션 (이전 · 페이지 번호 · 다음)
- API 키 없이도 동작하고, .env에 키가 있으면 자동으로 사용

## 실행 방법
```bash
npm install
npm run dev
```

프로젝트 루트에 생성된 .env 파일에 Google Books API 키를 설정 필요

```bash
VITE_GOOGLE_BOOKS_API_KEY=발급받은_키
```



## 진행 기록
- 2026-08-12: Claude Code에 요구사항(검색 방식, 표시 항목, 상태 표시, 페이지네이션) 전달 후 생성
- 2026-08-12: 컴포넌트 분리는 AI 판단에 맡김 → SearchForm / StatusMessage / BookList / BookItem / Pagination + api 모듈로 분리됨
- 2026-08-12: API 키는 필수가 아니라 선택(있으면 사용)으로 처리하도록 구현됨



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
