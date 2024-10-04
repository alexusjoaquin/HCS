import React from 'react';

const HealthManagementModal = ({ isOpen, onClose, onSubmit }) => {
  // Generate an auto-incremented Record ID based on timestamp
  const generateRecordID = () => `REC${Date.now()}`;

  const [formData, setFormData] = React.useState({
    RecordID: generateRecordID(), // Auto-generated
    SeniorName: '',
    ChronicCondition: '',
    Medication: '',
    LastCheckUp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData); // Wait for the submission to complete
    // Reset form with a new RecordID after successful submission
    setFormData({
      RecordID: generateRecordID(),
      SeniorName: '',
      ChronicCondition: '',
      Medication: '',
      LastCheckUp: '',
    });
    onClose(); // Close only after successful submission
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>New Health Management Record</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Record ID:
            <input
              type="text"
              name="RecordID"
              value={formData.RecordID}
              readOnly // Auto-generated, so it's read-only
              style={modalStyles.input}
            />
          </label>
          <label>
            Senior Name:
            <input
              type="text"
              name="SeniorName"
              value={formData.SeniorName}
              onChange={handleChange}
              placeholder="Enter Senior Name"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Chronic Condition:
            <input
              type="text"
              name="ChronicCondition"
              value={formData.ChronicCondition}
              onChange={handleChange}
              placeholder="Enter Chronic Condition"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Medication:
            <input
              type="text"
              name="Medication"
              value={formData.Medication}
              onChange={handleChange}
              placeholder="Enter Medication"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Last Check-Up:
            <input
              type="date"
              name="LastCheckUp"
              value={formData.LastCheckUp}
              onChange={handleChange}
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

export default HealthManagementModal;
