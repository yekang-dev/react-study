import { users } from '../../data/user'
import { Link } from 'react-router'

function UserList(){
  return (
    <>
    <h2>사용자 목록</h2>
    <table>
      <thead>
        <tr>
          <td>번호</td>
          <td>이름</td>
          <td>이메일</td>
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