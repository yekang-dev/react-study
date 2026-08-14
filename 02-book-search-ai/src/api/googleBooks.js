// Google Books API 호출을 담당하는 모듈.
// 컴포넌트는 "무엇을 보여줄지"만 담당하고, "어떻게 가져올지"는 이 파일에 모아둔다.

const API_URL = 'https://www.googleapis.com/books/v1/volumes'

// 한 페이지에 보여줄 도서 수 (Google Books는 최대 40까지 허용)
export const PAGE_SIZE = 10

/**
 * 도서를 검색한다.
 * @param {string} keyword 검색어
 * @param {number} page 1부터 시작하는 페이지 번호
 * @param {AbortSignal} [signal] 요청 취소용 signal
 */
export async function searchBooks(keyword, page, signal) {
  // startIndex : 몇 번째 항목부터 가져올지 (0부터 시작)
  // 1페이지 → startIndex 0, 2페이지 → startIndex 10 ...
  const startIndex = (page - 1) * PAGE_SIZE

  // 검색어에 공백이나 특수문자가 들어가도 안전하게 URL을 만들어 준다.
  const params = new URLSearchParams({
    q: keyword,
    startIndex: String(startIndex),
    maxResults: String(PAGE_SIZE),
  })

  // API 키는 없어도 검색이 되지만, 없으면 IP 기준 할당량이 낮아 429가 잘 발생한다.
  // .env에 키가 있으면 붙이고, 없으면 그대로 호출한다.
  const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
  if (apiKey) {
    params.set('key', apiKey)
  }

  const response = await fetch(`${API_URL}?${params}`, { signal })

  // fetch는 404 / 500 같은 HTTP 에러에서도 reject하지 않는다. (응답 자체는 받았기 때문)
  // 따라서 response.ok를 직접 확인해서 throw로 넘긴다.
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.')
    }
    throw new Error(`도서 정보를 가져오지 못했습니다. (HTTP ${response.status})`)
  }

  const data = await response.json()

  return {
    // 검색 결과가 없으면 items 필드 자체가 응답에 없다. → 빈 배열로 맞춰준다.
    books: data.items ?? [],
    totalItems: data.totalItems ?? 0,
  }
}
