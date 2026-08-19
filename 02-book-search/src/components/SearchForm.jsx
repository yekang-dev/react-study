// ====(적용 10) 컴포넌트 분리 (SearchForm)
import { useState } from "react"

function SearchForm({onSearch}){

  const [query, setQuery] = useState('');

  // ====(적용 4) 검색어 trim 처리
  const search = (e) => {
    e.preventDefault(); // form 새로고침 막기

    const text = query.trim(); // 앞, 뒤 공백 처리
    if(!text) return; // 값이 없으면 그냥 return (반응 x)

    onSearch(text); // App.jsx에 전달
  }

  return (
    // ====(적용 3) 검색 영역을 form으로 감싸기 (onSubmit 방식)
    <form className="search-form" onSubmit={search}>
      <input
        className="search-input"
        type="text"
        // value, onChange 한세트로 해야 양방향 바인딩이 된다. (잊지말기)
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="책 제목을 입력하세요"
      />
      <button className="search-button" type="submit">검색</button>
    </form>
  )
}

export default SearchForm