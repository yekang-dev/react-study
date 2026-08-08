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
\`\`\`bash
npm install
npm run dev
\`\`\`

## 진행 기록
- 2026-08-05: Vite로 프로젝트 생성, useState로 Todo 추가/삭제/완료 기능 구현
- 2026-08-05: onKeyDown 방식을 form onSubmit 방식으로 변경, 남은/전체 개수 표시 추가
- 2026-08-09: TodoItem 컴포넌트 분리(props), 필터링(전체/진행중/완료) 기능 추가
- 2026-08-09: localStorage 저장 기능 추가(useEffect), 일정 수정기능 추가 (불필요한 태그 없이 묶는 Fragment(<></>) 알게됨)