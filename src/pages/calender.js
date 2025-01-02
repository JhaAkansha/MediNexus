import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal'; // For displaying appointment details
import './calendar.css'; // Your custom styles

Modal.setAppElement('#root'); // Required for react-modal to work

const AppointmentCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
  const [selectedAppointment, setSelectedAppointment] = useState(null); // To store selected appointment details
  const [appointments, setAppointments] = useState([]); // Store appointments fetched from backend


  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Get the token from localStorage
        console.log("sent token: ", token);
        if (!token) {
          console.error('No token found, please log in');
          return; // Exit if there's no token
        }
  
        const response = await fetch('http://localhost:3000/appt/getUserAppointments', {
          method: 'GET', // Method for fetching appointments
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in the Authorization header
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setAppointments(data); // Set appointments to state
        } else {
          console.error('Error fetching appointments', data.message);
        }
      } catch (error) {
        console.error('Error fetching appointment:', error);
      }
    };
  
    fetchAppointment(); // Call the fetch function
  }, []);
  

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

  async function cancelAppointment() {
    const id = selectedAppointment?._id;
    console.log("appointment id = ", id);
    try {
        const response = await fetch(`http://localhost:3000/appt/delete/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
           // Remove the canceled appointment from the appointments array
           const updatedAppointments = appointments.filter(
            (appointment) => appointment._id !== id
        );
        setAppointments(updatedAppointments); // Update the appointments state

          setIsModalOpen(false);
          setSelectedAppointment(null);
        } else {
            throw new Error('Failed to delete the document');
        }
    } catch (error) {
        console.error('Error deleting document:', error.message);
    }
}

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
        <div className='appt-btns'>
          <button className='cancel-appt' onClick={cancelAppointment}>Cancel Appointment</button>
          <button onClick={closeModal} className="close-modal-btn">Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default AppointmentCalendar;
