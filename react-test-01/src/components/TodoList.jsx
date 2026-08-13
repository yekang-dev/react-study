// ==> (수정4) TodoList 컴포넌트 분리 (App에서 map 걷어내기)
// ==> App.jsx의 통일성을 위해 분리. + 목록이 없을때의 문구도 한번에 정리
// ==> 단점 : onToggle, onDelete, onEdit가 2단계 거쳐서 가야함.
import TodoItem from "./TodoItem";

function TodoList({todos, onToggle, onDelete, onEdit}) {

  // ==> (수정7) 필터 결과가 비었을 때 안내 문구 추가
  if (todos.length === 0) {
    return <p className="empty">표시할 할 일이 없습니다.</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        // 컴포넌트 분리
        // 자식 컴포넌트(TodoItem.jsx) 불러오기.
        // todo(데이터), onToggle(로직), onDelete(로직) 이란 각 이라는 이름의 props 전달.
        // [주의] key는 구별하는 용도로만 사용되어, 자식 컴포넌트에서 사용불가.
        // todo.map 형식으로 돌고 있기 때문에 구별할 값이 필요하므로 반드시 작성 필요.
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}

export default TodoList;