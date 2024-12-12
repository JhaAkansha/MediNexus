import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import './doctorLogin.css';

// async function loginUser(credentials) {
//   return fetch('http://localhost:8080/doctorLogin', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   })
//     .then(data => data.json())
//  }
 
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
      
      // If response is OK, return the token
      if (response.ok) {
        alert('Login Successful');
        return data.token; // Return the JWT token
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

  const handleSubmit = async event => {
    event.preventDefault();
    // const token = await loginUser({
    //   email,
    //   password
    // });
    // setToken(token);
    // navigate('/');

    const userCredentials = {
      email: email,
      password: password,
    }

    const token = await loginUser(userCredentials);
    
    if (token) {
      // If token is received, set it in the parent component
      setToken(token);
      //store the token in localStorage for persistence
      localStorage.setItem('authToken', token);
      navigate('/');
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
          <div className='alt-login-opts'>
            <svg className='google-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="#16423c" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
            </svg>
            <div className='text'>Sign in using Google</div>
          </div>
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