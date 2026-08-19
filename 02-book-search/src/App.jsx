// =====> 도서 검색 버튼용 (이쪽이 일반적)

import { useState } from 'react'
import { googleBookApi, RESULT_PAGE } from './api/googleBookApi' // Google Books API 연결
import SearchForm from './components/SearchForm' // 검색 폼 컴포넌트
import BookList from './components/BookList' // 검색 목록 컴포넌트
import StatusMessage from './components/StatusMessage' // 상태 컴포넌트
import Pagination from './components/Pagination' // 페이지네이션 컴포넌트

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

    // ===> 로딩/에러/성공 상태 처리를 위한 try-catch
    // API 호출(fetch)는 실패하는 경우도 있으므로, 실패를 잡기 위해 try-catch
    // googleBookApi.js와 연결
    try {
      const result = await googleBookApi(query, pageNum);

      // pageNum 변경시 빈 페이지 → 현재 화면 유지하고 안내만
      // 1페이지가 빈페이지이면 검색 결과 정말로 없으므로 pageNum > 1
      if(result.books.length < 1 && pageNum > 1){
        alert('해당 페이지의 결과를 불러오지 못했습니다.');
        setStatus('success');
        return;
      }
      // 빈페이지일 경우, 기존 페이지 유지해야하므로, 검색 후, 페이지 변경을 하는 형식으로 변경
      setPage(pageNum); 
      
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





  // 검색 버튼 : 검색버튼 클릭 시, 1페이지 부터
  const searchBtn = (text) => {
    setQuery(text); // 검색값 저장
    
    // 검색값 + 페이지 1로 세팅
    search(text, 1);
  }

  // 페이지 이동 (이전/다음) : 이전/다음 분리된 것을 하나로 통일
  const pageChange = (nextPage) => search(query, nextPage);

  // 페이징의 전체 갯수 계산 [(전체 데이터 / 화면에 보일 데이터 갯수)의 올림값]
  const totalPages = Math.ceil(total / RESULT_PAGE)


  return (
    <div>
      <h1>도서 검색</h1>
      
      <SearchForm onSearch={searchBtn} />
      
      <StatusMessage status={status} message={message} isEmpty={books.length === 0} />

      {status === 'success' && books.length > 0 && (
        <>
          <p>검색 결과: {books.length}건</p>
          
          <BookList books={books} />
          
          <Pagination
            onPageChange={pageChange}
            page={page}
            totalPages={totalPages}
          />
        </>
      )}

    </div>
  )
}

export default App