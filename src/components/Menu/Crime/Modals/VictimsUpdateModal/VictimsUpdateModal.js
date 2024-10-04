// src/components/Modals/VictimsUpdateModal/VictimsUpdateModal.js
import React from 'react';

const VictimsUpdateModal = ({ isOpen, onClose, onSave, victim }) => {
  const [formData, setFormData] = React.useState({
    VictimID: victim.VictimID || '',
    FullName: victim.FullName || '',
    LastKnownAddress: victim.LastKnownAddress || '',
    IncidentDate: victim.IncidentDate || '',
    CaseStatus: victim.CaseStatus || '',
  });

  React.useEffect(() => {
    setFormData({
      VictimID: victim.VictimID || '',
      FullName: victim.FullName || '',
      LastKnownAddress: victim.LastKnownAddress || '',
      IncidentDate: victim.IncidentDate || '',
      CaseStatus: victim.CaseStatus || '',
    });
  }, [victim]);

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
        <h2>Update Victim</h2>
        <form onSubmit={handleSave}>
          <label>
            Victim ID:
            <input
              type="text"
              name="VictimID"
              value={formData.VictimID}
              readOnly
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

export default VictimsUpdateModal;
