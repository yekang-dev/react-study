import { useParams, Link } from "react-router"
import { userDetail } from '../../data/user'
import NotFoundData from "../../components/NotFoundData";

function UserDetail () {

  // useParams : URL의 동적부분을 꺼내는 훅.
  // 객체 형식으로 반환 { id: "1" }, Route에 설정된 이름과 동일
  // URL은 텍스트이므로 값은 항상 문자열.
  // ?page=2 같은 쿼리스트링은 안 나옴. (useSearchParams 담당)

  // const id = userParams().id 도 가능.
  // 여러개일 경우, const { id, pw } = useParams();
  const { id } = useParams();
  const userData = userDetail(id);

  // 데이터가 없으면 렌더링을 하지 않고 안내 화면으로 대체
  if(!userData) {
    return <NotFoundData message="존재하지 않는 게시글입니다." backTo="/admin/user" />
  }

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
    <div className="list-footer">
      <button type="button">
        <Link to="/admin/user">목록</Link>
      </button>
      <button type="button">
        <Link to={`/admin/user/update/${userData.id}`}>수정</Link>
      </button>
    </div>
    </>
  )
}

export default UserDetail;