// src/components/Modals/VictimsModal/VictimsModal.js
import React from 'react';

const VictimsModal = ({ isOpen, onClose, onSubmit }) => {
  // Generate an auto-incremented VictimID based on timestamp
  const generateVictimID = () => `V-${Date.now()}`;

  const [formData, setFormData] = React.useState({
    VictimID: generateVictimID(), // Auto-generated
    FullName: '',
    LastKnownAddress: '',
    IncidentDate: '',
    CaseStatus: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData); // Wait for the submission to complete
    // Reset form with a new VictimID after successful submission
    setFormData({
      VictimID: generateVictimID(),
      FullName: '',
      LastKnownAddress: '',
      IncidentDate: '',
      CaseStatus: '',
    });
    onClose(); // Close only after successful submission
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>New Victim Report</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Victim ID:
            <input
              type="text"
              name="VictimID"
              value={formData.VictimID}
              readOnly // Auto-generated, so it's read-only
              style={modalStyles.input}
            />
          </label>
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
            Last Known Address:
            <input
              type="text"
              name="LastKnownAddress"
              value={formData.LastKnownAddress}
              onChange={handleChange}
              placeholder="Enter Last Known Address"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Incident Date:
            <input
              type="date"
              name="IncidentDate"
              value={formData.IncidentDate}
              onChange={handleChange}
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Case Status:
            <input
              type="text"
              name="CaseStatus"
              value={formData.CaseStatus}
              onChange={handleChange}
              placeholder="Enter Case Status"
              required
              style={modalStyles.input}
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
    zIndex: 1000,
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

export default VictimsModal;
