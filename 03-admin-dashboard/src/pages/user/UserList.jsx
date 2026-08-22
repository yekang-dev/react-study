import { loadUsers } from '../../data/user'
import { Link } from 'react-router'

function UserList(){

  const users = loadUsers();
  
  return (
    <>
    <div className="list-header">
      <h2>사용자 목록</h2>
      <button type="button">
        <Link to="/admin/user/regist">
          등록
        </Link>
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>이름</th>
          <th>이메일</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((data)=>(
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>
                <Link to={`/admin/user/detail/${data.id}`}>
                  {data.name}
                </Link>
              </td>
              <td>{data.email}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
    </>
  )
}

export default UserList;