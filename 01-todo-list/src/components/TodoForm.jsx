import { useState } from "react";

// => (수정1) 입력창 state를 App에서 TodoForm으로 옮기기 (타이핑할 때마다 전체 목록이 리렌더되는 문제)
// => 리렌더링 : state가 바뀌면 해당 state를 가진 컴포넌트 함수를 처음부터 다시 실행하는 것.
// => App.jsx에 있을 때, App 함수 전체가 다시 실행함. (사실, input쪽만 리렌더링을 하면 됨)
// => 그러므로 TodoForm라는 컴포넌트 함수를 따로 분리하여 작업진행
// ※주의 : 리렌더링 ≠ 화면 갱신

// onAdd는 App.jsx에 추가한 값만 보내주기 위함.
function TodoForm({onAdd}) {
  const [input, setInput] = useState('');

  // 할일 추가
  const addTodo = (e) => {
    e.preventDefault(); // form 새로고침 막기
    const text = input.trim(); //text 공백 처리
    if(!text) return; // text의 값이 없으면 그냥 return
    
    // text에 값이 있을 경우
    onAdd(text); //App.jsx에 입력값 보내기
    setInput('') //입력값 보내주고, 입력창 비우기
  }

  return (
    <form className="todo-form" onSubmit={addTodo}>
      <input
          value={input}
          onChange={(e) => setInput(e.target.value)} // 타이핑할 때마다 실행. setInput에 상태 반영
          placeholder="할 일을 입력하세요"
      />
      <button type="submit">추가</button>
    </form>
  )
}

export default TodoForm;