import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Signin = () => {

  const [data, setData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const Handlechange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })

  }

  const Handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const url = '/';
      const { data: res } = await axious.post(url, data)
      localStorage.setItem("token", res.data);
      navigate('/')
    }
    catch (err) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }

    }

  }
  return (
    <>
      <div className="signin_container">
        <div className="signin_form_container">
          <div className="signin_left">
            <form className='form-container' onSubmit={Handlesubmit}>
              <h1>Welcome</h1>
              <input type="email"
                placeholder='Email'
                name='email'
                onChange={Handlechange}
                value={data.email}
                required
                className='input'

              />

              <input type="password"
                placeholder='Password'
                name='password'
                onChange={Handlechange}
                value={data.password}
                required
                className='input'
              />

              <button type='submit' className='green_btn'>
                SignIn
              </button>

            </form>

          </div>
          <div className="signin_right">
            <h1>New Here ?</h1>
            <Link to='/signup'>
              <button type='button' className='white_btn'>SingUp</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin
