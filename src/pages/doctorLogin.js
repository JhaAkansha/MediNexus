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
        <input placeholder = 'Email' type="email" id="doctorEmail" name="doctorEmail" required />
        <input placeholder = 'Password' type="password" id="doctorPassword" name="doctorPassword" required />
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