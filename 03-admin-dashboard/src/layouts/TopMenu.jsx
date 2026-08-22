

import { Outlet, NavLink } from "react-router";

function TopMenu() {
    return (
      <div>
        <h2>대메뉴</h2>

        {/* 
        - NavLink : 현재 경로 일치(isActive) 제공. 활성화표시에서 사용.
          => isActive : 현재 경로와 NavLink에 설정한 경로가 일치하는 지 true/false
          => (주의1) isActive 함수 호출시 넘겨주므로, 함수 형식으로 진행해야함
          => (주의2) 부분일치도 true 값 호출. 따라서 /admin일 경우, /admin/dashboard 경로도 true
          => 정확히 일치할 때만 활성화하는 옵션으로 end를 붙여야함
        - Link : 화면이동 only.
        */}
        <nav>
          <NavLink to="/admin/dashboard"
            className={({ isActive }) => isActive ? 'active' : ''}> 대시보드 </NavLink>
          <NavLink to="/admin/notice"
            className={({ isActive }) => isActive ? 'active' : ''}> 공지 </NavLink>
          <NavLink to="/admin/user"
            className={({ isActive }) => isActive ? 'active' : ''}> 사용자 </NavLink>
        </nav>

        {/* Outlet : 자식 라우트가 렌더링되는 자리 */}
        <Outlet />
      </div>
    )
}

export default TopMenu;