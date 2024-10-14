import './testimonial.css'
import patient1 from '../patient1.jpg';
import patient2 from '../patient2.jpg';
import patient3 from '../patient3.jpg';


function Testimonial() {
  const testimonials = [
    {
      name: "Amanda Lee",
      review: "The service was excellent, and Dr. Smith was very attentive!",
      photo: patient1,
    },
    {
      name: "John Smith",
      review: "Booking an appointment was so easy and convenient. Highly recommended!",
      photo: patient2,
    },
    {
      name: "Wendy Johnson",
      review: "The staff was friendly, and the doctor was very knowledgeable.",
      photo: patient3,
    },
  ];


  return (
    <div className="Testimonial">
      <h2 className='heading'>What Our Patients Say</h2>
      <div className="testimonial-container">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <img src={testimonial.photo} alt={`${testimonial.name}`} className="testimonial-photo" />
            <h3 className="testimonial-name">{testimonial.name}</h3>
            <p className="testimonial-review">"{testimonial.review}"</p>
          </div>
        ))}
      </div>
    </div>
  );

}
export default Testimonial;


