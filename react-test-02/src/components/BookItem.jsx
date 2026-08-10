function BookItem({ book }) {
  const { title, authors, publishedDate, imageLinks } = book.volumeInfo

  return (
    <li>
      {imageLinks?.thumbnail && (
        <img src={imageLinks.thumbnail} alt={title} />
      )}
      <div>
        <h3>{title}</h3>
        <p>{authors?.join(', ') ?? '저자 정보 없음'}</p>
        <p>{publishedDate ?? '출판일 정보 없음'}</p>
      </div>
    </li>
  )
}

export default BookItem