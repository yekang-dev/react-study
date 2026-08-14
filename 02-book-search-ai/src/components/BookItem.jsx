// 출판일을 2019-03-01 → 2019.03.01 형태로 바꿔준다.
// Google Books는 '2019', '2019-03', '2019-03-01' 세 형태가 모두 올 수 있다.
function formatDate(publishedDate) {
  if (!publishedDate) {
    return '출판일 정보 없음'
  }
  return publishedDate.replaceAll('-', '.')
}

// 도서 1건을 표시하는 카드. (표지 / 제목 / 저자 / 출판일)
function BookItem({ book }) {
  // 구조 분해 할당으로 volumeInfo에서 필요한 값만 꺼낸다.
  // volumeInfo가 없는 항목이 섞여 올 수 있어 ?? {} 로 기본값을 준다.
  const { title, authors, publishedDate, imageLinks } = book.volumeInfo ?? {}

  // 옵셔널 체이닝(?.) : imageLinks 필드가 아예 없으면 undefined를 반환하고 넘어간다.
  const thumbnail = imageLinks?.thumbnail

  return (
    <li className="book-item">
      {thumbnail ? (
        <img className="book-cover" src={thumbnail} alt={`${title} 표지`} />
      ) : (
        // 표지가 없는 책도 목록 높이가 흐트러지지 않도록 자리를 채워둔다.
        <div className="book-cover book-cover-empty">표지 없음</div>
      )}

      <div className="book-info">
        <h2 className="book-title">{title ?? '제목 정보 없음'}</h2>
        {/* ?? : 앞의 값이 null 또는 undefined일 때만 뒤의 기본값을 사용한다. */}
        <p className="book-authors">{authors?.join(', ') ?? '저자 정보 없음'}</p>
        <p className="book-date">{formatDate(publishedDate)}</p>
      </div>
    </li>
  )
}

export default BookItem
