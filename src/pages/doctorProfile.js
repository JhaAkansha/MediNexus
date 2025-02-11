import './doctorProfile.css';
import React, { useState, useEffect } from 'react';


function DoctorProfile() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:3000/doc/getAll');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch doctors');
                }
                
                const data = await response.json();
                
                setDoctors(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchDoctors();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

  return (
    <div className="DoctorProfile">
      <h2 className = 'doctor-prof-heading'>Meet Our Doctors</h2>
      <div className="doctor-container">
        {doctors.map(doctor => (
          <div key={doctor._id} className="doctor-card">
            {console.log(`http://localhost:3000/${doctor.image}`)          }
            <img src={`http://localhost:3000/${doctor.image}`} alt={`${doctor.name}`} className="doctor-photo" />
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