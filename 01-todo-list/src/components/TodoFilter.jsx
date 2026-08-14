// ==> (수정3) 필터 버튼 3개를 배열 + map으로 정리
// ==> 버튼을 3개 만드는 것이 아니라, 배열로 만들어서 map으로 표출
// ==> 버튼이 추가 될 경우, FILTERS라는 배열에만 value, label 값을 추가해주면 편함.
// ==> 버튼 값이 
const FILTERS = [
  { value: 'all', label: '전체'},
  { value: 'active', label: '진행중'},
  { value: 'done', label: '완료'}
];

// btnType : 현재 무슨 전체/진행/완료 인지 알려주기 위함
// >> 따라서 className 부분에 btnType과 같은 value찾아서 활성화
// onChange : btnType 값을 클릭한 값으로 변경되었음을 App에 전달
function TodoFilter({btnType, onChange}) {
  return (
    <div className="todo-filter">
      {FILTERS.map(({value, label}) => (
        <button
          type="button"
          key={value}
          className={btnType === value ? 'selected' : ''}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;