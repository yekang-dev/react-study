import { Routes, Route, Navigate } from "react-router"
import Login from './pages/Login'
import TopMenu from './layouts/TopMenu'
import Dashboard from './pages/Dashboard'
import NoticeList from './pages/notice/NoticeList'
import UserList from './pages/user/UserList'
import UserDetail from "./pages/user/UserDetail"
import NotFound from "./pages/NotFound"

// App.jsx : 실제 화면 구조를 그리는 곳.
function App() {

  return (
    <>
      <Routes>

        {/* path : url 경로
        element : path 경로일 때, 연결해줄 화면(JSX) */}
        <Route path="/login" element={<Login/>}/>

        {/* Navigate : 화면을 그리지 않고, 랜더링 순간 다른 주소 (to의 경로)로 이동 */}
        {/* replace : 히스토리 덮어 씌우기.
        - /로 입력했다가 /admin 으로 이동하면, /와 /admin이 기록에 남음
        - replace를 작성하면 /의 히스토리가 /admin으로 덮어 씌워져 /admin만 남음 */}
        <Route path="/" element={<Navigate  to="/admin" replace />} />

        {/* url 중첩 (/admin이 부모, 그 안의 값이 자식) */}
        <Route path="/admin" element={<TopMenu/>}>
          {/* index : 부모 경로에 정확히(뒤에 자식 없이) 들어올 경우, 보여지는 화면 표시 */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="notice" element={<NoticeList/>}/>


          <Route path="user" element={<UserList/>}/>
          {/* url을 통해 매칭된 id값을 호출 하려면 아래와 같이 진행 */}
          <Route path="user/detail/:id" element={<UserDetail/>}/>
        </Route>
        {/* 위의 어느 것에도 안 걸린 나머지의 경로로 접근 시 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  )
}

export default App
