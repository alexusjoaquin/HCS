// src/components/Modals/MedRecordUpdateModal/MedRecordUpdateModal.js
import React, { useState, useEffect } from 'react';

const MedRecordUpdateModal = ({ isOpen, onClose, onSave, medicalRecord }) => {
  const [formData, setFormData] = useState({
    RecordID: '',
    PatientID: '',
    DoctorID: '',
    Date: '',
    Diagnosis: '',
    Treatment: '',
    Notes: '',
  });

  useEffect(() => {
    if (isOpen && medicalRecord) {
      setFormData({
        RecordID: medicalRecord.RecordID || '',
        PatientID: medicalRecord.PatientID || '',
        DoctorID: medicalRecord.DoctorID || '',
        Date: medicalRecord.Date || '',
        Diagnosis: medicalRecord.Diagnosis || '',
        Treatment: medicalRecord.Treatment || '',
        Notes: medicalRecord.Notes || '',
      });
    } else {
      // Clear form data when the modal is closed
      setFormData({
        RecordID: '',
        PatientID: '',
        DoctorID: '',
        Date: '',
        Diagnosis: '',
        Treatment: '',
        Notes: '',
      });
    }
  }, [isOpen, medicalRecord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData); // Pass the updated data to the parent component
    // The form will be cleared via the useEffect hook when the modal closes
  };

  if (!isOpen || !medicalRecord) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>Update Medical Record</h2>
        <form onSubmit={handleSave}>
          <label>
            Record ID:
            <input
              type="text"
              name="RecordID"
              value={formData.RecordID}
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
            <button type="submit" style={modalStyles.saveButton}>
              Save
            </button>
            <button type="button" onClick={onClose} style={modalStyles.cancelButton}>
              Cancel
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
  saveButton: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '130px',
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  cancelButton: {
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

export default MedRecordUpdateModal;
