// 연습을 위한 notice 더미 데이터
export const notices = [
  { id: 1,  title: '서비스 이용약관 개정 안내',      writer: '김철수', createdAt: '2025-01-08', views: 342,  content: '이용약관 일부 조항이 개정되었습니다. 변경된 내용은 2월 1일부터 적용됩니다.' },
  { id: 2,  title: '설 연휴 고객센터 운영 일정',      writer: '이영희', createdAt: '2025-01-24', views: 189,  content: '설 연휴 기간 고객센터는 휴무입니다. 문의는 게시판을 이용해 주세요.' },
  { id: 3,  title: '개인정보 처리방침 변경 사전 고지', writer: '김철수', createdAt: '2025-02-05', views: 521,  content: '개인정보 보관 기간과 위탁 항목이 변경됩니다. 자세한 내용은 본문을 확인해 주세요.' },
  { id: 4,  title: '2월 정기 서버 점검 안내',        writer: '정현우', createdAt: '2025-02-17', views: 267,  content: '2월 20일 새벽 2시부터 4시까지 서버 점검이 진행됩니다. 점검 중 서비스 이용이 제한됩니다.' },
  { id: 5,  title: '신규 회원 등급 제도 도입',       writer: '오하늘', createdAt: '2025-03-03', views: 813,  content: '구매 실적에 따라 4단계 회원 등급이 적용됩니다. 등급별 혜택을 확인해 보세요.' },
  { id: 6,  title: '모바일 앱 v2.0 업데이트 안내',   writer: '정현우', createdAt: '2025-03-19', views: 1024, content: '앱 전체 화면이 개편되었습니다. 스토어에서 최신 버전으로 업데이트해 주세요.' },
  { id: 7,  title: '비밀번호 변경 권고 안내',        writer: '홍재석', createdAt: '2025-04-02', views: 456,  content: '계정 보호를 위해 6개월 이상 변경하지 않은 비밀번호는 변경을 권장합니다.' },
  { id: 8,  title: '4월 임시공휴일 배송 지연 안내',   writer: '이영희', createdAt: '2025-04-15', views: 298,  content: '임시공휴일로 인해 배송이 1~2일 지연될 수 있습니다. 양해 부탁드립니다.' },
  { id: 9,  title: '결제 수단 추가 (간편결제 도입)',  writer: '오하늘', createdAt: '2025-05-06', views: 672,  content: '간편결제 서비스가 추가되었습니다. 결제 화면에서 선택하실 수 있습니다.' },
  { id: 10, title: '고객센터 전화번호 변경 안내',     writer: '김철수', createdAt: '2025-05-21', views: 385,  content: '고객센터 대표번호가 변경되었습니다. 기존 번호는 6월까지 병행 운영됩니다.' },
  { id: 11, title: '여름 이벤트 사전 안내',          writer: '이영희', createdAt: '2025-06-09', views: 934,  content: '7월 한 달간 여름 할인 이벤트가 진행됩니다. 상세 일정은 추후 공지 예정입니다.' },
  { id: 12, title: '6월 정기 서버 점검 완료 보고',    writer: '정현우', createdAt: '2025-06-24', views: 152,  content: '예정된 서버 점검이 정상적으로 완료되었습니다. 이용에 불편을 드려 죄송합니다.' },
  { id: 13, title: '스팸 문자 주의 안내',            writer: '홍재석', createdAt: '2025-07-07', views: 741,  content: '당사를 사칭한 문자가 발송되고 있습니다. 출처가 불분명한 링크는 클릭하지 마세요.' },
  { id: 14, title: '휴면 계정 전환 예정 안내',       writer: '김철수', createdAt: '2025-07-28', views: 508,  content: '1년간 접속 기록이 없는 계정은 휴면 상태로 전환됩니다. 로그인 시 즉시 해제됩니다.' },
  { id: 15, title: '추석 연휴 배송 마감 일정',       writer: '이영희', createdAt: '2025-08-12', views: 613,  content: '추석 연휴 전 배송 마감은 9월 10일 오후 3시입니다. 이후 주문은 연휴 후 처리됩니다.' },
  { id: 16, title: '검색 기능 개선 업데이트',        writer: '오하늘', createdAt: '2025-09-01', views: 427,  content: '검색 정확도가 개선되고 필터 기능이 추가되었습니다.' },
  { id: 17, title: '이메일 수신 설정 변경 안내',      writer: '홍재석', createdAt: '2025-09-23', views: 236,  content: '마케팅 정보 수신 설정을 마이페이지에서 직접 변경하실 수 있습니다.' },
  { id: 18, title: '10월 시스템 정기 점검 안내',     writer: '정현우', createdAt: '2025-10-14', views: 319,  content: '10월 18일 새벽 1시부터 3시까지 점검이 진행됩니다. 결제 기능이 일시 중단됩니다.' },
  { id: 19, title: '연말 정산 자료 제공 안내',       writer: '김철수', createdAt: '2025-11-18', views: 845,  content: '연말 정산용 거래 내역서는 마이페이지에서 다운로드하실 수 있습니다.' },
  { id: 20, title: '2026년 서비스 운영 계획 공지',   writer: '오하늘', createdAt: '2025-12-09', views: 1187, content: '내년도 서비스 개편 방향과 주요 일정을 안내드립니다.' },
]

// 날짜 포멧
const formatDate = (date = new Date()) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() +1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// 공지사항 목록 불러오기
// 실제론 사용하지 않겠지만, Back과 연결하지 않았으므로
// 등록, 수정, 삭제를 위해 localStorage에 저장해서 사용하도록 구성
export const loadNotices = () => {
  const saved = localStorage.getItem('notices');
  if(saved === null ) return notices;
  try {
    return JSON.parse(saved);
  } catch {
    return notices;
  }
}


// 데이터 저장 공통-------------
const saveNotices = (datas) => {
  localStorage.setItem('notices', JSON.stringify(datas));
}

// 공지사항 상세
// localStorage에 저장된 데이터에서 notice.id와 id값이 동일한 데이터 찾기
export const noticeDetail = (id) => {
  return loadNotices().find(notice => notice.id === Number(id));
}

// 공지사항 등록
export const insertNotice = (newData) => {
  const notices = loadNotices();

  const regdata = [...notices, {...newData, id: Date.now(), createdAt: formatDate(), views: 0}];
  
  saveNotices(regdata);
}

// 공지사항 수정
export const updateNotice = (id, upData) => {
  const notices = loadNotices();

  // .find를 하는 형식을 생각했지만 틀린부분.
  // find : 하나 찾기 - 콜백이 참인지 거짓 구분만.
  // map : 전체 변환 - 콜백이 반환한 값으로 새 배열을 만듦
  // filter : 조건에 맞는 것만 - 콜백이 참 거짓 구분 (조건에 맞는 것들만 골라 새 배열)
  const updata = notices.map(notice =>
    notice.id === Number(id) ? {...notice, ...upData } : notice
  );

  saveNotices(updata);
}