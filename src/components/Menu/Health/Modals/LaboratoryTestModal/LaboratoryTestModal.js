// LaboratoryTestModal.js

import React from 'react';

const LaboratoryTestModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    PatientID: '',
    DoctorID: '',
    TestName: '',
    TestDate: '',
    Results: '',
    Notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({
      PatientID: '',
      DoctorID: '',
      TestName: '',
      TestDate: '',
      Results: '',
      Notes: '',
    }); // Reset form after submission
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>New Laboratory Test</h2>
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
            Test Name:
            <input
              type="text"
              name="TestName"
              value={formData.TestName}
              onChange={handleChange}
              placeholder="Enter Test Name"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Test Date:
            <input
              type="date"
              name="TestDate"
              value={formData.TestDate}
              onChange={handleChange}
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Results:
            <input
              type="text"
              name="Results"
              value={formData.Results}
              onChange={handleChange}
              placeholder="Enter Results"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Notes:
            <textarea
              name="Notes"
              value={formData.Notes}
              onChange={handleChange}
              placeholder="Enter Notes"
              style={modalStyles.textarea}
            />
          </label>
          <div style={modalStyles.buttonContainer}>
            <button type="submit" style={modalStyles.submitButton}>Submit</button>
            <button type="button" onClick={onClose} style={modalStyles.closeButton}>Close</button>
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
    zIndex: 1000, // Ensure the modal is above other elements
  },
  content: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '500px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxHeight: '90vh',
    overflowY: 'auto', // Handle overflow for smaller screens
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'block',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'block',
    height: '80px',
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
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  closeButton: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    backgroundColor: '#f44336',
    color: 'white',
  },
};

export default LaboratoryTestModal;
