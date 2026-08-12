// 한 번에 보여줄 페이지 번호 버튼 개수
const PAGE_BUTTONS = 5

// 이전 / 페이지 번호 / 다음 버튼.
// 페이지 계산만 하고 실제 검색은 부모(onChange)에게 맡긴다.
function Pagination({ page, pageCount, onChange }) {
  // 페이지가 1개 이하면 페이지네이션이 필요 없다.
  if (pageCount <= 1) {
    return null
  }

  // 현재 페이지를 가운데에 두고 최대 5개의 번호만 보여준다.
  // 예) page=7, pageCount=10 → 5 6 7 8 9
  const firstButton = Math.max(
    1,
    Math.min(page - Math.floor(PAGE_BUTTONS / 2), pageCount - PAGE_BUTTONS + 1),
  )
  const lastButton = Math.min(pageCount, firstButton + PAGE_BUTTONS - 1)

  const pageNumbers = []
  for (let number = firstButton; number <= lastButton; number += 1) {
    pageNumbers.push(number)
  }

  return (
    <nav className="pagination" aria-label="페이지 이동">
      <button
        type="button"
        className="page-button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
      >
        이전
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          type="button"
          // 현재 페이지 버튼에만 클래스를 하나 더 붙인다.
          className={
            number === page ? 'page-button page-button-current' : 'page-button'
          }
          onClick={() => onChange(number)}
          // 지금 보고 있는 페이지는 다시 요청할 필요가 없다.
          disabled={number === page}
          aria-current={number === page ? 'page' : undefined}
        >
          {number}
        </button>
      ))}

      <button
        type="button"
        className="page-button"
        onClick={() => onChange(page + 1)}
        disabled={page >= pageCount}
      >
        다음
      </button>
    </nav>
  )
}

export default Pagination
