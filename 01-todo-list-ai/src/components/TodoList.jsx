import TodoItem from './TodoItem'

function TodoList({ todos, onToggle, onEdit, onRemove }) {
  // 필터 결과가 비어 있을 때의 화면도 목록의 책임으로 본다
  if (todos.length === 0) {
    return <p className="empty">표시할 할 일이 없습니다.</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        // key는 React가 어떤 항목이 바뀌었는지 추적하는 용도라 여기서 준다.
        // 자식(TodoItem) 안에서는 props로 읽을 수 없다.
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      ))}
    </ul>
  )
}

export default TodoList
