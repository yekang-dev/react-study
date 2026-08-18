// =====> 도서 검색 버튼용 (이쪽이 일반적)

import { useState } from 'react'
import { googleBookApi } from './api/googleBookApi'
import BookItem from './components/BookItem' // 검색 목록 컴포넌트

const RESULT_PAGE = 10

function App() {
  const [query, setQuery] = useState('') // 도서 검색 input
  const [books, setBooks] = useState([]) // 도서 목록

  // ====(적용 2) 상태를 문자열 하나(status)로 통합 (StatusMessage) 
  // 상태값 하나로 통일 및 메시지 내용
  const [status, setStatus] = useState('stay') // 'stay' | 'loading' | 'error' | 'success'
  const [message, setMessage] = useState('')

  // 페이징 추가
  const [page, setPage] = useState(1) // 현재 페이지
  const [total, setTotal] = useState(0) // 전체 데이터 갯수



  
  // ===> 도서 API 조회 기능 (Google Books API 연결)
  // ===> async, await
  // query : 검색어, pageNum : 페이지 번호
  const search = async (query, pageNum) => {

    setStatus('loading');
    setMessage('');

    // ===> 로딩/에러/성공 상태 처리를 위한 try-catch-finally
    // API 호출(fetch)는 실패하는 경우도 있으므로, 실패를 잡기 위해 try-catch
    // googleBookApi.js와 연결
    try {
      const result = await googleBookApi(query, pageNum);
      
      setStatus('success')
      setBooks(result.books);
      setTotal(result.total);

    } catch (error) {
      setStatus('error')
      setMessage(error.message)

      setBooks([])
      setTotal(0)
    }

  }





  // ====(적용 4) 검색어 trim 처리
  // 검색 버튼 : 검색버튼 클릭 시, 1페이지 부터
  const searchBtn = (e) => {
    e.preventDefault(); // form 새로고침 막기
    const text = query.trim(); // 앞, 뒤 공백 처리
    if(!text) return; // 값이 없으면 그냥 return (반응 x)
    
    // page 1로 초기화
    setPage(1)
    // 검색값 + 페이지 1로 세팅
    search(text, 1)
  }





  // 페이지 이동 (이전)
  const pagePrev = () => {
    const newPage = page - 1
    setPage(newPage)
    search(query, newPage)
  }





  // 페이지 이동 (다음)
  const pageNext = () => {
    const newPage = page + 1
    setPage(newPage)
    search(query, newPage)
  }



  // 페이징의 전체 갯수 계산 [(전체 데이터 / 화면에 보일 데이터 갯수)의 올림값]
  const totalPages = Math.ceil(total / RESULT_PAGE)


  
  return (
    <div>
      <h1>도서 검색</h1>
      {/* ====(적용 3) 검색 영역을 form으로 감싸기 (onSubmit 방식) */}
      <form onSubmit={searchBtn}>
        <input
          type="text"
          // value, onChange 한세트로 해야 양방향 바인딩이 된다. (잊지말기)
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="책 제목을 입력하세요"
        />
        <button type="submit">검색</button>
      </form>
      
      
      {/* ====(적용 6) 검색 전 초기 안내 문구 추가  */}
      {status === 'stay' && <p>검색어를 입력해주세요.</p>}
      {status === 'loading' && <p>검색 중...</p>}
      {status === 'error' && <p>에러: {message}</p>}
      {status === 'success' && books.length === 0 && <p>검색 결과가 없습니다.</p>}

      {status === 'success' && books.length > 0 && (
        <>
        <p>검색 결과: {books.length}건</p>

        <ul>
          {books.map((book) => (
            <BookItem
              key={book.id}
              book={book}
            />
          ))}
        </ul>
        
        <div className="pagination">
          <button onClick={pagePrev} disabled={page === 1}>
            이전
          </button>
          <span>{page} / {totalPages}</span>
          <button onClick={pageNext} disabled={page >= totalPages}>
            다음
          </button>
        </div>
        </>
      )}

    </div>
  )
}

export default App