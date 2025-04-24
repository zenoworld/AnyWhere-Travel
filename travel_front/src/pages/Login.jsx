import React, { useState, useContext } from 'react'
import { Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../style/login.css'
import { AuthContext } from './../context/AuthContext'
import { BASE_URL } from './../utils/config'

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';

const Login = () => {
  const [credential, setCredential] = useState({
    email: '',
    password: '',
  });
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: 'LOGIN_START' })
    try {
      const res = await fetch(`${BASE_URL}/user/login`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credential)
      })

      const result = await res.json()
      if (!res.ok) {
        alert(result.message)
      }

      if (result.data.isVerified) {
        if (result.data.role === 'admin') {
          navigate('/adminpage');
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Here is a gentle confirmation that your action was successful.
          </Alert>
          console.log('admin logged');
        } else {
          navigate('/')
          console.log('user logged');
        }

      } else {
        setCredential({
          email: '',
          password: '',
        });
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">This is an error Alert.</Alert>
        </Stack>

      }
      dispatch({ type: 'LOGIN_SUCCESS', payload: result.data })
    }
    catch (error) {
      setCredential({
        email: '',
        password: '',
      });
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message })
    }
  }

  const handleChange = e => {
    setCredential(prev => ({ ...prev, [e.target.id]: e.target.value }))
  };

  return (
    <section>
      <Container className='main-login-container'>
        <div className="login__container">

          <div className='login__form '>
            <h2> Login</h2>
            <form onSubmit={handleClick}>
              <input
                type='email'
                placeholder='Email*'
                required
                id='email'
                onChange={handleChange}
              />
              <input
                type='password'
                placeholder='Password*'
                required
                id='password'
                onChange={handleChange}
              />
              <button type='submit'>
                Login
              </button>

            </form>
          </div>

          <div className='login_side_div'>
            <div className='login_side_div_inner'>
              <h1>Welcome ! </h1>
              <p>
                Dont have an account ?<Link to='/register'>
                  Create
                </Link>
              </p>
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}

export default Login