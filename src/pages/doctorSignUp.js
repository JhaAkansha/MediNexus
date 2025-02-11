import { useNavigate } from 'react-router-dom';
import './doctorSignUp.css';
import { CSSTransition } from 'react-transition-group';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { auth, sendEmailVerification, createUserWithEmailAndPassword } from './firebase';

function DoctorSignUp({ setToken }) {
  const navigate = useNavigate();
  const [inProp, setInProp] = useState(true);
  const [userType, setUserType] = useState('patient');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInClick = () => {
    setInProp(false);
    setTimeout(() => {
      navigate('/doctorLogin');
    }, 300);
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    const confirmPassword = document.getElementById('setPassword').value;

    if (!name || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);

      setIsLoading(false);
      alert('A verification email has been sent. Please check your inbox to proceed.');
      pollForEmailVerification(user, name, email, password, userType);

      listenForEmailVerification(user, name, email, password, userType);
    } catch (error) {
      console.error('Error during registration:', error);
      setIsLoading(false);
    }
  };

  const pollForEmailVerification = async (user, name, email, password, userType) => {
    let attempts = 0;
    const maxAttempts = 10;

    const checkVerificationStatus = async () => {
      await user.reload();
      if (user.emailVerified) {
        console.log('Email is verified');
        const userData = { name, email, password, userType }
        addUserToBackend(userData);
      } else if (attempts < maxAttempts) {
        attempts++;
        console.log(`Email not verified, checking again... (${attempts})`);
        setTimeout(checkVerificationStatus, 3000);
      } else {
        alert('Verification timed out, please try again later.');
      }
    };

    checkVerificationStatus();
  };

  const listenForEmailVerification = (user, name, email, password, userType) => {
    console.log("unsubscribe");
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      console.log("currentuser verified = ", currentUser.emailVerified)
      if (currentUser) {
        await currentUser.reload();
        console.log("currentuser verified = ", currentUser.emailVerified)

        if (currentUser.emailVerified) {
          unsubscribe();
          
          const userData = { name, email, password, userType }
          await addUserToBackend(userData);
        } else {
          alert('Please verify your email to proceed.');
        }
      }
    });
  };

  const addUserToBackend = async (userData) => {
    console.log("addUserToBackend")
    console.log(userData);
    try {
      const response = await fetch('http://localhost:3000/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        const loginData = {
          email: userData.email,
          password: userData.password,
        };

        const loginResponse = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });

        const loginResult = await loginResponse.json();
        const token = loginResult.token;

        if (token) {
          setToken(token);
          localStorage.setItem('authToken', token);
          const decodedToken = jwtDecode(token);
          const userType = decodedToken.userType;
          console.log(userType);

          if (userType === 'doctor') {
            console.log("here");
            navigate('/doctor-registration');
          } else {
            navigate('/');
          }
        }
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error adding user to backend:', error);
      alert('Something went wrong while adding the user to the backend');
    }
  };

  return (
    <CSSTransition in={inProp} timeout={300} classNames="fade" appear>
      <div className='doctor-sign-up'>
        <div className='sign-up-content'>
          <h2 className='welcome'>Welcome Back!</h2>
          <div className='para'>Enter your personal details to use all site features.</div>
          <button className='sign-in' onClick={handleSignInClick}>Sign In</button>
        </div>
        <div className="sign-up-container">
          <div className='user-type'>
            <button className={`doctor ${userType === 'doctor' ? 'active' : ''}`} onClick={() => handleUserTypeChange('doctor')}>Doctor</button>
            <button className={`patient ${userType === 'patient' ? 'active' : ''}`} onClick={() => handleUserTypeChange('patient')}>Patient</button>
          </div>
          <h2>Sign Up</h2>
          <form id="doctorSignUpForm" onSubmit={handleSubmit}>
            <div className='or'>or</div>
            <input placeholder='Name' className='name' type="name" id="userName" name="userName" required />
            <input placeholder='Email' className='email' type="email" id="userEmail" name="userEmail" required />
            <input placeholder='Password' className='password' type="password" id="userPassword" name="userPassword" required />
            <input placeholder='Confirm Password' className='set-password' type="password" id="setPassword" name="setPassword" required />
            <button className="signup" type="submit" disabled={isLoading}>
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </CSSTransition>
  );
}

export default DoctorSignUp;
