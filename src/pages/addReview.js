import { useState } from 'react';
import './addReview.css';

function AddReview() {

  const [formData, setFormData] = useState ({
    name: '',
    doctor: '',
    experience:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, such as sending data to the backend or displaying an alert
    alert('Thank you for your review!');
    console.log(formData);
  };

  return (
      <div className="review-container">
        <div className='review-form'>
        <h2 className='review-heading'>Let us know about your experience!</h2>
        <form className="reviewForm" onSubmit={handleSubmit}>
        <label>What do you want your name to appear as?</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <label>Who treated you?</label>
          <select name="doctor" className= 'doctor-select'value={formData.doctor} onChange={handleChange} required>
            <option value="">Select Doctor</option>
            <option value="Dr. John Doe">Dr. John Doe</option>
            <option value="Dr. Jane Smith">Dr. Jane Smith</option>
            <option value="Dr. Michael Lee">Dr. Michael Lee</option>
          </select>
          <label>How satisfied were you with the service?</label>
          <label>How was your experience with the doctor?</label>
          <button className= 'submit-button' type="submit">Submit</button>
        </form>
        </div>
      </div>
  );
}

export default AddReview;
