import { useState } from 'react'

// 입력창의 값(text)은 이 컴포넌트 안에서만 쓰이므로 여기서 관리한다.
// 부모(App)는 "무엇이 추가됐는지"만 onAdd로 전달받으면 된다.
function TodoForm({ onAdd }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault() // form의 기본 동작(새로고침) 막기
    const title = text.trim()
    if (!title) return

    onAdd(title)
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        placeholder="할 일을 입력하세요"
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">추가</button>
    </form>
  )
}

export default TodoForm
