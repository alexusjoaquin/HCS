// LaboratoryTestUpdateModal.js

import React, { useEffect } from 'react';

const LaboratoryTestUpdateModal = ({ isOpen, onClose, onSave, test }) => {
  const [formData, setFormData] = React.useState({
    TestID: '',
    PatientID: '',
    DoctorID: '',
    TestName: '',
    TestDate: '',
    Results: '',
    Notes: '',
  });

  useEffect(() => {
    if (test) {
      setFormData({
        TestID: test.TestID || '',
        PatientID: test.PatientID || '',
        DoctorID: test.DoctorID || '',
        TestName: test.TestName || '',
        TestDate: test.TestDate || '',
        Results: test.Results || '',
        Notes: test.Notes || '',
      });
    }
  }, [test]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Prevent changing TestID
    if (name === 'TestID') return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>Update Laboratory Test</h2>
        <form onSubmit={handleSave}>
          <label>
            Test ID:
            <input
              type="text"
              name="TestID"
              value={formData.TestID}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label>
            Patient ID:
            <input
              type="text"
              name="PatientID"
              value={formData.PatientID}
              onChange={handleChange}
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
              style={modalStyles.textarea}
            />
          </label>
          <div style={modalStyles.buttonContainer}>
            <button type="submit" style={modalStyles.submitButton}>Save</button>
            <button type="button" onClick={onClose} style={modalStyles.closeButton}>Cancel</button>
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
    zIndex: 1000, // Ensure it overlays other elements
  },
  content: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '500px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'block',
    backgroundColor: '#f9f9f9', // Slight background to indicate read-only
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

export default LaboratoryTestUpdateModal;
