import { useState } from "react"
import Wrapper from "../components/Wrapper"
import styled from "./RegisterPage.module.css"
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

export const RegisterPage = () => {

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
      <div className={styled.register}>
        <form className={styled.form} onSubmit={handleSubmit}>

        <h3>Register to save your tasks</h3>

          <div className={styled.input}>
            <input
              name='firstName'
              type="text"
              onChange={handleChange}
              value={input.firstName}
              required={required}
            />
            <label>Enter your first name</label>
          </div>
          <div className={styled.input}>
            <input
              name='lastName'
              type="text"
              onChange={handleChange}
              value={input.lastName}
              required={required}
            />
            <label>Enter your last name</label>
          </div>
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
          <div className={styled.input}>
            <input
              name='verifyPassword'
              type={passwordType}
              onChange={handleChange}
              value={input.verifyPassword}
              required={required}
            />
            <label>Re-enter your password</label>
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
          <button>Register</button>
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
