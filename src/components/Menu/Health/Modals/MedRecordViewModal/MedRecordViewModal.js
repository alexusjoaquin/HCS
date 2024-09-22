// src/components/Modals/MedRecordViewModal/MedRecordViewModal.js
import React from 'react';

const MedRecordViewModal = ({ isOpen, onClose, medicalRecord }) => {
    if (!isOpen || !medicalRecord) return null;

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.content}>
                <span style={modalStyles.close} onClick={onClose}>&times;</span>
                <h2>Medical Record Details</h2>
                <div style={{ marginTop: '10px' }}>
                    <label style={modalStyles.label}>
                        Record ID:
                        <input 
                            type="text" 
                            value={medicalRecord.RecordID} 
                            readOnly 
                            style={modalStyles.input} 
                        />
                    </label>
                    <label style={modalStyles.label}>
                        Patient ID:
                        <input 
                            type="text" 
                            value={medicalRecord.PatientID} 
                            readOnly 
                            style={modalStyles.input} 
                        />
                    </label>
                    <label style={modalStyles.label}>
                        Doctor ID:
                        <input 
                            type="text" 
                            value={medicalRecord.DoctorID} 
                            readOnly 
                            style={modalStyles.input} 
                        />
                    </label>
                    <label style={modalStyles.label}>
                        Date:
                        <input 
                            type="text" 
                            value={medicalRecord.Date} 
                            readOnly 
                            style={modalStyles.input} 
                        />
                    </label>
                    <label style={modalStyles.label}>
                        Diagnosis:
                        <input 
                            type="text" 
                            value={medicalRecord.Diagnosis} 
                            readOnly 
                            style={modalStyles.input} 
                        />
                    </label>
                    <label style={modalStyles.label}>
                        Treatment:
                        <input 
                            type="text" 
                            value={medicalRecord.Treatment} 
                            readOnly 
                            style={modalStyles.input} 
                        />
                    </label>
                    <label style={modalStyles.label}>
                        Notes:
                        <textarea 
                            value={medicalRecord.Notes} 
                            readOnly 
                            style={{ ...modalStyles.input, height: '80px', resize: 'vertical' }} 
                        />
                    </label>
                </div>
                <button 
                    style={modalStyles.closeButton} 
                    onClick={onClose}
                >
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
    zIndex: 1000,
  },
  content: {
    background: 'white',
    padding: '20px',
    borderRadius: '5px',
    width: '500px',
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
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
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

export default MedRecordViewModal;
