# 도서 검색 앱 (AI 어시스턴트 활용)

Google Books API를 이용한 도서 검색 웹
요구사항만 자연어로 전달하고 Claude Code가 구현한 두 번째 AI 실습 프로젝트

직접 구현한 [react-test-02](../react-test-02)와 같은 주제로, 같은 기능을 AI가 어떻게 구성하는지 비교.

<br/>

## 사용 기술
- React (Vite)
- JavaScript
- Google Books API
- Claude Code (VS Code 확장)

<br/>

## 주요 기능
- 검색 버튼 클릭 또는 Enter로 검색 (자동 검색 / 디바운스 없음)
- 도서 표지, 제목, 저자, 출판일 표시
- 로딩 / 에러 / 검색 결과 없음 / 검색 전 상태 표시
- 페이지네이션 (이전 · 페이지 번호 · 다음)
- API 키 없이도 동작하고, .env에 키가 있으면 자동으로 사용

<br/>

## 실행 방법

```bash
npm install
npm run dev
```

### API 키
```bash
VITE_GOOGLE_BOOKS_API_KEY=발급받은_키
```

<br/>

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

<br/>

## AI 구현 메모

### - 버튼 · Enter 검색을 `<form>` 하나로 처리
- 입력창을 `<form>`으로 감싸고 `onSubmit`에서 검색 실행 (버튼 클릭 및 Enter 기능 - `onKeyDown`으로 Enter를 따로 감지할 필요가 없음)
- `event.preventDefault()`로 새로고침만 막아야함.

### - 상태를 boolean 여러 개로 두지 않고 문자열 하나로
- `status`를 boolean이 아닌 `'idle' | 'loading' | 'error' | 'success'` 문자열 하나로 관리. (검색 전(`idle`)과 결과 0건(`success` + 빈 배열)을 명확히 구분)
- boolean일 경우, "로딩 중이면서 에러" 같은 불가능한 조합이 생기고 JSX 조건문이 길어짐.

### - totalItems를 믿지 않는 페이지네이션
Google Books의 `totalItems`는 전체 개수가 아니라 추정치라서 페이지마다 값이 흔들리는 문제
- 페이지 수는 **1페이지 응답의 `totalItems`로만** 계산하고, 이후 페이지에서는 갱신하지 않음
- 최대 10페이지로 상한(`MAX_PAGES`)
- 넘어간 페이지가 비어 있으면 그 앞 페이지를 마지막으로 보고, 페이지 수를 줄인 뒤 한 번만 되돌아감

※ 한계 : 이렇게 해도 표시되는 총 페이지 수는 추정치다. (위 [페이지네이션 정확도](#페이지네이션-정확도--둘-다-정확하지-않다) 참고)

### - 이전 요청 취소 (경쟁 상태 방지)
페이지 버튼을 빠르게 여러 번 누르면 응답이 뒤바뀐 순서로 도착해 나중에 누른 페이지가 먼저 그려지는 문제
`AbortController`를 `useRef`에 보관해 새 요청 전에 이전 요청을 취소하고,
`AbortError`는 사용자에게 보여줄 에러가 아니므로 무시

<br/>

## react-test-02와의 차이

같은 기능을 직접 구현한 [react-test-02](../react-test-02)와 비교. (CSS 제외)

| 항목 | react-test-02 | react-test-ai-02 |
|---|---|---|
| 파일 구성 | `App.jsx` + `BookItem.jsx` (+ 학습용 `App_useEffect.jsx`) | `App.jsx` + `api/googleBooks.js` + 컴포넌트 5개 |
| API 호출 위치 | `App.jsx` 안에서 직접 fetch | `api/googleBooks.js`로 분리 |
| URL 조립 | 템플릿 문자열 | `URLSearchParams` |
| 상태 관리 | `loading` + `error` + `searchFlag` (boolean 조합) | `status` 문자열 1개 |
| 검색어 상태 | `query` 하나가 입력값 · 검색어 겸용 | 입력값은 SearchForm, 검색된 `keyword`는 App |
| Enter 처리 | `onKeyDown`에서 `e.key === 'Enter'` | `<form>`의 `onSubmit` 하나로 통합 |
| 페이지네이션 | 이전 / 다음 + `현재 / 전체` | 이전 / 번호 버튼(최대 5개) / 다음 |
| 요청 취소 | 없음 | `AbortController` |
| API 키 | 필수 (없으면 `key=undefined`로 요청됨) | 선택 (있으면 사용) |
| 검색 중 버튼 | 계속 클릭 가능 | `disabled` 처리 |


### - 검색 후 입력창을 고치고 페이지를 넘길 때
02는 `query` 하나가 입력값과 검색어를 겸한다.
`react`를 검색한 뒤 **검색 버튼을 누르지 않고** 입력창을 `python`으로 고치고 [다음]을 누르면
`python`의 2페이지를 가져와서, 화면의 결과 정보와 실제 결과가 어긋난다.
ai-02는 입력 중 텍스트를 SearchForm이 갖고, 실제로 검색이 실행된 키워드만 App의 `keyword`에 남긴다.

※ `keyword`가 필요한 이유는 **페이지 이동 시 App이 재검색을 해야 하기 때문**이다.
페이지네이션이 없다면 검색어를 App에 보관할 필요가 없다.

### - 검색어에 특수문자 · 공백이 들어갈 때
02는 `q=${query}`로 값을 그대로 끼워 넣어서 `C++ & Java`처럼 `&`가 포함되면
URL의 파라미터 구분자로 해석된다. ai-02는 `URLSearchParams`가 `%26`으로 인코딩한다.
빈 검색어도 02는 `query === ''`만 확인해서 공백만(`"   "`) 입력하면 요청이 나가고,
ai-02는 `trim()` 후에 검사한다.

### - 검색 전 화면
02는 초기 상태가 `loading=false && error=null`이라 "검색 결과: 0건"이 먼저 보인다.
ai-02는 `idle` 상태를 따로 둬서 검색 전 안내 문구를 보여준다.

### - volumeInfo가 없는 항목
02는 `book.volumeInfo`를 바로 구조 분해해서, 해당 필드가 없는 항목이 섞이면 런타임 에러가 난다.
ai-02는 `?? {}`로 막고, 표지가 없으면 자리표시자를 넣는다.

### - 페이지네이션 정확도 — 둘 다 정확하지 않다
Google Books의 전체데이터인 `totalItems`는 추정치. (이 API로 정확한 전체 페이지 수 표시는 원리적으로 불가능)
차이는 정확도가 아니라 틀리는 방식이다.
- 02: 페이지마다 `total`을 갱신해서 총 페이지 수가 눈에 보이게 튄다 (`3 / 30` → `4 / 1`)
- ai-02: 1페이지 값으로 고정해 튀지는 않지만, 그 고정된 숫자 자체가 여전히 추정치
  (`react` 검색 시 `totalItems`가 300으로 와서 상한인 10페이지가 그대로 표시됨)

정확성만 보면 **[더 보기] 버튼이나 이전/다음 방식**이 이 API에 맞다.
번호 페이지네이션은 전체 개수를 알아야 하므로 Google Books와 궁합이 나쁘다.

### => 추후
02는 fetch · useEffect · 상태 처리 **문법을 익히는 데** 초점이 맞춰져 있음.
ai-02와의 차이를 확인하여 02 수정 필요.


<br/>


## 진행 기록
- 2026-08-12: Claude Code에 요구사항(검색 방식, 표시 항목, 상태 표시, 페이지네이션) 전달 후 생성
- 2026-08-12: 컴포넌트 분리는 AI 판단에 맡김 → SearchForm / StatusMessage / BookList / BookItem / Pagination + api 모듈로 분리됨
- 2026-08-12: API 키는 필수가 아니라 선택(있으면 사용)으로 처리하도록 구현됨
