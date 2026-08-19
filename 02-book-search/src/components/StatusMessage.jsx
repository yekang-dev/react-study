// ====(적용 10) 컴포넌트 분리 (StatusMessage)
function StatusMessage ({status, message, isEmpty}) {

  // ====(적용 6) 검색 전 초기 안내 문구 추가
  if(status === 'stay'){
    return <p className="status status-idle">검색어를 입력해주세요.</p>;
  }

  if(status === 'loading'){
    return <p className="status status-loading">검색 중...</p>;
  }

  if(status === 'error'){
    return <p className="status status-error">에러: {message}</p>;
  }

  if(status === 'success' && isEmpty){
    return <p className="status status-empty">검색 결과가 없습니다.</p>
  }
  
  return null;
}

export default StatusMessage;