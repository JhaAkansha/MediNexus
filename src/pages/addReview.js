import './addReview.css';

function AddReview() {

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get form data
    const reviewerName = document.getElementById('reviewerName').value;
    const doctorName = document.getElementById('doctorName').value;

    // Validate form inputs (add your validation logic here)
    if (!reviewerName|| !doctorName) {
      alert('Please fill in all fields.');
      return;
    }
  };

  return (
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
          <input placeholder='Email' className='email' type="email" id="doctorEmail" name="doctorEmail" required />
          <input placeholder='Password' className='password' type="password" id="doctorPassword" name="doctorPassword" required />
          <div className='forgot_password'>Forgot Password?</div>
          <button className="login">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AddReview;
