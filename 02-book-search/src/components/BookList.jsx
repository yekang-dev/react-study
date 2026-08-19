// ====(적용 10) 컴포넌트 분리 (BookList)
import BookItem from "./BookItem"

function BookList ({books}) {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
        />
      ))}
    </ul>
  )
}

export default BookList