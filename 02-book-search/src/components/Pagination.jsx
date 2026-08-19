// ====(적용 10) 컴포넌트 분리 (Pagination)
// ====(적용 11) 페이지네이션을 번호 나열 방식으로 변경 (pageCount 재계산 버그 문제 포함)
// onPageChange : 페이지 이동(이전/다음)
// page : 현재 페이지 번호
// totalPages : 전체
function Pagination ({onPageChange, page, totalPages}) {

  // firstNum : 페이징의 시작 번호
  // >> 현재 페이지를 가운데이미잠, 끝을 넘기지 않은 값 설정 후, 가장 작은값을 시작 번호로.
  // >> 위의 값과 1과 비교했을때, 1보다 작으면 안되므로 Math.max
  // lastNum : (화면에 보이는) 페이징의 끝번호 
  // >> 시작 번호 + 4와 가장 끝번호를 넘기면 안되니까 totalPages. 두개 비교 후, 가장 작은 값 Math.min
  const firstNum = Math.max(1, Math.min(page - 2, totalPages - 4));
  const lastNum = Math.min(firstNum + 4, totalPages);

  // 페이징 .map 용 배열
  const pageNumList = [];
  for (let num = firstNum; num <= lastNum; num++) {
    pageNumList.push(num);
  }

  return (
    <nav className="pagination">
      <button type="button"
        className="page-button"
        onClick={() => onPageChange(page-1)}
        disabled={page === 1}
      >
        이전
      </button>
      {pageNumList.map((num) => (
        <button
          key={num}
          type="button"
          className={
            num === page ? 'page-button page-button-current' : 'page-button'
          }
          onClick={() => onPageChange(num)}
          disabled={num === page}>
            {num}
        </button>
      ))}
      <button
        type="button"
        className="page-button"
        onClick={() => onPageChange(page+1)}
        disabled={page >= totalPages}
      >
        다음
      </button>
    </nav>
  )

}

export default Pagination;