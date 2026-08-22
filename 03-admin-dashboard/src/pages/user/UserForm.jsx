import { useState, } from "react";
import { useNavigate, useParams } from "react-router";
import { userInsert, userDetail, userUpdate } from "../../data/user";

function UserForm () {

  // 코드가 판단하여 이동. (저장이 끝난 뒤 이동해야하는 것을 코드가 판단.)
  const navigate = useNavigate();

  // 수정 시, 데이터 불러오는 용도
  const { id } = useParams();
  const userData = userDetail(id) ?? {};

  // 데이터를 form으로 하나로 묶어서 사용
  const [form, setForm] = useState(
    {
      role: userData?.role ?? '관리자',
      name: userData?.name ?? '',
      email: userData?.email ?? '',
      phone: userData?.phone ?? ''
    }
  );

  // 사용자 등록
  const insertUser = (e) => {
    e.preventDefault(); // form 새로고침 막기
    userInsert(form)

    // 저장 후, 해당 경로로 이동
    // replace : 히스토리를 덮어써서 뒤로가기 시 이미 제출 완료된 폼으로 돌아가지 않도록.(재제출 방지)
    navigate('/admin/user', { replace: true });
  }

  // 사용자 수정
  const updateUser = (e) => {
    e.preventDefault(); // form 새로고침 막기
    userUpdate(id, form);

    // 저장 후, 해당 경로로 이동
    // replace : 히스토리를 덮어써서 뒤로가기 시 이미 제출 완료된 폼으로 돌아가지 않도록.(재제출 방지)
    navigate(`/admin/user/detail/${id}`, { replace: true });
  }

  // onChange를 공통으로 만듬. (form으로 묶어서도 있고, onChange는 중복이기 때문에)
  const handleChange = (e) => {
    // 이벤트에서 name과 value만 호출
    const { name, value } = e.target;
    setForm(update => ({...update, [name] : value}));
  }
  

  return (
    <>
    <h2>사용자 {!id ? '등록' : '수정'}</h2>
    <form onSubmit={!id ? insertUser : updateUser}>
      <table>
        <colgroup>
          <col width="100" />
          <col width="200"/>
        </colgroup>
        <tbody>
          { id && (
            <tr>
              <td>번호</td>
              <td>{ userData?.id }</td>
            </tr>
          )}
          <tr>
            <td>타입</td>
            <td>
              <label>
                <input
                  type="radio"
                  name="role"
                  value='관리자'
                  checked={form.role === '관리자'}
                  onChange={handleChange}
                />
                관리자
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value='일반'
                  checked={form.role === '일반'}
                  onChange={handleChange}
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
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
              />
            </td>
          </tr>
          <tr>
            <td>이메일</td>
            <td>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
              />
            </td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="전화번호를 입력하세요"
              />
            </td>
          </tr>
          { id && (
            <tr>
              <td>생성일</td>
              <td>{userData?.joinedAt}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br/>
      { !id ? (
        <div className="list-footer">
          <button type="button" onClick={() => navigate('/admin/user')}>목록</button>
          <button type="submit">등록</button>
        </div>
      ):(
        <div className="list-footer">
          <button type="button" onClick={() => navigate(-1)}>취소</button>
          <button type="submit">수정</button>
        </div>
      )}
    </form>
    </>
  )
}

export default UserForm;