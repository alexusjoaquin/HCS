import React from 'react';

const HealthManagementUpdateModal = ({ isOpen, onClose, onSave, healthRecord }) => {
  const [formData, setFormData] = React.useState({
    RecordID: healthRecord.RecordID || '',
    SeniorName: healthRecord.SeniorName || '',
    ChronicCondition: healthRecord.ChronicCondition || '',
    Medication: healthRecord.Medication || '',
    LastCheckUp: healthRecord.LastCheckUp || '',
  });

  React.useEffect(() => {
    setFormData({
      RecordID: healthRecord.RecordID || '',
      SeniorName: healthRecord.SeniorName || '',
      ChronicCondition: healthRecord.ChronicCondition || '',
      Medication: healthRecord.Medication || '',
      LastCheckUp: healthRecord.LastCheckUp || '',
    });
  }, [healthRecord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>Update Health Record</h2>
        <form onSubmit={handleSave}>
          <label>
            Record ID:
            <input
              type="text"
              name="RecordID"
              value={formData.RecordID}
              readOnly // Record ID is not editable
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

export default HealthManagementUpdateModal;
