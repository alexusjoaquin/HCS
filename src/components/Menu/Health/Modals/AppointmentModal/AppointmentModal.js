// src/components/Modals/AppointmentModal/AppointmentModal.js
import React from 'react';

const AppointmentModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    PatientID: '',
    DoctorID: '',
    Date: '',
    Time: '',
    Reason: '',
    Status: 'Scheduled', // Default status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form after submission if desired
    setFormData({
      PatientID: '',
      DoctorID: '',
      Date: '',
      Time: '',
      Reason: '',
      Status: 'Scheduled',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>New Appointment</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Patient ID:
            <input
              type="text"
              name="PatientID"
              value={formData.PatientID}
              onChange={handleChange}
              placeholder="Enter Patient ID"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Doctor ID:
            <input
              type="text"
              name="DoctorID"
              value={formData.DoctorID}
              onChange={handleChange}
              placeholder="Enter Doctor ID"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="Date"
              value={formData.Date}
              onChange={handleChange}
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              name="Time"
              value={formData.Time}
              onChange={handleChange}
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Reason:
            <input
              type="text"
              name="Reason"
              value={formData.Reason}
              onChange={handleChange}
              placeholder="Enter Reason for Appointment"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Status:
            <select
              name="Status"
              value={formData.Status}
              onChange={handleChange}
              required
              style={modalStyles.input}
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </label>
          <div style={modalStyles.buttonContainer}>
            <button type="submit" style={modalStyles.submitButton}>
              Submit
            </button>
            <button type="button" onClick={onClose} style={modalStyles.closeButton}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensures the modal is on top
  },
  content: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'block',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  submitButton: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '130px',
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  closeButton: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '130px',
    backgroundColor: '#f44336',
    color: 'white',
  },
};

export default AppointmentModal;
