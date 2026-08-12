import { useRef, useState } from 'react'
import SearchForm from './components/SearchForm'
import StatusMessage from './components/StatusMessage'
import BookList from './components/BookList'
import Pagination from './components/Pagination'
import { searchBooks, PAGE_SIZE } from './api/googleBooks'
import './App.css'

// Google Books의 totalItems는 "전체 개수"가 아니라 추정치라서 페이지를 넘길 때마다 값이 흔들린다.
// 그래서 페이지 버튼은 최대 이 개수까지만 만든다. (10페이지 = 최대 100건)
const MAX_PAGES = 10

function App() {
  // 실제로 검색이 실행된 키워드. (입력창에서 타이핑 중인 값은 SearchForm이 가지고 있다)
  // 페이지를 넘길 때 같은 키워드로 다시 요청하기 위해 보관한다.
  const [keyword, setKeyword] = useState('')
  const [books, setBooks] = useState([])

  // 상태를 boolean 여러 개(loading, error, searched...)로 두면 조합이 꼬이기 쉬워서
  // 한 번에 하나만 가질 수 있는 문자열 하나로 관리한다.
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'error' | 'success'
  const [errorMessage, setErrorMessage] = useState('')

  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  // 이전 요청을 취소하기 위한 컨트롤러 보관함.
  // 페이지 버튼을 빠르게 여러 번 누르면 응답이 뒤바뀐 순서로 도착해
  // 나중에 누른 페이지가 먼저 그려질 수 있다. (경쟁 상태)
  const requestRef = useRef(null)

  // 검색 실행 함수.
  // canFallback : totalItems를 믿고 넘어간 페이지가 비어 있을 때 한 칸 뒤로 되돌릴지 여부
  const runSearch = async (nextKeyword, nextPage, canFallback = true) => {
    requestRef.current?.abort() // 진행 중인 이전 요청 취소
    const controller = new AbortController()
    requestRef.current = controller

    setKeyword(nextKeyword)
    setPage(nextPage)
    setStatus('loading')
    setErrorMessage('')

    // fetch는 실패할 수 있으므로 try / catch로 감싼다.
    try {
      const { books: foundBooks, totalItems } = await searchBooks(
        nextKeyword,
        nextPage,
        controller.signal,
      )

      // 페이지 수는 1페이지 응답의 totalItems로만 계산한다.
      // (뒤쪽 페이지의 totalItems는 값이 급변해서 믿을 수 없다)
      if (nextPage === 1) {
        setPageCount(Math.min(Math.ceil(totalItems / PAGE_SIZE), MAX_PAGES))
      }

      // 넘어간 페이지가 비어 있으면 그 앞 페이지가 사실상 마지막 페이지다.
      // 페이지 수를 줄이고, 마지막 페이지를 한 번만 다시 불러온다. (무한 반복 방지)
      if (nextPage > 1 && foundBooks.length === 0) {
        setPageCount(nextPage - 1)
        if (canFallback) {
          return runSearch(nextKeyword, nextPage - 1, false)
        }
      }

      setBooks(foundBooks)
      setStatus('success')
    } catch (error) {
      // 내가 직접 취소한 요청은 에러가 아니므로 화면을 건드리지 않는다.
      if (error.name === 'AbortError') {
        return
      }
      setBooks([])
      setErrorMessage(error.message)
      setStatus('error')
    }
  }

  // 새로 검색할 때는 항상 1페이지부터
  const handleSearch = (nextKeyword) => {
    runSearch(nextKeyword, 1)
  }

  // 페이지 이동은 검색된 키워드를 그대로 사용
  const handlePageChange = (nextPage) => {
    runSearch(keyword, nextPage)
  }

  const hasResult = status === 'success' && books.length > 0

  return (
    <main className="app">
      <header className="app-header">
        <h1 className="app-title">도서 검색</h1>
        <p className="app-desc">Google Books API로 책을 검색합니다.</p>
      </header>

      <SearchForm onSearch={handleSearch} disabled={status === 'loading'} />

      {hasResult && (
        <p className="result-info">
          <strong>{keyword}</strong> 검색 결과 · {page}
          {pageCount > 0 && ` / ${pageCount}`} 페이지
        </p>
      )}

      <StatusMessage
        status={status}
        errorMessage={errorMessage}
        isEmpty={books.length === 0}
      />

      {hasResult && (
        <>
          <BookList books={books} />
          <Pagination
            page={page}
            pageCount={pageCount}
            onChange={handlePageChange}
          />
        </>
      )}
    </main>
  )
}

export default App
