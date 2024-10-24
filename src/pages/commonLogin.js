import './commonLogin.css';
import { useNavigate } from 'react-router-dom';
import doctor from '../doctor1.jpeg';
import patient from '../doctor3.jpeg';

function CommonLogin() {
    const navigate = useNavigate();
  return (
    <div className="common-login-container">
      <h2 className='cmn_lgn_heading'>Choose Account Type</h2>
      <div className="account-options">
        <div className="account-option">
          <img src={doctor} alt="Doctor" className="account-image" />
          <button className="account-button" onClick={() => navigate('/doctorLogin')}>Doctor</button>
        </div>
        <div className="account-option">
          <img src={patient} alt="Patient" className="account-image" />
          <button className="account-button">Patient</button>
        </div>
      </div>
    </div>
  );
}

export default CommonLogin;