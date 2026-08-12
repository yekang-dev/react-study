# React Todo List (직접 구현)

React 기초 학습을 위해 직접 작성한 Todo List 앱

## 사용 기술
- React
- Vite

## 주요 기능
- 할 일 추가
- 할 일 삭제
- 할 일 완료 처리

## 실행 방법
```bash
npm install
npm run dev
```

## react-test-ai-01와 비교 후 직접 적용해볼 것
- [x] 입력창 state를 App에서 TodoForm으로 옮기기 (타이핑할 때마다 전체 목록이 리렌더되는 문제)
- [x] toggleTodo / deleteTodo / editTodo도 `setTodos((prev) => ...)` 형태로 통일
- [x] 필터 버튼 3개를 배열 + map으로 정리
- [x] TodoList 컴포넌트 분리 (App에서 map 걷어내기)
- [ ] localStorage 읽기에 try/catch 추가 (저장값이 깨지면 앱이 멈춤)
- [ ] 수정 진입 시에도 editText를 현재 값으로 초기화
- [ ] 필터 결과가 비었을 때 안내 문구 추가

## 진행 기록
- 2026-08-05: Vite로 프로젝트 생성, useState로 Todo 추가/삭제/완료 기능 구현
- 2026-08-05: onKeyDown 방식을 form onSubmit 방식으로 변경, 남은/전체 개수 표시 추가
- 2026-08-09: TodoItem 컴포넌트 분리(props), 필터링(전체/진행중/완료) 기능 추가
- 2026-08-09: localStorage 저장 기능 추가(useEffect), 일정 수정기능 추가 (불필요한 태그 없이 묶는 Fragment(<></>) 알게됨)
- 2026-08-12: AI 코딩 어시스턴트 활용 프로젝트([react-test-ai-01](../react-test-ai-01))과 비교하여 위의 [react-test-ai-01와 비교 후 직접 적용해볼 것](#react-test-ai-01와-비교-후-직접-적용해볼-것) 작업 진행 (1~4 까지)