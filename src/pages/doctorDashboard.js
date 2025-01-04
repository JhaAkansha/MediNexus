import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Modal from "react-modal"; // For displaying appointment details
import "./doctorDashboard.css";
import "./calendar.css"; // Custom styles for the calendar
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root"); // Required for react-modal to work

function DoctorDashboard() {
  const [editMode, setEditMode] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState({
    name: "",
    specialization: "",
  });
 
  const [appointments, setAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [patients, setPatients] = useState([]); // Dynamic patient list
  const navigate = useNavigate();


  useEffect(() => {
    const fetchDoctorDetails = async () => {
      const token = localStorage.getItem("authToken"); // Assuming token is stored
      try {
        const response = await fetch("http://localhost:3000/doctor/details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setDoctorDetails({
            name: data.name,
            specialization: data.specialization,
          });
        } else {
          console.error("Error fetching doctor details:", data.message);
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctorDetails();
  }, []);


// Fetch patients dynamically
  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await fetch("http://localhost:3000/doctor/patients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setPatients(data); // Populate patient list
        } else {
          console.error("Error fetching patients:", data.message);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []); // Runs only once when the component is mounted


  const handlePatientClick = (id) => {
    navigate(`/patient-history/${id}`); // Redirect to patient's history page
  };

  useEffect(() => {
    // Fetch appointments for the logged-in doctor
    const fetchAppointments = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await fetch("http://localhost:3000/appt/getDoctorAppointments", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setAppointments(data); // Set all appointments
          filterTodayAppointments(data); // Filter today's appointments
        } else {
          console.error("Error fetching appointments:", data.message);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const filterTodayAppointments = (appointments) => {
    const today = new Date().toLocaleDateString();
    const filtered = appointments.filter(
      (appointment) =>
        new Date(appointment.appointmentDate).toLocaleDateString() === today
    );
    setTodayAppointments(filtered);
  };

  const toggleEditMode = () => setEditMode(!editMode);
  const toggleCalendar = () => setCalendarVisible(!calendarVisible);
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const selected = appointments.find(
      (appt) =>
        new Date(appt.appointmentDate).toLocaleDateString() === date.toLocaleDateString()
    );
    if (selected) {
      setSelectedAppointment(selected);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="action-buttons">
          <button className="edit-button" onClick={toggleEditMode}>
            {editMode ? "Close Edit" : "Edit Information"}
          </button>
          <button className="calendar-button" onClick={toggleCalendar}>
            {calendarVisible ? "Close Calendar" : "View Calendar"}
          </button>
        </div>
      </header>

      {editMode && (
        <div className="edit-section">
          <h4>Edit Information</h4>
          <form>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={doctorDetails.name}
              onChange={(e) =>
                setDoctorDetails({ ...doctorDetails, name: e.target.value })
              }
              placeholder="Enter your name"
            />
            
            <label htmlFor="specialization">Specialization:</label>
            <input
              type="text"
              id="specialization"
              value={doctorDetails.specialization}
              onChange={(e) =>
                setDoctorDetails({
                  ...doctorDetails,
                  specialization: e.target.value,
                })
              }
              placeholder="Enter specialization"
            />
            <button
              type="button"
              className="save-button"
              onClick={() => setEditMode(false)}
            >
              Save
            </button>
          </form>
        </div>
      )}

      {calendarVisible && (
        <div className="calendar-section">
          <h4>Appointments Calendar</h4>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={({ date }) =>
              appointments.some(
                (appt) =>
                  new Date(appt.appointmentDate).toLocaleDateString() ===
                  date.toLocaleDateString()
              )
                ? "appointment-day"
                : null
            }
          />
        </div>
      )}



      {/* Doctor Information */}
      <div className="doctor-info">
        <h3>{doctorDetails.name || "Loading..."}</h3>
        <p className="specialization">
          Specialization: {doctorDetails.specialization || "Loading..."}
        </p>
      </div>

      <div className="main-content">
        {/* Patients Section */}
        <div className="patients-section">
          <h4>Patients</h4>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <div
                key={patient._id}
                className="patient-box"
                onClick={() => handlePatientClick(patient._id)}
              >
                {patient.name}
              </div>
            ))
          ) : (
            <p>No patients found.</p>
          )}
        </div>
      </div>



      <div className="main-content">
        <div className="appointments-section">
          <h4>Today's Appointments</h4>
          <div className="content-box">
            {todayAppointments.length > 0 ? (
              todayAppointments.map((appt) => (
                <div key={appt._id} className="appointment-box">
                  <p>
                    <strong>Name:</strong> {appt.name}
                  </p>
                  <p>
                    <strong>Time:</strong> {appt.preferredTime}
                  </p>
                  <p>
                    <strong>Doctor:</strong> {appt.doctor}
                  </p>
                </div>
              ))
            ) : (
              <p>No appointments today.</p>
            )}
          </div>
        </div>
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
          <p><strong>Doctor:</strong> {selectedAppointment?.doctor}</p>
        </div>
        <button onClick={closeModal} className="close-modal-btn">Close</button>
      </Modal>
    </div>
  );
}

export default DoctorDashboard;
