import React, { useState } from "react";
import "./doctorDashboard.css";
import { useNavigate } from "react-router-dom";

function DoctorDashboard() {
  const [editMode, setEditMode] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [doctorName, setDoctorName] = useState("Dr. John Doe");
  const [bio, setBio] = useState(
    "Experienced Cardiologist specializing in heart health."
  );
  const [specialization, setSpecialization] = useState("Cardiology");

  const navigate = useNavigate();

  // Mock patient data
  const patients = [
    { id: 1, name: "Akanksha Jha" },
    { id: 2, name: "Ishita Shete" },
    { id: 3, name: "Riya Chiraniya" },
    { id: 4, name: "Gayatri Sadaphal" },
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

  const handleSave = () => {
    setEditMode(false); // Save changes and close edit mode
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
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              placeholder="Enter your name"
            />

            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter your bio"
            ></textarea>

            <label htmlFor="specialization">Specialization:</label>
            <input
              type="text"
              id="specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="Enter specialization"
            />

            <button
              type="button"
              className="save-button"
              onClick={handleSave}
            >
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

      {/* Doctor Information */}
      <div className="doctor-info">
        <h3>{doctorName}</h3>
        <p className="bio">Bio: {bio}</p>
        <p className="specialization">Specialization: {specialization}</p>
      </div>

      <div className="main-content">
        {/* Appointments Section */}
        <div className="appointments-section">
          <h4>Appointments</h4>
          <div className="content-box">
            <p>No appointments today.</p>
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
