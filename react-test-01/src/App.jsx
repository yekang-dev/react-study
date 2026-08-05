import { useState } from 'react'; //hook. (컴포넌ㅌ트 안에서 변하는 상태값.)
import './App.css';

function App() { //하나의 컴포넌트 함수.

  // === 초기값 세팅
  // todos, input : 현재값 / setTodos, setInput : 값바꿀때 사용할 함수
  const [todos, setTodos] = useState([]); // 빈 배열로 시작 (할일 목록)
  const [input, setInput] = useState(''); // 빈 값으로 시작 (input 값)

  // === Todo 추가 함수
  const addTodo = () => {
    if (input.trim() === '') return; //빈 칸이거나 공백 시, 함수 종료

    // todos 할일 배열에 {}의 값을 새로 추가. (push와 같은 역할) 
    //setTodos([...todos, { id: Date.now(), text: input, done: false }]); :: 이런 형식도 좋지만 아래와 같은형식으로 버릇 들이는게 좋음
    // 아래는 함수형으로 상태 업데이터가 연속, 혹은 빠르게 여러번 일어날 경우 아래와 같은 경우가 더 좋음.
    setTodos((prev) => [...prev, { id: Date.now(), text: input, done: false }])
    
    setInput(''); //입력창은 다시 초기화
  };

  // === 완료 체크 함수
  const toggleTodo = (id) => {
    // todos.map() : 할일 목록 배열 하나씩 전체 순회.
    setTodos(
      todos.map((todo) =>
        // 배열값과 parameter 값 비교 후, 기존 유지 or done 값 변경
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // === Todo 삭제 함수
  const deleteTodo = (id) => {
    // filter 조건에 맞는 것만 남기는 함수.
    // 삭제하려는 id 외 전부 남겨라.
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h1>할 일 목록</h1>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)} // 타이핑할 때마다 실행. setInput에 상태 반영
          onKeyDown={(e) => e.key === 'Enter' && addTodo()} //Enter 시, addTodo 실행(A && B는 A가 참일 때만 B 실행)
          placeholder="할 일을 입력하세요"
        />
        <button onClick={addTodo}>추가</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 2 }}>
        {/* {todos.map((todo) => ( ... ))} 이거는 v-for="todo in todos" 와 동일 */}
        {todos.map((todo) => (
          // key는 리스트의 식별자
          <li key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              // onClick 부분에서 onClick={toggleTodo}는 함수만 그냥 실행 (바로실행)
              // 아래와 같이 화살표 함수로 감싸야, 특성 값(todo.id)인자를 넘겨줌 (방법만 작성해두고, 클릭시 실행)
              // 인자를 넘겨야 하는 함수는 무조건 화살표 함수로 한번 감싸줘야 함.
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.done ? 'line-through' : 'none',
                cursor: 'pointer',
                flex: 1,
              }}
            >
              {todo.text} + {todo.id}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;