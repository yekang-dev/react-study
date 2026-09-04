import { Link, useNavigate } from "react-router";
import { loadNotices } from "../../data/notice"

function NoticeList(){

  // notice.js에서 notice를 가져와도 됨.
  // 하지만 localStorage에 등록/수정/삭제가 저장되기때문에
  // localStorage를 호출하는 loadNotices를 통해서 데이터를 호출해 가져와야함.
  const notices = loadNotices();
  
  const navigate = useNavigate();

  return (
    <>
    <div className="list-header">
      <h2>공지사항 목록</h2>
      <button type="button" onClick={() => navigate('/admin/notice/regist')}>
        등록
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>등록자</th>
          <th>등록일</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        {
          notices.map((notice) => (
            <tr key={notice.id}>
              <td>{notice.id}</td>
              <td>
                <Link to={`/admin/notice/detail/${notice.id}`}>
                  {notice.title}
                </Link>
              </td>
              <td>{notice.writer}</td>
              <td>{notice.createdAt}</td>
              <td>{notice.views}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
    </>
  )
}

export default NoticeList;