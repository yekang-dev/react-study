import { useState } from 'react'
import './App.css'

let nextId = 1

function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')

  const addTodo = (e) => {
    e.preventDefault()
    const title = text.trim()
    if (!title) return

    setTodos([...todos, { id: nextId++, title, done: false }])
    setText('')
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    )
  }

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const leftCount = todos.filter((todo) => !todo.done).length

  return (
    <main className="app">
      <h1>할 일 목록</h1>

      <form className="todo-form" onSubmit={addTodo}>
        <input
          type="text"
          value={text}
          placeholder="할 일을 입력하세요"
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">추가</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.title}</span>
            </label>
            <button
              type="button"
              className="remove"
              onClick={() => removeTodo(todo.id)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>

      <p className="summary">
        {todos.length === 0
          ? '할 일이 없습니다.'
          : `남은 할 일 ${leftCount}개 / 전체 ${todos.length}개`}
      </p>
    </main>
  )
}

export default App
