import { useState, useEffect } from 'react'; //hook. (컴포넌트 안에서 변하는 상태값.)
import TodoForm from './components/TodoForm'; // 검색 폼
import TodoFilter from './components/TodoFilter'; // 검색 필터(전체/진행중/완료)
import TodoList from './components/TodoList'; // 검색 목록
import './App.css';

function App() { //하나의 컴포넌트 함수.

  // === 초기값 세팅
  const [todos, setTodos] = useState(() => {
    // 브라우저의 localStorage에서 이전 데이터 기록이 있으면 todos 키의 데이터 호출
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  }); // 컴포넌트 처음 생성 시, 한번만 실행. (lazy 초기화. 최초 1회만 실행)
  const [btnType, setBtnType] = useState('all'); // 전체(all)가 기본값 (todo의 전체/진행/완료 값)





  // === Todo 추가 함수
  // TodoForm에서 입력값이 오면 todo에 해당 입력값이 노출
  // 데이터 필터링(공백 등)은 TodoForm에서 처리 했으므로, 데이터 바로 사용 가능
  const addTodo = (todo) => {
    // todos 할일 배열에 {}의 값을 새로 추가. (push와 같은 역할) 
    setTodos((prev) => [...prev, { id: Date.now(), text: todo, done: false }])
  };





  // === 완료 체크 함수
  // ==> (수정2) toggleTodo / deleteTodo / editTodo도 setTodos((prev) => ...) 형태로 통일
  const toggleTodo = (id) => {
    // setTodos(todos.map(...))으로 진행해도 되지만, 한 함수에서 setTodos를 두번 호출할 경우, 첫번째 결과를 두번째가 못보는 경우도 있음.
    // 아래와 같이 (prev)를 추가하여 함수형으로 만들게되면, React가 주는 가장 최신 값으로 계산하기 때문에 첫번째 결과를 보고 두번째 결과를 받아서 진행함.
    // 따라서 함수형으로 작업하는 것을 버릇들여야함. (toggleTodo/deleteTodo/editTodo도 적용 완료)
    setTodos((prev) => 
      // prev.map() : 할일 목록 배열 하나씩 전체 순회.
      prev.map((todo) =>
        // 배열값과 parameter 값 비교 후, 기존 유지 or done 값 변경
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };





  // === Todo 삭제 함수
  const deleteTodo = (id) => {
    // filter 조건에 맞는 것만 남기는 함수.
    // 삭제하려는 id 외 전부 남겨라.
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };





  // === Todo 수정 함수
  const editTodo = (id, newText) => {
    // todos 목록에서 동일한 id값을 가진 값을 찾아라. (아닐경우 그대로 데이터 유지)
    // 찾아서 text를 새로 받아온 newText 값으로 데이터값을 변경해라.
    setTodos((prev) =>
      prev.map((todo) =>
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
  })
  .sort((a, b) => Number(a.done) - Number(b.done));





  // == Todo 목록 새로고침 해도 사라지지 않게 하는 기능 추가 (localStorage에 저장.)
  // todos의 값이 바뀔 때마다, 아래의 코드 실행
  // 두번째 인자(의존성배열)에 적힌 값이 바뀔때 마다 코드 실행.
  // 두번째 인자의 값 ([todos] : todos가 바뀔때마다 / [] : 컴포넌트가 처음 뜰때만 / 생략 : 렌더링때마다인데 잘안씀)
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos)); // todos를 문자열로 바꿔 저장
  }, [todos]);





  return (
    <main className="app">
      <h1>할 일 목록</h1>
      
      {/* 검색 입력 폼 호출, addTodo는 입력된(추가할) 데이터 */}
      <TodoForm onAdd={addTodo} />

      {/* btnType 변수 값(전체/진행/완료 상태) 변경 */}
      <TodoFilter btnType={btnType} onChange={setBtnType} />

      <TodoList
        todos={btnTypeTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />

      <p className="summary">
        {todos.length === 0
          ? ''
          : `남은 할 일 ${finishCount}개 / 전체 ${todos.length}개`}
      </p>
    </main>
  );
}

export default App;