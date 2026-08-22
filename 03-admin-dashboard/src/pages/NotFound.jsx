import { Link } from "react-router"

function NotFound() {
  return(
  <>
    <h2>페이지를 찾을 수 없습니다</h2>
    <Link to="/admin">돌아가기</Link>
    </>
  )
  
}

export default NotFound