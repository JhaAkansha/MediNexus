import { useState } from 'react';
import './addReview.css';

function AddReview() {

  const [formData, setFormData] = useState ({
    dcotor: '',
    experience:'',
  });

  const handleChange = (e) => {
    setFormData(...formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get form data
    const reviewerName = document.getElementById('reviewerName').value;
    const doctorName = document.getElementById('doctorName').value;

    // Validate form inputs (add your validation logic here)
    if (!reviewerName|| !doctorName) {
      alert('Please fill in all fields.');
      return;
    }
  };

  return (
      <div className="review-container">
        <h2 className='review-heading'>Let us know about your experience!</h2>
        <form className="reviewForm" onSubmit={handleSubmit}>
          <label>Who treated you?</label>
          <select name="doctor" value={formData.doctor} onChange={handleChange} required>
            <option value="">Select Doctor</option>
            <option value="Dr. John Doe">Dr. John Doe</option>
            <option value="Dr. Jane Smith">Dr. Jane Smith</option>
            <option value="Dr. Michael Lee">Dr. Michael Lee</option>
          </select>
          <label>How satisfied were you with the service?</label>
          <label>How was your experience with the doctor?</label>
        </form>
      </div>
  );
}

export default AddReview;
