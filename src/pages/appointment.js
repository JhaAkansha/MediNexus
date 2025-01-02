import React, { useState, useEffect } from 'react';
import './appointment.css';
import {jwtDecode} from 'jwt-decode';

function Appointment() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    doctor: '',
  });

  // Fetching the userId from localStorage (or sessionStorage) where the token is stored after login
  //const userId = localStorage.getItem('authToken'); // Retrieve the userId after user login (you can extract this from the JWT token)
  const token = localStorage.getItem('authToken');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userId;
  console.log(userId);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get Form data
    const dataToServer = {
      name: formData.name,
      phoneNumber: formData.phone,
      appointmentDate: formData.date,
      preferredTime: formData.time,
      doctor: formData.doctor,
      userId: userId, // Attach the userId to the request
    };

    try {
      // Making POST request to the backend
      const response = await fetch('http://localhost:3000/appt/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToServer),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Appointment booked!');
      } else {
        alert(data.message || 'Sorry, the request did not go through');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong, please try again');
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:3000/appt/getAll'); // Adjust your API URL
        const data = await response.json();

        if (response.ok) {
          setDoctors(data); // Set the doctors state with the fetched doctors
        } else {
          console.error('Error fetching doctors:', data.message);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors(); // Call the fetch function
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:3000/appt/getAll'); // Adjust your API URL
        const data = await response.json();

        if (response.ok) {
          setDoctors(data); // Set the doctors state with the fetched doctors
        } else {
          console.error('Error fetching doctors:', data.message);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors(); // Call the fetch function
  }, []);

  return (
    <div className='appointment'>
      <div className="form-container">
        <h2 className='appointment-heading'>Book an Appointment</h2>
        <form className='inside-form' onSubmit={handleSubmit}>
          <label>Full Name:</label>
          <input  name="name" value={formData.name} onChange={handleChange} required />

          <label>Phone:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

          <label>Appointment Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />

          <label>Preferred Time:</label>
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />

          <label>Doctor:</label>
          <select name="doctor" value={formData.doctor} onChange={handleChange} required>
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor.name}>
                {doctor.name}
              </option>
            ))}
          </select>

          <button className='submit-button' type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Appointment;
