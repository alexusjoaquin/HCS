// src/components/Modals/ResidentViewModal/ResidentViewModal.js
import React from 'react';

const ResidentViewModal = ({ isOpen, onClose, resident }) => {
  if (!isOpen || !resident) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <span style={modalStyles.close} onClick={onClose}>
          &times;
        </span>
        <h2>Resident Details</h2>
        <div style={{ marginTop: '10px' }}>
          <label style={modalStyles.label}>
            Name:
            <input
              type="text"
              value={resident.Name}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Age:
            <input
              type="text"
              value={resident.Age}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Birthday:
            <input
              type="text"
              value={resident.Birthday}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Address:
            <input
              type="text"
              value={resident.Address}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Gender:
            <input
              type="text"
              value={resident.Gender}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Status:
            <input
              type="text"
              value={resident.Status}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            BMI:
            <input
              type="text"
              value={resident.BMI}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Height:
            <input
              type="text"
              value={resident.Height}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Weight:
            <input
              type="text"
              value={resident.Weight}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Blood Type:
            <input
              type="text"
              value={resident.BloodType}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Is Senior:
            <input
              type="text"
              value={resident.IsSenior ? 'Yes' : 'No'}
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

export default ResidentViewModal;
