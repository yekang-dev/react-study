import { Link, useNavigate, useSearchParams } from "react-router";
import { loadNotices } from "../../data/notice"
import { useState } from "react";

function NoticeList(){

  // notice.js에서 notice를 가져와도 됨.
  // 하지만 localStorage에 등록/수정/삭제가 저장되기때문에
  // localStorage를 호출하는 loadNotices를 통해서 데이터를 호출해 가져와야함.
  const notices = loadNotices();
  const navigate = useNavigate();

  // 검색 및 페이징 처리
  // setSearchParams은 url에서 ? 뒤에 검색조건(쿼리스트링)을 받음.
  // 따라서 keyword라는 조건을 가져오려면 .get 하는 형식으로 값을 가져와야함.
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';

  // keyword를 바로 input에서 사용하지 않은 이유는
  // onChange에서 keyword를 사용해버리면, 누르는 순간 url에 바로바로 적용됨
  // ?keyword=abcde... <이런식으로
  // 따라서 input 변수를 따로 만들어줘서 버튼 클릭시, input의 값을 넣어주는 식으로 진행.
  const [input, setInput] = useState(keyword);

  // 검색 버튼 클릭시
  const searchTitle = (e) => {
    e.preventDefault();

    setSearchParams({keyword : input});
  }
  
  // 검색하면 해당 목록에서 필터링 (이건 서버 연결시 이렇게 사용 안함.)
  const filtered = notices.filter(notice => notice.title.includes(keyword));

  return (
    <>
    <div className="list-header">
      <h2>공지사항 목록</h2>
      <button type="button" onClick={() => navigate('/admin/notice/regist')}>
        등록
      </button>
    </div>
    <div className="text-right">
      <form onSubmit={searchTitle}>
        <input 
          type="text"
          name="input"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          placeholder="제목을 입력해주세요."
        />
        <button type="submit">검색</button>
      </form>
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
          filtered.map((notice) => (
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