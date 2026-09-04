import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { insertNotice, noticeDetail, updateNotice } from "../../data/notice";
import NotFoundData from "../../components/NotFoundData";

function NoticeForm () {

  // 저장하고 어디로 이동해야할지, 네비게이션이 스스로 판단.
  const navigate = useNavigate();

  //데이터 담는 곳
  const { id } = useParams();
  const noticeData = noticeDetail(id);

  // 하나로 통일
  // 실제로 등록, 수정하는 부분만 form으로 묶음.
  // 번호, 조회수, 등록일은 자동이므로 form으로 묶지 않음.
  const [form, setForm] = useState(
    {
      title: noticeData?.title ?? '',
      content: noticeData?.content ?? '',
      writer: noticeData?.writer ?? ''
    }
  );

  // onChange에서 name과 value를 가져와서 각각 맞게 세팅.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(data => ({...data, [name] : value}));
  }

  // 공지 등록
  const noticeRegist = (e) => {
    e.preventDefault();

    // notice.js에서 데이터 넣어주기
    insertNotice(form);

    // 등록완료 시, 공지사항 목록으로 이동
    // replace : 재제출 방지
    navigate('/admin/notice', { replace: true });
  } 

  // 공지 수정
  const noticeUpdate = (e) => {
    e.preventDefault();

    // notice.js에서 데이터 수정하기
    updateNotice(id, form);

    // 등록완료 시, 공지사항 목록으로 이동
    // replace : 재제출 방지
    navigate(`/admin/notice/detail/${id}`, { replace: true });
  } 

  // id가 있는데, 데이터가 없으면 렌더링을 하지 않고 안내 화면으로 대체
  if(id && !noticeData) {
    return <NotFoundData message="존재하지 않는 게시글입니다." backTo="/admin/notice" />
  }


  return (
    <>
    <div className="list-header">
      {/* !noticeData 를 사용해도 되는데, 왜 !id를 쓰느냐.
        - noticeData 일 경우 : 그 데이터가 실제로 있는지
        - id 일 경우 : 사용자가 뭘 하러 왔는지
       여기서는 모드를 정하는 것인데, 데이터가 있느냐 없느냐의 구분이 아니므로 id! */}
      <h2>공지사항 {!id ? '등록' : '수정'}</h2>
    </div>
    <form onSubmit={ !id ? noticeRegist : noticeUpdate }>
      <table>
        <colgroup>
          <col width="100" />
          <col width="200"/>
          <col width="100" />
          <col width="200"/>
        </colgroup>
        <tbody>
          { id && (
            <tr>
              <td>번호</td>
              <td>{noticeData?.id}</td>
              <td>조회수</td>
              <td>{noticeData?.views}</td>
            </tr>
          ) }
          <tr>
            <td>제목</td>
            <td colSpan='3'>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="제목을 입력하세요"
              />
            </td>
          </tr>
          <tr>
            <td>내용</td>
            <td colSpan='3'>
              <input
                type="text"
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="내용을 입력하세요"
              />
            </td>
          </tr>
          <tr>
            <td>등록자</td>
            <td colSpan='3'>
              <input
                type="text"
                name="writer"
                value={form.writer}
                onChange={handleChange}
                placeholder="등록자를 입력하세요"
              />
            </td>
          </tr>
          { id && (
            <tr>
              <td>등록일</td>
              <td colSpan='3'>{noticeData.createdAt}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br/>
      { !id ? (
        <div className="list-footer">
          <button type="button" onClick={()=> navigate('/admin/notice')}>
            목록
          </button>
          <button type="submit">등록</button>
        </div>
      ) : (
        <div className="list-footer">
          <button type="button" onClick={()=> navigate(`/admin/notice/detail/${id}`)}>
            취소
          </button>
          <button type="submit">수정</button>
        </div>
      ) }
    </form>
    </>
  )
}

export default NoticeForm;