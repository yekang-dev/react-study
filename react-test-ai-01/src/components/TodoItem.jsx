import { useState } from 'react'

function TodoItem({ todo, onToggle, onEdit, onRemove }) {
  const [isEditing, setIsEditing] = useState(false) // 수정 모드인지
  const [draft, setDraft] = useState(todo.title) // 수정 중인 임시 글자

  // "수정 중인 값"은 저장 전까지 부모의 todos에 반영하지 않는다.
  // 그래서 원본(todo.title)과 임시값(draft)을 따로 둔다.

  const startEdit = () => {
    setDraft(todo.title) // 지난번에 취소했던 값이 남지 않도록 항상 현재 값에서 시작
    setIsEditing(true)
  }

  const cancelEdit = () => {
    setDraft(todo.title)
    setIsEditing(false)
  }

  const saveEdit = (e) => {
    e.preventDefault()
    const title = draft.trim()
    if (!title) return // 빈 값으로는 저장하지 않는다

    onEdit(todo.id, title)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <li>
        <form className="edit-form" onSubmit={saveEdit}>
          <input
            type="text"
            value={draft}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            // Esc로도 취소할 수 있게
            onKeyDown={(e) => e.key === 'Escape' && cancelEdit()}
          />
          <button type="submit">저장</button>
          <button type="button" onClick={cancelEdit}>
            취소
          </button>
        </form>
      </li>
    )
  }

  return (
    <li className={todo.done ? 'done' : ''}>
      <label>
        <input
          className="toggle"
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        <span>{todo.title}</span>
      </label>

      <span className="actions">
        <button type="button" onClick={startEdit}>
          수정
        </button>
        <button type="button" className="remove" onClick={() => onRemove(todo.id)}>
          삭제
        </button>
      </span>
    </li>
  )
}

export default TodoItem
