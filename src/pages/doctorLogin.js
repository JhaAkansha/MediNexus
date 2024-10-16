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
    <div className="login-container">
      <h2>Doctor Login</h2>
      <form id="doctorLoginForm" onSubmit={handleSubmit}>
        <label for="doctorEmail">Email:</label>
        <input type="email" id="doctorEmail" name="doctorEmail" required />
        <label for="doctorPassword">Password:</label>
        <input type="password" id="doctorPassword" name="doctorPassword" required />
        <button type="submit">Login</button>
      </form>
      <p>No account? <a href="#">Sign Up</a></p>
    </div>
  );
}

export default DoctorLogin;