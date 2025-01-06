// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/navbar"
// import About from "./pages/about"
// import Services from "./pages/services"
// import Testimonial from "./pages/testimonial"
// import Appointment from "./pages/appointment"
// import Calendar from "./pages/calender"
// import Home from "./pages/home"
// import DoctorProfile from './pages/doctorProfile';
// import CommonLogin from './pages/commonLogin';
// import DoctorLogin from './pages/doctorLogin';
// import DoctorSignUp from './pages/doctorSignUp';
// import AddReview from './pages/addReview';
// import PrivateRoute from './PrivateRoute.js';
// import useToken from './useToken.js';
// import DoctorDashboard from './pages/doctorDashboard.js';
// import DoctorRegistration from './pages/doctorRegistration.js';

// function App() {
//   const {token, setToken, removeToken} = useToken();

//   return (
//     <div className="App">
//       <Router>
//       <Navbar/>
//       <Routes>
//           <Route path = '/' element = {<Home setToken={setToken} removeToken = {removeToken}/>} />
//           <Route path='/about' element={<About />} />
//           <Route path='/services' element={<Services />} />
//           <Route path='/testimonial' element={<Testimonial />} />
//           <Route path='/doctorProfile' element={<DoctorProfile />} />
//           <Route path='/commonLogin' element={<CommonLogin />} />
//           <Route path='/doctorLogin' element={<DoctorLogin setToken={setToken}/>} />
//           <Route path = '/doctorSignUp' element = {<DoctorSignUp setToken={setToken}/>}/>
//           <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
//           <Route path = "/doctor-registration" element = {<DoctorRegistration/>}/>
//            <Route element={<PrivateRoute token={token} />}>
//             <Route path="/calendar" element={<Calendar />} />
//             <Route path="/appointment" element={<Appointment />} />
//             <Route path="/addReview" element={<AddReview />} />
//           </Route>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;


import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import About from "./pages/about";
import Services from "./pages/services";
import Testimonial from "./pages/testimonial";
import Appointment from "./pages/appointment";
import Calendar from "./pages/calender";
import Home from "./pages/home";
import DoctorProfile from './pages/doctorProfile';
import CommonLogin from './pages/commonLogin';
import DoctorLogin from './pages/doctorLogin';
import DoctorSignUp from './pages/doctorSignUp';
import AddReview from './pages/addReview';
import PrivateRoute from './PrivateRoute.js';
import useToken from './useToken.js';
import DoctorDashboard from './pages/doctorDashboard.js';
import DoctorRegistration from './pages/doctorRegistration.js';
import MedicalRecords from './pages/medicalRecords.js';
import PatientHistory from './pages/patientHistory.js';

function App() {
  const { token, setToken, removeToken } = useToken();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<><Navbar /><Home setToken={setToken} removeToken={removeToken} /></>} />
          <Route path="/about" element={<><Navbar /><About /></>} />
          <Route path="/services" element={<><Navbar /><Services /></>} />
          <Route path="/testimonial" element={<><Navbar /><Testimonial /></>} />
          <Route path="/doctorProfile" element={<><Navbar /><DoctorProfile /></>} />
          <Route path="/commonLogin" element={<><Navbar /><CommonLogin /></>} />
          <Route path="/doctorLogin" element={<><Navbar /><DoctorLogin setToken={setToken} /></>} />
          <Route path="/doctorSignUp" element={<><Navbar /><DoctorSignUp setToken={setToken} /></>} />
          
          <Route path="/doctor-dashboard" element={<DoctorDashboard setToken={setToken} removeToken={removeToken}/>} />
          <Route path="/doctor-registration" element={<DoctorRegistration />} />
          <Route path="/patient-history/:id" element={<PatientHistory />} />

          <Route element={<PrivateRoute token={token} />}>
            <Route path="/calendar" element={<><Navbar /><Calendar /></>} />
            <Route path="/medicalREcords" element={<><Navbar /><MedicalRecords /></>} />
            <Route path="/appointment" element={<><Navbar /><Appointment /></>} />
            <Route path="/addReview" element={<><Navbar /><AddReview /></>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
