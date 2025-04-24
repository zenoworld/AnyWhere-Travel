import React, { useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './../context/AuthContext';
import { BASE_URL } from './../utils/config';
import '../style/register.css';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Alert from '@mui/material/Alert';


const Register = () => {
  const [credential, setCredential] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [otpCode, setOtpCode] = useState('');
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredential((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRoleChange = (role) => {
    setCredential((prev) => ({ ...prev, role }));
  };

  const handleClick = async (e) => {
    const otpDiv = document.getElementById('register-container')
    if (credential.email !== '' && credential.password !== '' && credential.username !== '') {
      otpDiv.classList.add("active");
    }
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/user/register`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(credential),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        return;
      }

      dispatch({ type: 'REGISTER_SUCCESS' });

    } catch (err) {
      <Alert variant="outlined" severity="error">
        {err}
      </Alert>
    }
  };

  const verifyOTP = async (e) => {
    verifyEmail();
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/user/verifyEmail`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ code: otpCode }),
      });

      const result = await res.json();
      console.log(result);

      if (!res.ok) {
        alert(result.message);
        return;
      }

      dispatch({ type: 'REGISTER_SUCCESS' });

    } catch (err) {
      <Alert variant="outlined" severity="error">
        {err}
      </Alert>
    }
  };

  const verifyEmail = () => {
    const otpDiv = document.getElementById('register-container')
    otpDiv.classList.remove("active");

    setTimeout(() => {
      navigate('/login');
    }, 500)
  }


  return (
    <section>
      <Container className='main-register-container'>
        <div id='register-container' className="register__container d-flex justify-content-between">

          <div className="register__form sign-up">
            <h2>Create Account</h2>
            <form onSubmit={handleClick}>
              <input
                type="text"
                placeholder="username"
                required
                id="username"
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="email"
                required
                id="email"
                onChange={handleChange}
              />

              <input
                type="password"
                placeholder="Password"
                required
                id="password"
                onChange={handleChange}
              />

              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel className='radio' checked={credential.role === 'admin'}
                    onChange={() => handleRoleChange('admin')} value="admin" control={<Radio />} label="Admin" />
                  <FormControlLabel className='radio' checked={credential.role === 'user'}
                    onChange={() => handleRoleChange('user')} value="user" control={<Radio />} label="User" />
                </RadioGroup>
              </FormControl>

              <button type="submit">
                Sign Up
              </button>
            </form>
          </div>

          <div className="register__form otp">
            <h2>Enter OTP</h2>
            <form onSubmit={verifyOTP}>
              <input
                type='text'
                placeholder='enter OTP'
                id='otp'
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
              />
              <button type="submit">
                Submit OTP
              </button>
            </form>
          </div>

          <div class="toggle-container">
            <div class="toggle">
              <div class="toggle-panel toggle-left">
                <h1>Verify Yourself!</h1>
              </div>
              <div class="toggle-panel toggle-right">
                <h1>Hello !</h1>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Register;
