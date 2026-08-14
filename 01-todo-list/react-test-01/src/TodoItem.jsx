import { useState } from "react";

// todo, onToggle, onDelete는 부모로부터 받음.
// function TodoItem(data){ ... } 형식도 가능하지만, {todo, onToggle, onDelete} 이런 형식으로 풀어서 작성 가능.
// data.todo, data.onToggle ... 과 같은 형식으로 작성 안해도 됨. (구조분해할당:destructuring)
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEdit, setIsEdit] = useState(false); // 수정 모드 on,off
  const [editText, setEditText] = useState(todo.text); // 수정된 내용 변수
  
  // todo 변경 내용 저장.
  const editSubmit = (e) => {
    e.preventDefault();
    if (editText.trim() === '') return;
    onEdit(todo.id, editText); // 부모에게 변경된 값의 id와 변경된 내용 전달
    setIsEdit(false); // 수정모드를 다시 일반 모드로 변경
  };

  return (
    // 부모 컴포넌트에서 리스트의 식별을 위한 key를 넣어주었으므로,
    // <li>에서는 key를 작성해주지 않아도 됨.
    <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {/* // isEdit 값이 수정모드(true, false) 냐에 따라 리스트 보여지도록 변경 */}
      {isEdit ? (
        // JSX는 규칙상 여러 요소를 반드시 하나로 감싸서 리턴해야함.
        // <div>같은 태그로 감싸도 되지만, 레이아웃이 틀어질 수 있음.
        // 따라서 <> </> 라는 프래그먼트를 사용함! (실제 화면에는 불필요한 태그도 안만들고 묶는용도)
        <>
          <form onSubmit={editSubmit} style={{ flex: 1 }}>
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus //자동 input 포커스
            />
          </form>
          <button onClick={editSubmit}>저장</button>
          
          <button onClick={() => {
            // 수정하다 취소 시, 수정하던 값이 유지되어 원래값으로 초기화.
            setEditText(todo.text); 
            setIsEdit(false);}}>
              취소
          </button>
        </>
      ) : (
        <>
          <span
            // onClick 부분에서 onClick={toggleTodo}는 함수만 그냥 실행 (바로실행)
            // 아래와 같이 화살표 함수로 감싸야, 특성 값(todo.id)인자를 넘겨줌 (방법만 작성해두고, 클릭시 실행)
            // 인자를 넘겨야 하는 함수는 무조건 화살표 함수로 한번 감싸줘야 함.
            onClick={() => onToggle(todo.id)}
            style={{
              textDecoration: todo.done ? 'line-through' : 'none',
              cursor: 'pointer',
              flex: 1,
            }}
          >
            {todo.text}
          </span>
          
          <button onClick={() => setIsEdit(true)}>수정</button>
          <button onClick={() => onDelete(todo.id)}>삭제</button>
        </>
      )}

      
    </li>
  );
}

//해당 파일을 다른 파일에서 import 하여 사용할 수 있도록 export 선언 필수.
//부모 컴포넌트(App.jsx)에서 사용하려면 필수!
export default TodoItem;