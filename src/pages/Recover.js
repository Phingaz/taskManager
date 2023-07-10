import { useNavigate } from "react-router-dom"


export const Recover = () => {

    const navigate = useNavigate()

  return (
    <div>
        <h1>Page in development</h1>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  )
}
