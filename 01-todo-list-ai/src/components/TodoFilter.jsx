// 버튼을 세 번 복사해서 쓰는 대신 배열로 정의하고 map으로 돌린다.
// 나중에 항목이 늘어나도 이 배열만 고치면 된다.
const FILTERS = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행' },
  { value: 'done', label: '완료' },
]

function TodoFilter({ filter, counts, onChange }) {
  return (
    <div className="todo-filter">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={filter === value ? 'selected' : ''}
          // 스크린 리더에 "지금 눌려 있는 버튼"임을 알려준다
          aria-pressed={filter === value}
          onClick={() => onChange(value)}
        >
          {label} {counts[value]}
        </button>
      ))}
    </div>
  )
}

export default TodoFilter
