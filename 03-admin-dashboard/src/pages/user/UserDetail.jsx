import { useParams, Link } from "react-router"
import { userDetail } from '../../data/user'

function UserDetail () {

  // useParams : URL의 동적부분을 꺼내는 훅.
  // 객체 형식으로 반환 { id: "1" }, Route에 설정된 이름과 동일
  // URL은 텍스트이므로 값은 항상 문자열.
  // ?page=2 같은 쿼리스트링은 안 나옴. (useSearchParams 담당)
  
  // const id = userParams().id 도 가능.
  // 여러개일 경우, const { id, pw } = useParams();
  const { id } = useParams();
  const userData = userDetail(id);

  return (
    <>
    <h2>사용자 상세</h2>
    <table>
      <colgroup>
        <col width="100" />
        <col width="200"/>
      </colgroup>
      <tbody>
        <tr>
          <td>번호</td>
          <td>{userData.id}</td>
        </tr>
        <tr>
          <td>타입</td>
          <td>{userData.role}</td>
        </tr>
        <tr>
          <td>이름</td>
          <td>{userData.name}</td>
        </tr>
        <tr>
          <td>이메일</td>
          <td>{userData.email}</td>
        </tr>
        <tr>
          <td>전화번호</td>
          <td>{userData.phone}</td>
        </tr>
        <tr>
          <td>가입일</td>
          <td>{userData.joinedAt}</td>
        </tr>
      </tbody>
    </table>
    <br/>
    <div>
      <button type="button">
        <Link to="/admin/user">목록</Link>
      </button>
    </div>
    </>
  )
}

export default UserDetail;