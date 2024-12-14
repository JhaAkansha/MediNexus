import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css'; // Custom CSS for layout fixes

function CalendarView() {
  const [appointments, setAppointments] = useState([]); // State to store appointments
  const email = "user@example.com"; // Replace with dynamic logged-in user email
  const localizer = momentLocalizer(moment);

  // Fetch appointments from the database
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Fetch appointments from the backend using the '/getAll' endpoint
        const response = await fetch('http://localhost:3000/appointments/getAll');
        const data = await response.json();

        // Format data for the Calendar component
        const formattedAppointments = data.map((appt) => ({
          id: appt._id,
          title: appt.name, // Only display patient's name
          start: new Date(appt.appointmentDate + 'T' + appt.preferredTime),
          end: moment(new Date(appt.appointmentDate + 'T' + appt.preferredTime)).add(1, 'hours').toDate(), // 1 hour duration
          doctor: appt.doctor, // Include doctor in event data
          appointmentDate: appt.appointmentDate,
          preferredTime: appt.preferredTime
        }));

        setAppointments(formattedAppointments); // Update state with formatted appointments
      } catch (error) {
        console.error('Error:', error);
        alert('Error fetching appointments');
      }
    };

    fetchAppointments(); // Fetch appointments when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  const handleSelectEvent = (event) => {
    alert(`Appointment Details: \n
    Name: ${event.title}\n
    Doctor: ${event.doctor}\n
    Date: ${event.appointmentDate}\n
    Time: ${event.preferredTime}`);
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-heading">Your Appointments</h2>
      <div className="calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%', width: '100%' }}
          onSelectEvent={handleSelectEvent}
          views={['month']} // Only show the 'Month' view
          eventPropGetter={(event) => ({
            title: event.title, // Only display patient's name as the event title
            tooltip: `${event.doctor} appointment on ${event.appointmentDate} at ${event.preferredTime}`
          })}
        />
      </div>
    </div>
  );
}

export default CalendarView;
