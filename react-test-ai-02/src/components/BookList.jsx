import BookItem from './BookItem'

// 도서 목록을 렌더링하는 컴포넌트. 반복(map)만 담당하고 표시는 BookItem에 맡긴다.
function BookList({ books }) {
  return (
    <ul className="book-list">
      {books.map((book) => (
        // key는 리액트가 어떤 항목이 바뀌었는지 구분하는 값이라 목록마다 고유해야 한다.
        <BookItem key={book.id} book={book} />
      ))}
    </ul>
  )
}

export default BookList
