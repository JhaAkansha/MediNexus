import './home.css';
import icon from '../profile-add.svg';
import homepage3 from '../homepage3.jpg';
import { useNavigate } from 'react-router-dom';

function Home({ setToken, removeToken }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/doctorLogin');
  };
    return (
      <div className="Home">
        <div className='container'>
      <div className='title'>
        <img className='profile-add' src = {icon} alt = 'dummy'></img>
        <h1 className='medinexus'>MediNexus</h1>
        <div className='tagline'>Your Health, Organized.</div>
        {localStorage.getItem('authToken') ? (
            <button className='logout-button' onClick={handleLogout}>Logout</button>
          ) : (
            <a href='/doctorLogin'>
              <button className='login-button'>Login</button>
            </a>
          )}
        </div>
        <div className='stock'>
        <img className='stock1' src = {homepage3} alt = 'stock'></img>
        </div>
      </div>
      <div className='contact-us'>
        <div className='socials'>
          <svg className='instagram' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#e3e6e0" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
          <svg className='facebook' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#e3e6e0" d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"/></svg>
          <svg className='twitter' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#e3e6e0" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
        </div>
        <div className='newsletter'>
          <div className='subscribe-text'>Subscribe to our newsletter!</div>
          <div className='input-generate'>
          <input placeholder='Enter your email'className = 'email-input'/>
          <button className='newsletter-subscribe'>Submit</button>
          </div>
        </div>
      </div>
      </div>
    );
  }
  
  export default Home;