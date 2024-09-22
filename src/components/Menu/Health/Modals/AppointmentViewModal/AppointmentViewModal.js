// src/components/Modals/AppointmentViewModal/AppointmentViewModal.js
import React from 'react';

const AppointmentViewModal = ({ isOpen, onClose, appointment }) => {
  if (!isOpen || !appointment) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <span style={modalStyles.close} onClick={onClose}>
          &times;
        </span>
        <h2>Appointment Details</h2>
        <div style={{ marginTop: '10px' }}>
          <label style={modalStyles.label}>
            Appointment ID:
            <input
              type="text"
              value={appointment.AppointmentID}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Patient ID:
            <input
              type="text"
              value={appointment.PatientID}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Doctor ID:
            <input
              type="text"
              value={appointment.DoctorID}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Date:
            <input
              type="text"
              value={appointment.Date}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Time:
            <input
              type="text"
              value={appointment.Time}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Reason:
            <input
              type="text"
              value={appointment.Reason}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Status:
            <input
              type="text"
              value={appointment.Status}
              readOnly
              style={modalStyles.input}
            />
          </label>
        </div>
        <button style={modalStyles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const modalStyles = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000, // Ensures the modal is on top
  },
  content: {
    background: 'white',
    padding: '20px',
    borderRadius: '5px',
    width: '400px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  close: {
    cursor: 'pointer',
    position: 'absolute',
    top: '10px',
    right: '20px',
    fontSize: '1.5em',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  closeButton: {
    marginTop: '20px',
    padding: '10px',
    cursor: 'pointer',
    width: '100%',
    backgroundColor: '#f44336',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
  },
};

export default AppointmentViewModal;
