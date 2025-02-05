import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import './calendar.css';

Modal.setAppElement('#root');

const AppointmentCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [doctorName, setDoctorName] = useState('');


  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log("sent token: ", token);
        if (!token) {
          console.error('No token found, please log in');
          return;
        }
  
        const response = await fetch('http://localhost:3000/appt/getUserAppointments', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setAppointments(data);
        } else {
          console.error('Error fetching appointments', data.message);
        }
      } catch (error) {
        console.error('Error fetching appointment:', error);
      }
    };
  
    fetchAppointment();
  }, []);
  

  const onDateChange = (newDate) => {
    setDate(newDate);

    const selected = appointments.find(
      (appointment) => new Date(appointment.appointmentDate).toLocaleDateString() === newDate.toLocaleDateString()
    );

    if (selected) {
      setSelectedAppointment(selected);
      fetchDoctorName(selected.doctor); 
      setIsModalOpen(true);
    }
  };

  const fetchDoctorName = async (doctorId) => {
    try {
      const response = await fetch(`http://localhost:3000/doc/get/${doctorId}`, {
        method: 'GET',
      });

      const data = await response.json();
      if (response.ok) {
        setDoctorName(data.name);
      } else {
        console.error('Error fetching doctor details', data.message);
      }
    } catch (error) {
      console.error('Error fetching doctor name:', error);
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
    setDoctorName(''); 
  };

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
           const updatedAppointments = appointments.filter(
            (appointment) => appointment._id !== id
        );
        setAppointments(updatedAppointments);

          setIsModalOpen(false);
          setSelectedAppointment(null);
          setDoctorName('');
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
            const dateString = date.toLocaleDateString();
            if (appointmentDates.includes(dateString)) {
              return 'appointment-day';
            }
            return null;
          }}
        />
      </div>

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
          <p><strong>Doctor:</strong> {doctorName}</p>
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
