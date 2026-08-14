import { useState } from 'react'

// 검색어 입력창 + 검색 버튼.
// 입력 중인 텍스트는 이 컴포넌트가 직접 들고 있고,
// "검색해라"라는 사실만 onSearch로 부모에게 알린다. (입력할 때마다 부모가 리렌더되지 않도록)
function SearchForm({ onSearch, disabled }) {
  const [text, setText] = useState('')

  // <form>의 submit 하나로 [검색 버튼 클릭]과 [입력창에서 Enter] 두 경우가 모두 처리된다.
  // 그래서 onKeyDown으로 Enter를 따로 감지할 필요가 없다.
  const handleSubmit = (event) => {
    event.preventDefault() // form 기본 동작(페이지 새로고침) 막기

    const keyword = text.trim()
    if (keyword === '') {
      return // 빈 검색어는 요청하지 않는다
    }

    onSearch(keyword)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        // value와 onChange는 한 세트 (제어 컴포넌트)
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="책 제목이나 저자를 입력하세요"
        aria-label="검색어"
      />
      <button className="search-button" type="submit" disabled={disabled}>
        {disabled ? '검색 중' : '검색'}
      </button>
    </form>
  )
}

export default SearchForm
