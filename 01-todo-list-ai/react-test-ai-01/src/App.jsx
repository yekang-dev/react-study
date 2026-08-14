import { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoFilter from './components/TodoFilter'
import TodoList from './components/TodoList'
import { loadTodos, saveTodos } from './storage'
import './App.css'

// 저장된 목록을 먼저 읽어둔다. (모듈이 처음 불릴 때 딱 한 번)
const initialTodos = loadTodos()

// id 발급기. 새로고침하면 1부터 다시 시작해 저장된 id와 겹치므로,
// 저장된 id 중 가장 큰 값 다음 번호부터 이어서 발급한다.
let nextId = initialTodos.reduce((max, todo) => Math.max(max, todo.id), 0) + 1

function App() {
  const [todos, setTodos] = useState(initialTodos)
  const [filter, setFilter] = useState('all') // 'all' | 'active' | 'done'

  // todos가 바뀔 때마다 localStorage에 저장한다.
  // 두 번째 인자(의존성 배열)에 적힌 값이 바뀔 때만 실행된다.
  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  const addTodo = (title) => {
    // nextId++ 는 업데이터 함수 밖에서 한 번만 실행한다.
    // StrictMode는 개발 모드에서 업데이터를 두 번 호출하기 때문에,
    // 안에 넣으면 id가 2씩 건너뛴다.
    const id = nextId++
    setTodos((prev) => [...prev, { id, title, done: false }])
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    )
  }

  const editTodo = (id, title) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title } : todo)),
    )
  }

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  // 화면에 보일 목록은 state로 따로 두지 않고 todos + filter로 계산한다.
  const visibleTodos = todos
    .filter((todo) => {
      if (filter === 'active') return !todo.done
      if (filter === 'done') return todo.done
      return true // 'all'
    })
    // 완료된 항목은 아래로 (filter가 새 배열을 주므로 그대로 정렬해도 안전)
    .sort((a, b) => Number(a.done) - Number(b.done))

  const activeCount = todos.filter((todo) => !todo.done).length
  const counts = {
    all: todos.length,
    active: activeCount,
    done: todos.length - activeCount,
  }

  return (
    <main className="app">
      <h1>할 일 목록</h1>

      <TodoForm onAdd={addTodo} />

      <TodoFilter filter={filter} counts={counts} onChange={setFilter} />

      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onEdit={editTodo}
        onRemove={removeTodo}
      />

      <p className="summary">
        {todos.length === 0
          ? '할 일이 없습니다.'
          : `남은 할 일 ${activeCount}개 / 전체 ${todos.length}개`}
      </p>
    </main>
  )
}

export default App
