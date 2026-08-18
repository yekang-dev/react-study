// ====(적용 1) fetch 로직을 api 폴더로 분리 (URLSearchParams 사용)
// Google Books API 연결

// Google Books를 사용하기 위해서 발급한 API key를 .env(환경변수)에 저장하며 불러옴.
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

// 화면에 보일 데이터 갯수 (최대 40개 - googleBook에서 지정)
const RESULT_PAGE = 10;

// API 호출
export async function googleBookApi (query, pageNum) {

  // PageNation 계산용. 
  // (10개씩 보일경우) startIndex=0&maxResults=10 → 1~10번째 (1페이지) / startIndex=10&maxResults=10 → 11~20번째 (2페이지)
  // (20개씩 보일경우) startIndex=0&maxResults=20 → 1~20번째 (1페이지) / startIndex=20&maxResults=20 → 21~40번째 (2페이지)
  const startIndex = (pageNum - 1) * RESULT_PAGE;

  // URLSearchParams은 url의 파싱 값을 객체로 만들어두면 알아서 문자열로 조립(공백이나 특수문자가 들어가도 안전).
  // startIndex : 데이터 시작점
  // maxResults : 한번에 보여줄 데이터 갯수
  const params = new URLSearchParams(
    {
      q: query, // 검색값
      key: API_KEY, // api key
      startIndex: startIndex, 
      maxResults: RESULT_PAGE
    }
  );
  const url = `https://www.googleapis.com/books/v1/volumes?${params}`;
  
  // fetch : API 요청 보내고 응답 기다림.
  const response = await fetch(url);

  // fecth는 404, 500에러와 같은 HTTP에러 시, catch로 이동x
  // 사유 : 응답을 받긴 했으므로 성공처리
  // response.ok (상태 코드 200) 확인하여 throw로 던저 catch로 보냄.
  if (!response.ok) {
    throw new Error('요청에 실패했습니다.')
  }

  // response.json() : 응답 값을 JSON으로 파싱 (비동기이므로 await 필요)
  const data = await response.json()

  return { books : data.items ?? [] , total : data.totalItems || 0 };

};