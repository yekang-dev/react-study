// =====> 도서 자동검색 기능용 : useEffect 사용 공부용

import { useState, useEffect } from 'react'
import BookItem from './components/BookItem' // 검색 목록 컴포넌트

function App() {
  const [query, setQuery] = useState('') // 도서 검색 input
  const [books, setBooks] = useState([]) // 도서 목록
  const [loading, setLoading] = useState(false) // 도서 검색 로딩 flag
  const [error, setError] = useState(null) // 에러내용





  // ===> 도서 검색 시, 버튼이나 엔터 없이 자동검색 기능.
  // useEffect를 할때, 의존성배열([query])부분이 바뀔때만 effect를 실행하라는 뜻.
  // 결론 : query가 바뀐다는 것은 도서검색 iput 내용이 바뀐다는 것.
  useEffect(() => {
    // 검색 값이 비어있을땐, 아무것도 검색x
    if (query === '') {
      return;
    }

    // Google Books를 사용하기 위해서 발급한 API key를 .env(환경변수)에 저장하며 불러옴.
    const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

    // ===> async, await
    // async 함수는 useEffect 직접 붙일 수 없다.
    // 따라서 아래와 같이 search라는 함수를 만들어서 호출하는 형식으로 진행.
    const search = async () => {
      setLoading(true) // 검색 시, 로딩 활성화
      setError(null) // 검색 시, 기존 에러는 null



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





    // ==> 디바운스(debounce) : 타이핑이 멈추고 잠깐 반응이 없을때 한 번만 요청 하는 기법.
    // 디바운스 처리를 하지 않을 경우.
    // 1. API 할당량을 빠르게 소진 (429 에러 : Too Many Requests)
    // 2. 불필요한 네트워크 요청으로 성능 낭비
    // 3. 응답이 도착하는 순서가 뒤바뀌면 엉뚱한 결과가 화면에 남을 수도 있음 (예: "reac" 응답이 "react" 응답보다 늦게 와서 덮어쓰는 경우)

    // 0.5초 뒤에 search를 실행하도록 예약
    const timerId = setTimeout(() => {
      search()
    }, 500)

    // react를 검색할 경우, 진행 과정
    // :: r 입력 => effect 실행 => setTimeout 타이머 시작 => 0.5초 전에 e 입력
    // => effect 실행 전, cleanup 실행 => clearTimeout 타이머 취소 => effect 실행
    // => setTimeout 타이머 시작 => 0.5초 전에 a 입력 .... 반복
    // ** Q : 첫 입력시에도 cleanup 실행되는게 아닌가?
    // ** A : cleanup은 "이전 effect가 벌여놓은 걸 치우는" 함수로, 첫 실행에넌 effect가 없기 때문에 cleanup을 건너뜀.
    
    // cleanup 함수: 다음 effect가 실행되기 전에 이전 타이머를 취소, 보통 useEffect의 return 부분
    return () => {
      //clearTimeout : 타이머 취소
      clearTimeout(timerId)
    }

  }, [query]);





  return (
    <div>
      <h1>도서 검색</h1>
      <input
        type="text"
        // value, onChange 한세트로 해야 양방향 바인딩이 된다. (잊지말기)
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="책 제목을 입력하세요"
      />
      
      {loading && <p>검색 중...</p>}
      {error && <p>에러: {error}</p>}
      {!loading && !error && <p>검색 결과: {books.length}건</p>}

      {!loading && !error && books.length === 0 && query !== '' && (
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