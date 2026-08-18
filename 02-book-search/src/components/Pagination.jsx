// ====(적용 10) 컴포넌트 분리 (Pagination)
function Pagination ({pagePrev, pageNext, page, totalPages}) {

  return (
    <div className="pagination">
      <button onClick={pagePrev} disabled={page === 1}>
        이전
      </button>
      <span>{page} / {totalPages}</span>
      <button onClick={pageNext} disabled={page >= totalPages}>
        다음
      </button>
    </div>
  )

}

export default Pagination;