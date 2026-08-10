import { useState, useEffect } from 'react'
import BookItem from './components/BookItem'

function App() {
  const [query, setQuery] = useState('') // 도서 검색 input
  const [books, setBooks] = useState([]) // 도서 목록
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // const search = async () => {
  //   const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

  //   console.log('검색어:', query)
  //   const response = await fetch(
  //     `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`
  //   )
  //   const data = await response.json()
  //   console.log('데이터:', data)
  //   setBooks(data.items || [])
  // }

  useEffect(() => {
    // query가 비어있으면 검색 안 함
    if (query === '') {
      //setBooks([])
      return
    }

    const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

    const fetchBooks = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`
        )
        if (!response.ok) {
          throw new Error('요청에 실패했습니다.')
        }
        const data = await response.json()
        console.log(data)
        setBooks(data.items || [])
      } catch (err) {
        setError(err.message)
        setBooks([])
      } finally {
        setLoading(false)
      }

      // const response = await fetch(
      //   `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`
      // )
      // const data = await response.json()
      // console.log(data)
      // setBooks(data.items || [])
    }

    // 0.5초 뒤에 fetchBooks를 실행하도록 예약
    const timerId = setTimeout(() => {
      fetchBooks()
    }, 500)

    // cleanup 함수: 다음 effect가 실행되기 전에 이전 타이머를 취소
    return () => {
      clearTimeout(timerId)
    }
  }, [query])

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
      {/* <button onClick={search}>검색</button> */}
      {/* <p>검색 결과: {books.length}건</p> */}

      {loading && <p>검색 중...</p>}
      {error && <p>에러: {error}</p>}
      {!loading && !error && <p>검색 결과: {books.length}건</p>}

      {/* {!loading && !error && (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              {book.volumeInfo.title}
            </li>
          ))}
        </ul>
      )} */}

      {!loading && !error && books.length === 0 && query !== '' && (
        <p>검색 결과가 없습니다.</p>
      )}

      {!loading && !error && books.length > 0 && (
        <ul>
          {books.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default App