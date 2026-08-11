// =====> 도서 검색 버튼용 (이쪽이 일반적)

import { useState } from 'react'
import BookItem from './components/BookItem' // 검색 목록 컴포넌트

function App() {
  const [query, setQuery] = useState('') // 도서 검색 input
  const [books, setBooks] = useState([]) // 도서 목록
  const [loading, setLoading] = useState(false) // 도서 검색 로딩 flag
  const [error, setError] = useState(null) // 에러내용
  const [searchFlag, setSearchFlag] = useState(false); // 검색 실행 flag (검색 결과용)




  
  // ===> 도서 검색 시, 버튼이나 엔터 검색 기능
  // ===> async, await
  // async 함수는 useEffect 직접 붙일 수 없다.
  // 따라서 아래와 같이 search라는 함수를 만들어서 호출하는 형식으로 진행.
  const search = async () => {
    // 검색 값이 비어있을땐, 아무것도 검색x
    if (query === '') {
      return;
    }

    // Google Books를 사용하기 위해서 발급한 API key를 .env(환경변수)에 저장하며 불러옴.
    const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
  
    setLoading(true) // 검색 시, 로딩 활성화
    setError(null) // 검색 시, 기존 에러는 null
    setSearchFlag(true) //검색 실행 표시

    // ===> 로딩/에러/성공 상태 처리를 위한 try-catch-finally
    // API 호출(fetch)는 실패하는 경우도 있으므로, 실패를 잡기 위해 try-catch
    // finally는 성공 실패 상관없이 실행. 로딩을 끄기 위해 사용
    try {
      // fetch : API 요청 보내고 응답 기다림.
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`
      );

      // fecth는 404, 500에러와 같은 HTTP에러 시, catch로 이동x
      // 사유 : 응답을 받긴 했으므로 성공처리
      // response.ok (상태 코드 200) 확인하여 throw로 던저 catch로 보냄.
      if (!response.ok) {
        throw new Error('요청에 실패했습니다.')
      }

      // response.json() : 응답 값을 JSON으로 파싱 (비동기이므로 await 필요)
      const data = await response.json()
      console.log('data', data);

      // 파싱한 값을 setBooks에 저장
      // google books는 검색결과가 없을 시, item 필드가 없어 undefined. 따라서 빈배열로 대체.
      setBooks(data.items || [])
    } catch (err) {
      setError(err.message)
      setBooks([])
    } finally {
      setLoading(false)
    }

  }




  
  return (
    <div>
      <h1>도서 검색</h1>
      <input
        type="text"
        // value, onChange 한세트로 해야 양방향 바인딩이 된다. (잊지말기)
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            search()
          }
        }}
        placeholder="책 제목을 입력하세요"
      />
      <button onClick={search}>검색</button>
      
      {loading && <p>검색 중...</p>}
      {error && <p>에러: {error}</p>}
      {!loading && !error && <p>검색 결과: {books.length}건</p>}

      {!loading && !error && books.length === 0 && searchFlag && (
        <p>검색 결과가 없습니다.</p>
      )}

      {!loading && !error && books.length > 0 && (
        <ul>
          {books.map((book) => (
            <BookItem
              key={book.id}
              book={book}
            />
          ))}
        </ul>
      )}

    </div>
  )
}

export default App