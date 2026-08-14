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
