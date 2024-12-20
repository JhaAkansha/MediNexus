import React, { useState} from 'react';
import './appointment.css';

function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    doctor:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Get Form data
    const dataToServer = {
      name: formData.name,
      phoneNumber: formData.phone,
      appointmentDate: formData.date,
      preferredTime: formData.time,
      doctor: formData.doctor
    }

    try {
      //Making POST request to the backend
      const response = await fetch ('http://localhost:3000/appt/post',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToServer),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Appointment booked!');
      }
      else {
        alert(data.message || 'Sorry the request did not go through');
      }
    }
    catch (error) {
      console.error('Error:', error);
      alert('Something went wrong, please try again');
    }
  };

  return (
    <div className='appointment'>
    <div className="form-container">
      <h2 className='appointment-heading'>Book an Appointment</h2>
      <form className='inside-form' onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        
        <label>Phone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        
        <label>Appointment Date:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        
        <label>Preferred Time:</label>
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        
        <label>Doctor:</label>
        <select name="doctor" value={formData.doctor} onChange={handleChange} required>
          <option value="">Select Doctor</option>
          <option value="Dr. John Doe">Dr. John Doe</option>
          <option value="Dr. Jane Smith">Dr. Jane Smith</option>
          <option value="Dr. Michael Lee">Dr. Michael Lee</option>
        </select>
        
        <button className= 'submit-button' type="submit" onClick={handleSubmit}>Submit</button>
      </form>
      </div>
    </div>
  );
}

export default Appointment;
