import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'

// main.jsx : 가장 먼저 진입하는 진입점. 전역 설정.
// 라우터는 전역 설정 이므로, 이곳에서 작성
createRoot(document.getElementById('root')).render(
  // StrictMode: 개발 모드에서 잠재적 문제를 탐지하는 도구. 컴포넌트를 의도적으로 두 번 렌더링. 실제 서비스에서는 동작하지 않음
  <StrictMode>
    {/* BrowserRouter: 브라우저 주소창과 앱(App)을 연결. 주소 변경 감지 및 새로고침 없이 화면 전환 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
