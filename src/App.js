import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar"
import About from "./pages/about"
import Services from "./pages/services"
import Contact from "./pages/contact"
import Calendar from "./pages/calender"
import icon from './profile-add.svg';
// import homepage1 from './homepage1.jpg';
// import homepage2 from './homepage2.jpg';
import homepage3 from './homepage3.jpg';
import instagram from './instagram.svg';
import twitter from './twitter.svg';
import facebook from './facebook.svg';

function App() {
  return (
    <div className="App">
      <div className ='NavBar'>
      <Router>
      <Navbar/>
      <Routes>
        <Route path='/about' exact component={About} />
        <Route path='/calendar' component={Calendar} />
        <Route path='/services' component={Services} />
        <Route path='/contact' component={Contact} />
      </Routes>
    </Router>
      </div>
      <div className='container'>
      <div className='title'>
        <img className='profile-add' src = {icon} alt = 'dummy'></img>
        <h1 className='medinexus'>MediNexus</h1>
        <div className='tagline'>Enter tagline here.</div>
        <button className='login-button'>Login</button>
        </div>
        <div className='stock'>
        <img className='stock1' src = {homepage3} alt = 'stock'></img>
        {/* <img className='stock2' src = {homepage2} alt = 'stock'></img>  */}
        </div>
      </div>
      <div className='contact-us'>
        <div className='socials'>
          <img className='instagram' src = {instagram} alt = 'instagram'></img>
          <img className='facebook' src = {facebook} alt = 'facebook'></img>
          <img className='twitter' src = {twitter} alt = 'twitter'></img>
        </div>
        <div className='newsletter'>
          <div className='subscribe-text'>Subscribe to our newsletter!</div>
          <div className='input-generate'>
          <input placeholder='Enter your email'id = 'email-input'/>
          <button className='newsletter-subscribe'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
