import { useState } from "react"
import Wrapper from "../components/Wrapper"
import styled from "./LoginPage.module.css"
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

export const LoginPage = () => {

  const required = true

  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    verifyPassword: '',
  })

  const [error, setError] = useState({
    state: Boolean,
    success: Boolean,
    message: '',
  })

  const [visible, setVisible] = useState(false)

  const passwordType = visible ? 'text' : 'password'

  const handleChange = (e) => {
    setError({
      state: false,
      success: '',
      message: '',
    })
    const { name, value } = e.target

    setInput(p => ({
      ...p,
      [name]: value
    }))
  }

  const togglePassword = () => {
    setVisible(p => !p)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(input)
  }

  return (
    <Wrapper>
      <div className={styled.login}>

        <form className={styled.form} onSubmit={handleSubmit}>
          <h3>Login to view you tasks</h3>

          <div className={styled.input}>
            <input
              name='email'
              type="email"
              onChange={handleChange}
              value={input.email}
              required={required}
            />
            <label>Enter your email address</label>
          </div>
          <div className={styled.input}>
            <input
              name='password'
              type={passwordType}
              onChange={handleChange}
              value={input.password}
              required={required}
            />
            <label>Enter password</label>
            {
              visible ?
                <VisibilityOffRoundedIcon
                  className={styled.icon}
                  onClick={togglePassword}
                />
                :
                <VisibilityRoundedIcon
                  className={styled.icon}
                  onClick={togglePassword}
                />
            }
          </div>
        
          <button>Login</button>
          {
            error.state
            &&
            <p className={error.success ? styled.success : styled.error}>
              {error.message}
            </p>
          }
        </form>
      </div>
    </Wrapper>
  )
}
