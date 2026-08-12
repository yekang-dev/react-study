// 로딩 / 에러 / 검색 결과 없음 / 검색 전 상태를 한 곳에서 보여주는 컴포넌트.
// 상태 분기가 App.jsx의 JSX에 흩어지지 않도록 분리했다.
function StatusMessage({ status, errorMessage, isEmpty }) {
  // 아직 아무것도 검색하지 않은 상태 (검색 전에는 "결과 없음"이 뜨면 안 된다)
  if (status === 'idle') {
    return (
      <p className="status status-idle">
        검색어를 입력하고 검색 버튼을 누르거나 Enter를 눌러 주세요.
      </p>
    )
  }

  if (status === 'loading') {
    return <p className="status status-loading">검색 중...</p>
  }

  if (status === 'error') {
    return <p className="status status-error">{errorMessage}</p>
  }

  // 검색은 성공했지만 결과가 0건인 경우
  if (isEmpty) {
    return (
      <p className="status status-empty">
        검색 결과가 없습니다. 다른 검색어로 시도해 보세요.
      </p>
    )
  }

  // 보여줄 상태 메시지가 없으면 아무것도 렌더링하지 않는다.
  return null
}

export default StatusMessage
