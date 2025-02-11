import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import './doctorLogin.css';
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import {jwtDecode} from 'jwt-decode';

export default function DoctorLogin( { setToken } ) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [inProp, setInProp] = useState(true);
  const navigate = useNavigate();

  const loginUser = async (userCredentials) => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      });
      const data = await response.json();
      
      if (response.ok) {
        alert('Login Successful');
        return data.token;
      } else {
        alert(data.message || 'Login failed');
        return null;
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Something went wrong. Please try again.');
      return null;
    }
  };

const responseGoogle = async (response) => {
  if (response.credential) {
    const userCredentials = { token: response.credential };

    try {
      const res = await fetch('http://localhost:3000/auth/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
        localStorage.setItem('authToken', data.token);
        navigate('/');
      } else {
        alert('Google login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      alert('Something went wrong during Google login. Please try again.');
    }
  } else {
    alert('Google login failed. Please try again.');
  }
};


  const handleSubmit = async event => {
    event.preventDefault();

    const userCredentials = {
      email: email,
      password: password,
    }

    const token = await loginUser(userCredentials);
    
    if (token) {
      setToken(token);
      localStorage.setItem('authToken', token);
      const decodedToken = jwtDecode(token);
        const userType = decodedToken.userType;
        console.log(userType);
      if (userType === 'doctor'){
        console.log("here");
        navigate('/doctor-dashboard');
      }
      else {
        navigate('/');
      }
    }
  };

  const handleSignUpClick = () => {
    setInProp(false);
    setTimeout(() => {
      navigate('/doctorSignUp');
    }, 300);
  };

  return (
    <CSSTransition in={inProp} timeout={300} classNames="fade" appear>
    <div className='doctor-login'>
      <div className="login-container">
        <h2>Sign In</h2>
        <form id="doctorLoginForm" onSubmit={handleSubmit}>
          <GoogleOAuthProvider>
            <GoogleLogin
            client_id = "558473929617-qd1a51cu9vttfoflcn3gg7ebne2o7auu.apps.googleusercontent.com"
            buttonText = "Login"
            onSuccess = {responseGoogle}
            onFailure = {responseGoogle}
            cookiePolicy = {'single_host_origin'}
            redirect_uri="http://localhost:3000/auth/google/callback"
            />
            </GoogleOAuthProvider>
          <div className='or'>or</div>
          <input
            placeholder='Email'
            className='email'
            type="email" id="doctorEmail"
            name="doctorEmail"
            onChange={e=>setEmail(e.target.value)}
            required
          />
          <input
            placeholder='Password'
            className='password'
            type="password"
            id="doctorPassword"
            name="doctorPassword"
            onChange={e=>setPassword(e.target.value)}
            required
          />
          <div className='forgot_password'>Forgot Password?</div>
          <button className="login">Login</button>
        </form>
      </div>
      <div className='content'>
        <h2 className='hello'>Hello, Friend!</h2>
        <div className='para'>Register with your personal details to use all site features.</div>
        <button className='sign-up' onClick={handleSignUpClick}>Sign Up</button>
      </div>
    </div>
    </CSSTransition>
  );
}

DoctorLogin.propTypes = {
  setToken: PropTypes.func.isRequired
}