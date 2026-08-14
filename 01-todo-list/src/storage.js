// ==> (수정6) localStorage 부분을 storage.js로 따로 분리하기 (컴포넌트 코드와 섞이지 않게 분리)
// localStorage에 저장할 값 세팅
// 여기에 세팅하면 값이 바뀌어도 여기만 수정하면 됨
const STORAGE_KEY = 'todos'

// localStorage에 있는 데이터 불러오기 (최초 한번)
export const loadTodos = () => {
  // ==> (수정5) localStorage 읽기에 try/catch 추가 (저장값이 깨지면 앱이 멈춤)
  // JSON.parse(saved)는 saved의 값이 올바른 JSON 형식이 아니면 에러.
  // 따라서 에러가 날 경우를 대비하여 try-catch를 사용.
  // catch에서는 빈배열로 세팅
  try {
    // 따라서, saved라는 변수에 localStorage에 todos의 데이터를 저장
    // 데이터가 있으면, JSON.parse(saved), 없으면 빈 배열
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    // parsed가 배열이 아니면 무시(todos는 배열로 받아야함.)
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // 값이 깨졌거나 저장소 접근이 막힌 경우, 빈 목록으로 시작
    return [];
  }
} // 컴포넌트 처음 생성 시, 한번만 실행. (lazy 초기화. 최초 1회만 실행)


// localStorage에 데이터 저장
export const saveTodos = (todos) => {
  // 올바른 JSON형식이 아니면, 오류가 남.(에러날 경우, 프로그램이 멈춤) 따라서 에러가 나도 진행할 수 있도록 try-catch
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)); // todos를 문자열로 바꿔 저장
  } catch {
    // 저장 실패 시에도 동작 진행.
  }
}