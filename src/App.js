import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar"
import About from "./pages/about"
import Services from "./pages/services"
import Testimonial from "./pages/testimonial"
import Appointment from "./pages/appointment"
import Calendar from "./pages/calender"
import Home from "./pages/home"
import DoctorProfile from './pages/doctorProfile';
import CommonLogin from './pages/commonLogin';
import DoctorLogin from './pages/doctorLogin';
import DoctorSignUp from './pages/doctorSignUp';
import AddReview from './pages/addReview'

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      <Routes>
          <Route path = '/' element = {<Home/>} />
          <Route path='/about' element={<About />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/services' element={<Services />} />
          <Route path='/testimonial' element={<Testimonial />} />
          <Route path='/appointment' element={<Appointment />} />
          <Route path='/doctorProfile' element={<DoctorProfile />} />
          <Route path='/commonLogin' element={<CommonLogin />} />
          <Route path='/doctorLogin' element={<DoctorLogin />} />
          <Route path = '/doctorSignUp' element = {<DoctorSignUp/>}/>
          <Route path = '/addReview' element = {<AddReview/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
