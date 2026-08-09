const STORAGE_KEY = 'todos'

// localStorage는 "문자열"만 저장할 수 있다.
// 그래서 배열/객체는 JSON.stringify로 문자열로 바꿔 저장하고,
// 읽을 때는 JSON.parse로 다시 배열/객체로 되돌린다.

export const loadTodos = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const parsed = saved ? JSON.parse(saved) : []

    // 저장된 값이 배열이 아니면(누군가 손댔거나 형식이 바뀐 경우) 무시한다
    return Array.isArray(parsed) ? parsed : []
  } catch {
    // 값이 깨져 있거나 저장소 접근이 막힌 경우(시크릿 모드 등)
    return []
  }
}

export const saveTodos = (todos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch {
    // 저장에 실패해도 앱 동작 자체는 막지 않는다
  }
}
