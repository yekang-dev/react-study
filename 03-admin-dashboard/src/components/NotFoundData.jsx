import { useNavigate } from "react-router";

function NotFoundData ({ message, backTo }) {
  const navigate = useNavigate();

  return (
    <>
      <h2>{ message }</h2>
      <button type="button" onClick={() => navigate(backTo)}>목록으로</button>
    </>
  )
}

export default NotFoundData;