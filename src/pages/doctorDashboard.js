import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Modal from "react-modal";
// import "./doctorDashboard.css";
import "./calendar.css";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");
function DoctorDashboard({ setToken, removeToken }) {
  const [editMode, setEditMode] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState({
    name: "",
    speciality: "",
  });
 
  const [appointments, setAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/doctorLogin');
  };

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await fetch("http://localhost:3000/doc/details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setDoctorDetails({
            name: data[0].name,
            speciality: data[0].speciality,
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

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await fetch("http://localhost:3000/doc/patients", {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setPatients(data);
        } else {
          console.error("Error fetching patients:", data.message);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handlePatientClick = (id) => {
    navigate(`/patient-history/${id}`);
  };

  useEffect(() => {
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
          setAppointments(data);
          filterTodayAppointments(data);
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

const closeModal = () => {
  setIsModalOpen(false);
  setSelectedAppointment(null);
};

  return (
    <div className="dashboard">
      <button className="doc-log-out" onClick={handleLogout}>Log Out</button>
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
              value={doctorDetails.speciality}
              onChange={(e) =>
                setDoctorDetails({
                  ...doctorDetails,
                  speciality: e.target.value,
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

      <div className="doctor-info">
        <h3>{doctorDetails.name || "Loading..."}</h3>
        <p className="specialization">
          Specialization: {doctorDetails.speciality || "Loading..."}
        </p>
      </div>

      <div className="main-content">
        <div className="patients-section">
          <h4>Patients</h4>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <div
                key={patient._id}
                className="patient-box"
                onClick={() => handlePatientClick(patient.userId)}
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
        </div>
        <button onClick={closeModal} className="close-modal-btn">Close</button>
      </Modal>
    </div>
  );
}

export default DoctorDashboard;