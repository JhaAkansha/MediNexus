import './addReview.css';

function AddReview() {

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
        <form id="reviewForm" onSubmit={handleSubmit}>
            
        </form>
      </div>
  );
}

export default AddReview;
