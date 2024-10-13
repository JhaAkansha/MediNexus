import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar"
import About from "./pages/about"
import Services from "./pages/services"
import Contact from "./pages/contact"
import Calendar from "./pages/calender"
import Home from "./pages/home"

function App() {
  return (
    <div className="App">
      <div className ='NavBar'>
      <Router>
      <Navbar/>
      <Routes>
          <Route path = '/home' element = {<Home/>} />
          <Route path='/about' element={<About />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;
