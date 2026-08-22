# 관리자 대시보드 (React Router 라우팅 연습)

React Router를 활용한 라우팅 구조 학습을 위한 관리자 대시보드 웹

## 사용 기술
- React (Vite)
- React Router
- JavaScript

> 스타일(CSS)은 학습 범위가 아니므로 AI가 제공한 것을 그대로 사용.

## 주요 기능
- 중첩 라우트 기반 공통 레이아웃 (Outlet)
- 대메뉴 현재 위치 활성 표시 (NavLink)
- `/`, `/admin` 진입 시 대시보드로 리다이렉트 (Navigate)
- 정의되지 않은 경로 404 처리 (path="*")
- 회원 목록 렌더링
- URL 파라미터로 회원 상세 조회 (useParams)
- 등록 / 수정 화면 통합 (id 유무로 모드 구분)
- 저장 후 목록 이동 (useNavigate, replace로 재제출 방지)
- 데이터 계층 분리 및 localStorage 연동

## 실행 방법

```bash
npm install
npm run dev
```

## 진행 기록
- 2026-08-19: 프로젝트 세팅 (Vite + React), react-router 설치
- 2026-08-20: 라우트 구조 설계 (라우트 표 작성)
- 2026-08-21: 라우트 기본 구조 구현 — 중첩 라우트, 리다이렉트, 404, 대메뉴 연결
- 2026-08-23: 대메뉴 NavLink 연결 및 기본 스타일 적용
- 2026-08-23: 회원 목록 / 상세 / 등록 / 수정 구현 (`useParams`, `useNavigate`, localStorage 연동)


## 라우트 구조

| 경로 | 화면 | 내용 | 로그인 필요 |
|---|---|---|---|
| `/login` | 로그인 | 로그인 화면 | X |
| `/admin` | 레이아웃 | 대메뉴 + 자식 페이지 표출, `/admin/dashboard`로 리다이렉트 | O |
| `/admin/dashboard` | 대시보드 | 회원 수, 최근 게시글 등 요약 정보 | O |
| `/admin/user` | 회원 목록 | 회원 목록 | O |
| `/admin/user/detail/:id` | 회원 상세 | 회원 상세 정보 | O |
| `/admin/user/regist` | 회원 등록 | 회원 등록 | O |
| `/admin/user/update/:id` | 회원 수정 | 회원 정보 수정 | O |
| `/admin/notice` | 게시판 목록 | 게시글 목록 | O |
| `/admin/notice/detail/:id` | 게시판 상세 | 게시글 상세 | O |
| `/admin/notice/regist` | 게시판 등록 | 게시글 등록 | O |
| `/admin/notice/update/:id` | 게시판 수정 | 게시글 수정 | O |
| `*` | 404 | 정의되지 않은 경로 | X |

