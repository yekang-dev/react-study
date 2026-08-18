function BookItem({ book }) {

  // ====(적용 5) volumeInfo 없는 경우 방어
  // 구조 분해 할당(destructuring assignment)
  // book.volumeInfo 객체 안에서 필요한 속성만 꺼내서 변수로 만듬.
  const { title, authors, publishedDate, imageLinks } = book.volumeInfo ?? {}

  return (
    <li>
      {/* imageLinks?. => ?.(옵셔널 체이닝) imageLinks라는 필드가 아예 없을 경우, undefined로 오류가 뜸.
      따라서 옵셔널체이닝을 사용하면 undefined반환하고 넘기는 것 */}
      {imageLinks?.thumbnail && (
        <img src={imageLinks.thumbnail} alt={title} />
      )}
      <div>
        <h3>{title}</h3>
        {/* ?? => ??앞의 값이 null이거나 undefined일때 기본값으로 하라고 설정 */}
        <p>{authors?.join(', ') ?? '저자 정보 없음'}</p>
        <p>{publishedDate ?? '출판일 정보 없음'}</p>
      </div>
    </li>
  )
}

export default BookItem