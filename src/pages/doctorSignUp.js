// import { useNavigate } from 'react-router-dom';
// import './doctorSignUp.css';
// import { CSSTransition } from 'react-transition-group';
// import { useState } from 'react';
// import {jwtDecode} from 'jwt-decode';
// import { auth, sendEmailVerification, createUserWithEmailAndPassword } from './firebase';

// function DoctorSignUp({ setToken }) {
//   const navigate = useNavigate();
//   const [inProp, setInProp] = useState(true);
//   const [userType, setUserType] = useState('patient');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSignInClick = () => {
//     setInProp(false);
//     setTimeout(() => {
//       navigate('/doctorLogin');
//     }, 300);
//   };

//   const handleUserTypeChange = (type) => {
//     setUserType(type);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Get form data
//     const name = document.getElementById('userName').value;
//     const email = document.getElementById('userEmail').value;
//     const password = document.getElementById('userPassword').value;
//     const confirmPassword = document.getElementById('setPassword').value;

//     // Validate form inputs
//     if (!name || !email || !password) {
//       alert('Please fill in all fields.');
//       return;
//     }
//     if (password !== confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }

//     const formData = {
//       name: name,
//       email: email,
//       password: password,
//       userType: userType
//     };
    
//     setIsLoading(true);
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       await sendEmailVerification(user);
//       setIsLoading(false);
//       alert('Verification email sent. Please verify your email before completing the sign-up process.');
//       setError('A verification email has been sent. Please check your inbox to proceed.');
//       return;
//     } catch (error) {
//       console.error('Error:', error);
//       setIsLoading(false);
//       setError(error.message); // Display error message
//     }
    
//     try{
//       //Making POST request to the backend
//       const response = await fetch ('http://localhost:3000/api/post',{
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert('Registration successful!');
//         const loginData = {
//           email: email,
//           password: password,
//         };

//         const loginResponse = await fetch('http://localhost:3000/auth/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(loginData),
//         });
  
//         const loginResult = await loginResponse.json();
//         const token = loginResult.token;

//         if (token) {
//               // If token is received, set it in the parent component
//               setToken(token);
//               //store the token in localStorage for persistence
//               localStorage.setItem('authToken', token);
//               const decodedToken = jwtDecode(token);
//                 const userType = decodedToken.userType;
//                 console.log(userType);
//               if (userType === 'doctor'){
//                 console.log("here");
//                 navigate('/doctor-registration');
//               }
//               else {
//                 navigate('/');
//               }
//             }
//       }
//       else {
//         alert(data.message || 'Registration failed');
//       }
//     }
//     catch (error) {
//       console.error('Error:', error);
//       alert('Something went wrong, please try again');
//     }
//   };


//   return (
//     <CSSTransition in={inProp} timeout={300} classNames="fade" appear>
//       <div className='doctor-sign-up'>
//         <div className='sign-up-content'>
//           <h2 className='welcome'>Welcome Back!</h2>
//           <div className='para'>Enter your personal details to use all site features.</div>
//           <button className='sign-in' onClick={handleSignInClick}>Sign In</button>
//         </div>
//         <div className="sign-up-container">
//         <div className='user-type'>
//             <button className={`doctor ${userType === 'doctor' ? 'active' : ''}`} onClick={() => handleUserTypeChange('doctor')}>Doctor</button>
//             <button className={`patient ${userType === 'patient' ? 'active' : ''}`}  onClick={() => handleUserTypeChange('patient')}>Patient</button>
//         </div>
//           <h2>Sign Up</h2>
//           <form id="doctorSignUpForm" onSubmit={handleSubmit}>
//             {/* <div className='alt-sign-up-opts'>
//               <svg className='google-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
//                 <path fill="#16423c" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
//               </svg>
//               <div className='text'>Sign up using Google</div>
//             </div> */}
//             <div className='or'>or</div>
//             <input placeholder='Name' className='name' type="name" id="userName" name="userName" required />
//             <input placeholder='Email' className='email' type="email" id="userEmail" name="userEmail" required />
//             <input placeholder='Password' className='password' type="password" id="userPassword" name="userPassword" required />
//             <input placeholder='Confirm Password' className='set-password' type="password" id="setPassword" name="setPassword" required />
//             <button className="signup" type="submit" disabled={isLoading}>
//               {isLoading ? 'Signing Up...' : 'Sign Up'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </CSSTransition>
//   );
// }

// export default DoctorSignUp;

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
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

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

    // Get form data
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    const confirmPassword = document.getElementById('setPassword').value;

    // Validate form inputs
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
      // Creating the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Inform the user about the email verification
      setIsLoading(false);
      alert('A verification email has been sent. Please check your inbox to proceed.');
      setError('A verification email has been sent. Please check your inbox to proceed.');
      pollForEmailVerification(user, name, email, password, userType);

      // Proceed after email is verified
      listenForEmailVerification(user, name, email, password, userType);
    } catch (error) {
      console.error('Error during registration:', error);
      setIsLoading(false);
      setError(error.message); // Display error message
    }
  };

  const pollForEmailVerification = async (user, name, email, password, userType) => {
    setIsVerifying(true);
    let attempts = 0;
    const maxAttempts = 10; // Limit the number of attempts to check email verification status

    const checkVerificationStatus = async () => {
      await user.reload(); // Reload user object to get the updated emailVerified status
      if (user.emailVerified) {
        console.log('Email is verified');
        setIsVerifying(false); // Stop polling
        addUserToBackend(name, email, password, userType); // Proceed to backend call
      } else if (attempts < maxAttempts) {
        attempts++;
        console.log(`Email not verified, checking again... (${attempts})`);
        setTimeout(checkVerificationStatus, 3000); // Retry every 3 seconds
      } else {
        setIsVerifying(false);
        alert('Verification timed out, please try again later.');
      }
    };

    checkVerificationStatus();
  };

  // Function to listen for email verification
  const listenForEmailVerification = (user, name, email, password, userType) => {
    console.log("unsubscribe");
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      console.log("currentuser verified = ", currentUser.emailVerified)
      if (currentUser) {
        await currentUser.reload();
        console.log("currentuser verified = ", currentUser.emailVerified)

        if (currentUser.emailVerified) {
          unsubscribe();

          await addUserToBackend({ name, email, password, userType });
        } else {
          alert('Please verify your email to proceed.');
        }
      }
    });
  };

  // Function to add user data to the backend
  const addUserToBackend = async (userData) => {
    console.log("addUserToBackend")
    try {
      // Making POST request to the backend
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
          // If token is received, set it in the parent component
          setToken(token);
          // Store the token in localStorage for persistence
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
