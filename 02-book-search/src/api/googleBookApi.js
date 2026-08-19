// ====(적용 1) fetch 로직을 api 폴더로 분리 (URLSearchParams 사용)
// Google Books API 연결

// Google Books를 사용하기 위해서 발급한 API key를 .env(환경변수)에 저장하며 불러옴.
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

// 화면에 보일 데이터 갯수 (최대 40개 - googleBook에서 지정)
// App.jsx에서 페이징 계산할 때도 사용하므로 export로 변경
export const RESULT_PAGE = 10;

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
      startIndex: startIndex, 
      maxResults: RESULT_PAGE
    }
  );

  // ====(적용 8) API 키 없을 때도 동작하도록 처리 (key 파라미터 조건부 추가)
  // Google Books API는 key값이 없어도 작동가능 하므로, 선택사항으로 아래와 같이 코드 삽입.
  // 하지만 요청 할당량(429)이 낮아 실패할 경우를 대비해 .env에 key값이 설정하는 것이 좋음.
  if(API_KEY){
    params.append('key', API_KEY);
  }

  const url = `https://www.googleapis.com/books/v1/volumes?${params}`;
  
  // fetch : API 요청 보내고 응답 기다림.
  const response = await fetch(url);

  // fecth는 404, 500에러와 같은 HTTP에러 시, catch로 이동x
  // 사유 : 응답을 받긴 했으므로 성공처리
  // response.ok (상태 코드 200번대) true. 실패 false일 경우 throw로 던져 catch로 보냄.
  if (!response.ok) {
    if(response.status === 429){
      throw new Error('요청이 많아 잠시 후에 다시 시도해주세요.')
    }
    throw new Error('요청에 실패했습니다.')
  }

  // response.json() : 응답 값을 JSON으로 파싱 (비동기이므로 await 필요)
  const data = await response.json()

  return { books : data.items ?? [] , total : data.totalItems || 0 };

};