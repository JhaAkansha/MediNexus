import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal'; // For displaying appointment details
import axios from 'axios'; // To make HTTP requests
import './calendar.css'; // Your custom styles

Modal.setAppElement('#root'); // Required for react-modal to work

const AppointmentCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
  const [selectedAppointment, setSelectedAppointment] = useState(null); // To store selected appointment details
  const [appointments, setAppointments] = useState([]); // Store appointments fetched from backend

  const token = localStorage.getItem('token'); // Get the token from local storage or your global state

  // Fetch appointments when the component mounts
  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:5000/api/appointments/getUserAppointments', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token for authentication
          },
        })
        .then((response) => {
          setAppointments(response.data); // Set appointments to state
        })
        .catch((error) => {
          console.error('Error fetching appointments:', error);
        });
    } else {
      console.error('No token found, please log in');
    }
  }, [token]);

  // Function to handle date selection in the calendar
  const onDateChange = (newDate) => {
    setDate(newDate);

    // Find the selected appointment for the chosen date
    const selected = appointments.find(
      (appointment) => new Date(appointment.appointmentDate).toLocaleDateString() === newDate.toLocaleDateString()
    );

    if (selected) {
      setSelectedAppointment(selected); // Set the selected appointment to display in the modal
      setIsModalOpen(true); // Open the modal to show appointment details
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null); // Reset the selected appointment when the modal is closed
  };

  // Get all appointment dates for highlighting in the calendar
  const appointmentDates = appointments.map((appointment) =>
    new Date(appointment.appointmentDate).toLocaleDateString()
  );

  return (
    <div className="calendar">
      <div className="calendar-heading">Appointments Calendar</div>
      <div className="calendar-container">
        <Calendar
          onChange={onDateChange}
          value={date}
          tileClassName={({ date }) => {
            // Highlight dates with appointments
            const dateString = date.toLocaleDateString();
            if (appointmentDates.includes(dateString)) {
              return 'appointment-day'; // Add custom CSS class for highlighted days
            }
            return null;
          }}
        />
      </div>

      {/* Modal Popup to display appointment details */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Appointment Details"
        className="modal"
        overlayClassName="overlay"
      >
        <h3>Appointment Details</h3>
        <div>
          <p><strong>Name:</strong> {selectedAppointment?.name}</p>
          <p><strong>Phone:</strong> {selectedAppointment?.phoneNumber}</p>
          <p><strong>Time:</strong> {selectedAppointment?.preferredTime}</p>
          <p><strong>Doctor:</strong> {selectedAppointment?.doctor}</p>
        </div>
        <button onClick={closeModal} className="close-modal-btn">Close</button>
      </Modal>
    </div>
  );
};

export default AppointmentCalendar;
