import { useState } from "react"
import Wrapper from "../components/Wrapper"
import styled from "./RegisterPage.module.css"
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import BasicModal from "../components/Modal";

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
    state: false,
    success: false,
    message: '',
  })

  const [visible, setVisible] = useState(false)

  const [showModal, setShowModal] = useState({
    state: false,
    message: {}
  })

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
    const { password, verifyPassword } = input
    if (password !== verifyPassword) {
      setError({
        state: true,
        success: false,
        message: 'Passwords do not match',
      })
      return
    }
    const submit = await fetch('http://localhost:5000/api/v1/tasks/register/user', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
    const response = await submit.json()
    if (!response.success) {
      setError({
        state: true,
        success: false,
        message: response.message,
      })
      return
    }
    setShowModal({
      state: true,
      message: response
    })

  }

  return (
    <Wrapper>
      {showModal.state && <BasicModal settings={showModal} />}
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