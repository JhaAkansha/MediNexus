import { useNavigate } from 'react-router-dom';
import './doctorLogin.css';

function DoctorLogin() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get form data
    const email = document.getElementById('doctorEmail').value;
    const password = document.getElementById('doctorPassword').value;

    // Validate form inputs (add your validation logic here)
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    // Replace this with your actual login logic (e.g., API call, local storage)
    if (email === 'valid@email.com' && password === 'validpassword') { // Example validation
      alert('Login successful!');
      navigate('/dashboard'); // Replace with your desired redirect path
    } else {
      alert('Invalid email or password.');
    }
  };

  return (
    <div className='doctor-login'>
    <div className="login-container">
      <h2>Sign In</h2>
      <form id="doctorLoginForm" onSubmit={handleSubmit}>
        <div className='alt-login-opts'>
        <svg className='google-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="#16423c" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
        <div className='text'> sign in using google</div>
        </div>
        <div className='or'>or</div>
        <input placeholder = 'Email' className = 'email' type="email" id="doctorEmail" name="doctorEmail" required />
        <input placeholder = 'Password' className='password' type="password" id="doctorPassword" name="doctorPassword" required />
        <div className='forgot_password'>Forgot Password?</div>
        <button className="login">Login</button>
      </form>
    </div>
    <div className='content'>
      <h2 className='hello'> Hello, Friend!</h2>
      <div className='para'>Register with your personal details to use all site features.</div>
      <button className='sign-up'> Sign Up</button>
    </div>
    </div>
  );
}

export default DoctorLogin;