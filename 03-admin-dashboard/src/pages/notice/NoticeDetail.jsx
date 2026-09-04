import { useParams, useNavigate } from "react-router";
import { noticeDetail } from "../../data/notice";
import NotFoundData from "../../components/NotFoundData";

function NoticeDetail () {

  const { id } = useParams();
  const data = noticeDetail(id);

  // 이동용
  const navigate = useNavigate();

  // 데이터가 없으면 렌더링을 하지 않고 안내 화면으로 대체
  if(!data) {
    return <NotFoundData message="존재하지 않는 게시글입니다." backTo="/admin/notice" />
  }

  return (
    <>
    <div className="list-header">
      <h2>공지사항 상세</h2>
    </div>
    <table>
      <colgroup>
        <col width="100" />
        <col width="200"/>
        <col width="100" />
        <col width="200"/>
      </colgroup>
      <tbody>
        <tr>
          <td>번호</td>
          <td>{data.id}</td>
          <td>조회수</td>
          <td>{data.views}</td>
        </tr>
        <tr>
          <td>제목</td>
          <td colSpan='3'>{data.title}</td>
        </tr>
        <tr>
          <td>내용</td>
          <td colSpan='3'>{data.content}</td>
        </tr>
        <tr>
          <td>등록자</td>
          <td colSpan='3'>{data.writer}</td>
        </tr>
        <tr>
          <td>등록일</td>
          <td colSpan='3'>{data.createdAt}</td>
        </tr>
      </tbody>
    </table>
    <br/>
    <div className="list-footer">
      <button type="button" onClick={()=> navigate('/admin/notice')}>
        목록
      </button>
      <button type="button" onClick={()=> navigate(`/admin/notice/update/${data.id}`)}>
        수정
      </button>
    </div>
    </>
  )
}

export default NoticeDetail;