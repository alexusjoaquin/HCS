// src/components/Modals/MedRecordModal/MedRecordModal.js
import React, { useState, useEffect } from 'react';

const MedRecordModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    FullName: '',
    Address: '',
    DoctorID: '',
    Date: '',
    Diagnosis: '',
    Treatment: '',
    Notes: '',
  });

  useEffect(() => {
    if (!isOpen) {
      // Clear form data when the modal is closed
      setFormData({
        FullName: '',
        Address: '',
        DoctorID: '',
        Date: '',
        Diagnosis: '',
        Treatment: '',
        Notes: '',
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // The form will be cleared via the useEffect hook when the modal closes
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>New Medical Record</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input
              type="text"
              name="FullName"
              value={formData.FullName}
              onChange={handleChange}
              placeholder="Enter Full Name"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              placeholder="Enter Address"
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
            Diagnosis:
            <input
              type="text"
              name="Diagnosis"
              value={formData.Diagnosis}
              onChange={handleChange}
              placeholder="Enter Diagnosis"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Treatment:
            <input
              type="text"
              name="Treatment"
              value={formData.Treatment}
              onChange={handleChange}
              placeholder="Enter Treatment"
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
              placeholder="Enter any additional notes"
              required
              style={{ ...modalStyles.input, height: '80px', resize: 'vertical' }}
            />
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
    width: '500px',
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

export default MedRecordModal;
