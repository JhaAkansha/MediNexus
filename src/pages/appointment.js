import React, { useState } from 'react';
import './appointment.css';

function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    doctor: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, such as sending data to the backend or displaying an alert
    alert('Appointment request submitted successfully!');
    console.log(formData);
  };

  return (
    <div className="form-container">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        
        <label>Phone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        
        <label>Appointment Date:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        
        <label>Preferred Time:</label>
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        
        <label>Doctor:</label>
        <select name="doctor" value={formData.doctor} onChange={handleChange} required>
          <option value="">Select Doctor</option>
          <option value="Dr. Smith">Dr. Smith</option>
          <option value="Dr. Johnson">Dr. Johnson</option>
          <option value="Dr. Lee">Dr. Lee</option>
        </select>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Appointment;
