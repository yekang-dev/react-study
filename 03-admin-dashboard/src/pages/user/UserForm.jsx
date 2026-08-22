import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { userInsert } from "../../data/user";

function UserForm () {

  const [role, setRole] = useState('관리자');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // 코드가 판단하여 이동. (저장이 끝난 뒤 이동해야하는 것을 코드가 판단.)
  const navigate = useNavigate();

  // 날짜 포멧
  const formatDate = (date = new Date()) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() +1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  const insertUser = (e) => {
    e.preventDefault(); // form 새로고침 막기
    userInsert({ id: Date.now(), role, name, email, phone, joinedAt: formatDate()})

    // 저장 후, 해당 경로로 이동
    navigate('/admin/user');
  }
  

  return (
    <>
    <h2>사용자 등록</h2>
    <form onSubmit={insertUser}>
      <table>
        <colgroup>
          <col width="100" />
          <col width="200"/>
        </colgroup>
        <tbody>
          <tr>
            <td>타입</td>
            <td>
              <label>
                <input
                  type="radio"
                  name="type"
                  value='관리자'
                  checked={role === '관리자'}
                  onChange={(e) => setRole(e.target.value)}
                />
                관리자
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value='일반'
                  checked={role === '일반'}
                  onChange={(e) => setRole(e.target.value)}
                />
                일반
              </label>
            </td>
          </tr>
          <tr>
            <td>이름</td>
            <td>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
              />
            </td>
          </tr>
          <tr>
            <td>이메일</td>
            <td>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
              />
            </td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="전화번호를 입력하세요"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br/>
      <div className="list-footer">
        <button type="button">
          <Link to="/admin/user" className="btn">목록</Link>
        </button>
        <button type="submit">등록</button>
      </div>
    </form>
    </>
  )
}

export default UserForm;