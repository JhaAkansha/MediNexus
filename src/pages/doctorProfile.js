import './doctorProfile.css'; // Import your CSS file
import doctor1 from '../doctor1.jpeg';
import doctor2 from '../doctor2.jpeg';
import doctor3 from '../doctor3.jpeg';
import React, { useState, useEffect } from 'react';


function DoctorProfile() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                // Make a GET request to your backend to fetch all doctors
                const response = await fetch('http://localhost:3000/doc/getAll');
                
                // Check if response is okay
                if (!response.ok) {
                    throw new Error('Failed to fetch doctors');
                }
                
                const data = await response.json(); // Parse the JSON data
                
                // Set the doctor data in the state
                setDoctors(data);
            } catch (err) {
                // Handle errors and set error state
                setError(err.message);
            }
        };

        fetchDoctors();
    }, []);

    if (error) {
        return <div>Error: {error}</div>; // Display error message if something goes wrong
    }


  return (
    <div className="DoctorProfile">
      <h2 className = 'doctor-prof-heading'>Meet Our Doctors</h2>
      <div className="doctor-container">
        {doctors.map(doctor => (
          <div key={doctor._id} className="doctor-card">
            <img src={doctor1} alt={`${doctor.name}`} className="doctor-photo" />
            <div className="doctor-info">
              <h3>{doctor.name}</h3>
              <p className="specialization">{doctor.specialization}</p>
              <p className="about">{doctor.description}</p>
              <a href="/appointment" className="appointment-button">Book Appointment</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorProfile;