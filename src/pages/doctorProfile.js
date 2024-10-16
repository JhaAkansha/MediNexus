import './doctorProfile.css'; // Import your CSS file
import doctor1 from '../doctor1.jpeg';
import doctor2 from '../doctor2.jpeg';
import doctor3 from '../doctor3.jpeg';
//import Appointment from './appointment';

const doctors = [ // Array of doctor objects
  {
    name: "Dr. John Doe",
    specialization: "Cardiology",
    about: "Dr. John Doe is a renowned cardiologist with over 15 years of experience. He specializes in...",
    photo: doctor1, // Replace with actual image path
  },
  {
    name: "Dr. Jane Smith",
    specialization: "Dermatology",
    about: "Dr. Jane Smith is a board-certified dermatologist specializing in...",
    photo: doctor2, // Replace with actual image path
  },
  {
    name: "Dr. Michael Lee",
    specialization: "Neurology",
    about: "Dr. Michael Lee is a highly experienced neurologist with expertise in...",
    photo: doctor3, // Replace with actual image path
  },
];

function DoctorProfile() {
  return (
    <div className="DoctorProfile">
      <h2>Meet Our Doctors</h2>
      <div className="doctor-container">
        {doctors.map((doctor, index) => (
          <div key={index} className="doctor-card">
            <img src={doctor.photo} alt={`${doctor.name}`} className="doctor-photo" />
            <div className="doctor-info">
              <h3>{doctor.name}</h3>
              <p className="specialization">{doctor.specialization}</p>
              <p className="about">{doctor.about}</p>
              <a href="/appointment" className="appointment-button">Book Appointment</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorProfile;