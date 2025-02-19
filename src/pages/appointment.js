import React, { useState, useEffect } from 'react';
import './appointment.css';
import { jwtDecode } from 'jwt-decode';

function Appointment() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    doctor: '',
  });

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

    const dataToServer = {
        name: formData.name,
        phoneNumber: formData.phone,
        appointmentDate: formData.date,
        preferredTime: formData.time,
        doctor: formData.doctor,
        userId: userId,
    };

    try {
        const response = await fetch('http://localhost:3000/appt/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToServer),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Appointment booked successfully!');
            setFormData({
                name: '',
                phone: '',
                date: '',
                time: '',
                doctor: '',
            });
        } else {
            alert(data.message || 'Failed to book the appointment. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong, please try again.');
    }
};


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:3000/appt/getAll');
        const data = await response.json();

        if (response.ok) {
          setDoctors(data);
        } else {
          console.error('Error fetching doctors:', data.message);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM',
  ];

  return (
    <div className='appointment'>
      <div className="form-container">
        <h2 className='appointment-heading'>Book an Appointment</h2>
        <form className='inside-form' onSubmit={handleSubmit}>
          <label>Full Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} required />

          <label>Phone:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

          <label>Appointment Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />

          <label>Preferred Time:</label>
          <select name="time" value={formData.time} onChange={handleChange} required>
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>

          <label>Doctor:</label>
          <select name="doctor" value={formData.doctor} onChange={handleChange} required>
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
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