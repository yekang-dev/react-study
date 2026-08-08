// todo, onToggle, onDelete는 부모로부터 받음.
// function TodoItem(data){ ... } 형식도 가능하지만, {todo, onToggle, onDelete} 이런 형식으로 풀어서 작성 가능.
// data.todo, data.onToggle ... 과 같은 형식으로 작성 안해도 됨. (구조분해할당:destructuring)
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span
        onClick={() => onToggle(todo.id)}
        style={{
          textDecoration: todo.done ? 'line-through' : 'none',
          cursor: 'pointer',
          flex: 1,
        }}
      >
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
}

//해당 파일을 다른 파일에서 import 하여 사용할 수 있도록 export 선언 필수.
//부모 컴포넌트(App.jsx)에서 사용하려면 필수!
export default TodoItem;