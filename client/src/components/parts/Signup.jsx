import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'



const Signup = () => {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [message, setMessage] = useState('')


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = 'http://localhost:3000/users/';
      const { res } = await axios.post(url, data)

      setMessage(res.message)

    } catch (error) {
      // if (
      //   error.response &&
      //   error.response.status >= 400 &&
      //   error.response.status <= 500
      // ) {
      //   setError(error.response.data.message);
      // }

      setError("something happende")
    }


  }
  return (
    <>
      <div className="signup_container">
        <div className="signup_form_container">
          <div className="signup_left">
            <h1>Already have an account</h1>
            <Link to='/signin'>
              <button type='button' className='white_btn'>SignIn</button>
            </Link>

          </div>
          <div className="signup_right">
            <form className='form_container' onSubmit={handleSubmit}>
              <h1>Create an Account</h1>
              <input type="text"
                placeholder='First Name'
                name='firstname'
                value={data.firstname}
                onChange={handleChange}
                required
                className='input'
              />
              <input type="text"
                placeholder='Last Name'
                name='lastname'
                value={data.lastname}
                onChange={handleChange}
                required
                className='input'
              />
              <input type="email"
                placeholder='Email'
                name='email'
                value={data.email}
                onChange={handleChange}
                required
                className='input'
              />
              <input type="password"
                placeholder='Password'
                name='password'
                value={data.password}
                onChange={handleChange}
                required
                className='input'
              />
              {error && <div className='error_message'>{error}</div>}
              {message && <div className='sucess-message'>{message}</div>}
              <button type='submit' className='green_btn' >SignUp</button>

            </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default Signup
