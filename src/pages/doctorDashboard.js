import React, { useState } from "react";
import "./doctorDashboard.css";
import { useNavigate } from "react-router-dom";

function DoctorDashboard() {
  const [appointmentTab, setAppointmentTab] = useState("Today");
  const [operationTab, setOperationTab] = useState("Today");
  const [editMode, setEditMode] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  
  const navigate = useNavigate();

  // Mock patient data
  const patients = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Emily Davis" },
  ];

  const handlePatientClick = (id) => {
    navigate(`/patient-history/${id}`); // Redirect to patient's history page
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

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

      {/* Edit Section */}
      {editMode && (
        <div className="edit-section">
          <h4>Edit Information</h4>
          <form>
            <label htmlFor="leave-reason">Reason for Leave:</label>
            <input type="text" id="leave-reason" placeholder="Enter reason" />

            <label htmlFor="leave-date">Leave Date:</label>
            <input type="date" id="leave-date" />

            <button type="submit" className="save-button">
              Save
            </button>
          </form>
        </div>
      )}

      {/* Calendar Section */}
      {calendarVisible && (
        <div className="calendar-section">
          <h4>Calendar</h4>
          <p>[Calendar Placeholder]</p>
        </div>
      )}

      <div className="welcome-section">
        <h3>Hi Dr. Name!</h3>
        <p>Welcome back</p>
        <div className="quick-stats">
          <div className="stat">
            <div className="icon">📅</div>
            <div className="details">
              <h4>My Appointments</h4>
              <p>12</p>
            </div>
          </div>
          <div className="stat">
            <div className="icon">👤</div>
            <div className="details">
              <h4>My Patients</h4>
              <p>23</p>
            </div>
          </div>
          <div className="stat">
            <div className="icon">🩺</div>
            <div className="details">
              <h4>My Operations</h4>
              <p>02</p>
            </div>
          </div>
          <div className="stat">
            <div className="icon">📄</div>
            <div className="details">
              <h4>My Leaves</h4>
              <p>03</p>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content">
        {/* Appointments Section */}
        <div className="appointments-section">
          <h4>Appointments</h4>
          <div className="tabs">
            <span
              className={appointmentTab === "Today" ? "active" : ""}
              onClick={() => setAppointmentTab("Today")}
            >
              Today's
            </span>
            <span
              className={appointmentTab === "Upcoming" ? "active" : ""}
              onClick={() => setAppointmentTab("Upcoming")}
            >
              Upcoming
            </span>
            <span
              className={appointmentTab === "Completed" ? "active" : ""}
              onClick={() => setAppointmentTab("Completed")}
            >
              Completed
            </span>
          </div>
          <div className="content-box">
            {appointmentTab === "Today" && <p>No appointments today.</p>}
            {appointmentTab === "Upcoming" && (
              <p>Upcoming appointments will appear here.</p>
            )}
            {appointmentTab === "Completed" && (
              <p>Completed appointments will appear here.</p>
            )}
          </div>
        </div>

        {/* Operations Section */}
        <div className="operations-section">
          <h4>Operations</h4>
          <div className="tabs">
            <span
              className={operationTab === "Today" ? "active" : ""}
              onClick={() => setOperationTab("Today")}
            >
              Today's
            </span>
            <span
              className={operationTab === "Upcoming" ? "active" : ""}
              onClick={() => setOperationTab("Upcoming")}
            >
              Upcoming
            </span>
            <span
              className={operationTab === "Completed" ? "active" : ""}
              onClick={() => setOperationTab("Completed")}
            >
              Completed
            </span>
          </div>
          <div className="content-box">
            {operationTab === "Today" && <p>No operations today.</p>}
            {operationTab === "Upcoming" && (
              <p>Upcoming operations will appear here.</p>
            )}
            {operationTab === "Completed" && (
              <p>Completed operations will appear here.</p>
            )}
          </div>
        </div>

        {/* Patients Section */}
        <div className="patients-section">
          <h4>Patients</h4>
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="patient-box"
              onClick={() => handlePatientClick(patient.id)}
            >
              {patient.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
