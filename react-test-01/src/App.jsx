import { useState, useEffect } from 'react'; //hook. (컴포넌트 안에서 변하는 상태값.)
import TodoItem from './TodoItem'; // todoItem.jsx 파일 연결
import './App.css';

function App() { //하나의 컴포넌트 함수.

  // === 초기값 세팅
  // todos, input, btnType : 현재값 / setTodos, setInput, setBtnType : 값바꿀때 사용할 함수
  // >>>> const [todos, setTodos] = useState([]); // 빈 배열로 시작 (할일 목록) :: useEffect 사용 전
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos'); // 브라우저의 localStorage에서 todos 키의 데이터 호출
    // localStorage는 문자열만 저장함.
    // JSON.stringify : 데이터를 문자열로 바꿈.
    // JSON.parse : 데이터를 배열/객체로 되돌림.
    return saved ? JSON.parse(saved) : [];
  }); // 컴포넌트 처음 생성 시, 한번만 실행. (lazy 초기화. 최초 1회만 실행)
  const [input, setInput] = useState(''); // 빈 값으로 시작 (input 값)
  const [btnType, setBtnType] = useState('all'); // 전체(all)가 기본값 (todo의 전체/진행/완료 값)





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





  // === Todo 수정 함수
  const editTodo = (id, newText) => {
    // todos 목록에서 동일한 id값을 가진 값을 찾아라. (아닐경우 그대로 데이터 유지)
    // 찾아서 text를 새로 받아온 newText 값으로 데이터값을 변경해라.
    setTodos(
      todos.map((todo) =>
        todo.id === id ? {...todo, text: newText } : todo
      )
    )
  };





  // === Todo 완료 갯수
  const finishCount = todos.filter((todo) => !todo.done).length;





  // === Todo 목록 전체/진행중/완료 필터 기능 추가
  // btnType의 값이 바뀔때 마다 새로 
  // todos : Todo의 전체 목록
  // btnTypeTodos : btnType의 값에 따라 filter 걸어서 전체/진행/완료 구분
  // 전체 : todos 그대로 출력하면 되므로, return true
  // 진행중 : todos에서 todo.done이 false인 값만 필터 (!todo.done)
  // 완료 : todos에서 todo.done이 true인 값만 필터 (todo.done)
  const btnTypeTodos = todos.filter((todo) => {
    if (btnType === 'active') return !todo.done;
    if (btnType === 'done') return todo.done;
    return true; // 'all'
  });





  // == Todo 목록 새로고침 해도 사라지지 않게 하는 기능 추가 (localStorage에 저장.)
  // todos의 값이 바뀔 때마다, 아래의 코드 실행
  // 두번째 인자(의존성배열)에 적힌 값이 바뀔때 마다 코드 실행.
  // 두번째 인자의 값 ([todos] : todos가 바뀔때마다 / [] : 컴포넌트가 처음 뜰때만 / 생략 : 렌더링때마다인데 잘안씀)
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos)); // todos를 문자열로 바꿔 저장
  }, [todos]);





  return (
    <div style={{ maxWidth: 400, margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h1>할 일 목록</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        addTodo();
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)} // 타이핑할 때마다 실행. setInput에 상태 반영
          //onKeyDown={(e) => e.key === 'Enter' && addTodo()} //Enter 시, addTodo 실행(A && B는 A가 참일 때만 B 실행)
          placeholder="할 일을 입력하세요"
        />
        <button type="submit">추가</button>
      </form>

      {/* btnType 변수 값(전체/진행/완료 상태) 변경 */}
      <div style={{ margin: '12px 0', display: 'flex', gap: 8 }}>
        <button onClick={() => setBtnType('all')}
          style={{ fontWeight: btnType === 'all' ? 'bold' : 'normal' }}>전체</button>
        <button onClick={() => setBtnType('active')}
          style={{ fontWeight: btnType === 'active' ? 'bold' : 'normal' }}>진행중</button>
        <button onClick={() => setBtnType('done')}
          style={{ fontWeight: btnType === 'done' ? 'bold' : 'normal' }}>완료</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 2 }}>
        {btnTypeTodos.map((todo) => (
          // 컴포넌트 분리
          // 자식 컴포넌트(TodoItem.jsx) 불러오기.
          // todo(데이터), onToggle(로직), onDelete(로직) 이란 각 이라는 이름의 props 전달.
          // [주의] key는 구별하는 용도로만 사용되어, 자식 컴포넌트에서 사용불가.
          // todo.map 형식으로 돌고 있기 때문에 구별할 값이 필요하므로 반드시 작성 필요.
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
      </ul>

      <div>
        {todos.length === 0
          ? '할 일을 등록해 주세요.'
          : `남은 할 일 : ${finishCount}개 / 전체 : ${todos.length}개`}
      </div>
    </div>
  );
}

export default App;