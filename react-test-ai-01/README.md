# React Todo List (AI 어시스턴트 활용)

Claude Code에게 요구사항만 자연어로 전달하고, 
구현을 맡겨서 만든 Todo List 앱
AI 코딩 어시스턴트 워크플로우를 경험해보기 위한 실습

## 사용 기술
- React
- Vite
- Claude Code (VS Code 확장)

## 진행 방식
1. VS Code에 Claude Code 확장 설치
2. 프로젝트 경로 확인 후, Todo List에 필요한 기능을 자연어로 설명
3. AI가 생성한 코드 확인 및 실행

## 주요 기능
- 할 일 추가/수정/삭제
- 할 일 완료 처리 (완료 시 하단으로 이동)
- 전체 / 진행 / 완료 필터 (각 개수 표시)
- localStorage 저장 (새로고침해도 목록 유지)

## 실행 방법
```bash
npm install
npm run dev
```

## 진행 기록
 - 2026-08-05: Claude Code를 통해 Vite로 React 프로젝트 생성
 - 2026-08-05: 자연어로 Todo 리스트 생성 및 수정 요청을 전달하고, AI가 JSX/CSS를 생성/수정하는 방식으로 진행
- 2026-08-09: StrictMode가 업데이터 함수를 두 번 호출해 id가 2씩 증가하는 현상을 발견, nextId++ 를 업데이터 밖으로 옮겨 해결
 - 2026-08-09: 필터 / 수정 / localStorage 저장 3가지를 한 번에 요청하고, 컴포넌트 분리 방식은 AI 판단에 맡김
 - 2026-08-09: App.jsx 한 파일에서 TodoForm · TodoFilter · TodoList · TodoItem + storage.js 로 분리됨
 - 2026-08-09: 새로고침 시, id가 1부터 다시 시작해 저장된 id와 충돌하는 문제를 AI가 먼저 짚어 목록의 최대 id 값의 +1 하도록 수정


## 폴더 구조
```
src/
├── App.jsx              # 상태(todos, filter)와 로직
├── storage.js           # localStorage 읽기/쓰기
└── components/
    ├── TodoForm.jsx     # 입력창 + 추가
    ├── TodoFilter.jsx   # 전체/진행/완료 버튼
    ├── TodoList.jsx     # 목록 렌더링
    └── TodoItem.jsx     # 항목 1개 + 수정 모드
```


## react-test-01(직접 구현)과의 비교

같은 기능의 Todo List를 직접 구현한 것과 AI에게 맡긴 것의 차이 정리.

### 파일 구조
```
react-test-01                react-test-ai-01
src/                         src/
├── App.jsx                  ├── App.jsx
└── TodoItem.jsx             ├── storage.js
                             └── components/
                                 ├── TodoForm.jsx
                                 ├── TodoFilter.jsx
                                 ├── TodoList.jsx
                                 └── TodoItem.jsx
```

### 주요 차이

| 항목 | react-test-01 (직접) | react-test-ai-01 (AI) |
|---|---|---|
| 입력창 state 위치 | App이 보관 | TodoForm이 각자 보관 |
| 컴포넌트 분리 | 항목(TodoItem)만 분리 | 폼 · 필터 · 목록 · 항목까지 분리 |
| localStorage | App 안에 직접 작성 | storage.js로 분리, try/catch 처리 |
| 저장값 읽기 | `useState(() => ...)` lazy 초기화 | 모듈 최상단에서 1회 읽기 |
| id 발급 | `Date.now()` | 증가 카운터 + 저장된 최대 id 이어받기 |
| 함수형 업데이트 | 추가에만 `prev` 사용 | 추가 · 완료 · 수정 · 삭제 전부 `prev` 사용 |
| 필터 버튼 | 버튼 3개를 각각 작성 | 배열 정의 후 map으로 렌더 |
| 스타일 | JSX 안에 inline style | App.css + className |
| 완료 토글 | span 클릭 | 체크박스(숨김) + label |
| 데이터 필드명 | `text` | `title` |
| 수정 모드 분기 | 삼항 연산자 + Fragment | early return |
| 수정 취소 | 취소 버튼 | 취소 버튼 + Esc 키 |
| 필터 결과가 비었을 때 | 안내 없음 | "표시할 할 일이 없습니다." |
| 완료 항목 정렬 | 없음 | 완료 시 하단으로 이동 |

### react-test-01이 더 나은 점
- **lazy 초기화** — `useState(() => {...})`가 React 정석 방식. ai-01은 nextId 계산 때문에 모듈 밖에서 읽음.
- **`Date.now()` id** — localStorage와 궁합이 좋아 새로고침 후 id 충돌 처리가 따로 필요 없음.
