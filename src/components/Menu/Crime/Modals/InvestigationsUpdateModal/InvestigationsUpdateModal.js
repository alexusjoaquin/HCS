import React from 'react';

const InvestigationsUpdateModal = ({ isOpen, onClose, onSave, investigation }) => {
  const [formData, setFormData] = React.useState({
    InvestigationID: investigation.InvestigationID || '',
    CaseTitle: investigation.CaseTitle || '',
    Investigator: investigation.Investigator || '',
    Status: investigation.Status || '',
    DateOpened: investigation.DateOpened || '',
  });

  React.useEffect(() => {
    setFormData({
      InvestigationID: investigation.InvestigationID || '',
      CaseTitle: investigation.CaseTitle || '',
      Investigator: investigation.Investigator || '',
      Status: investigation.Status || '',
      DateOpened: investigation.DateOpened || '',
    });
  }, [investigation]);

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
        <h2>Update Investigation</h2>
        <form onSubmit={handleSave}>
          <label>
            Investigation ID:
            <input
              type="text"
              name="InvestigationID"
              value={formData.InvestigationID}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label>
            Case Title:
            <input
              type="text"
              name="CaseTitle"
              value={formData.CaseTitle}
              onChange={handleChange}
              placeholder="Enter Case Title"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Investigator:
            <input
              type="text"
              name="Investigator"
              value={formData.Investigator}
              onChange={handleChange}
              placeholder="Enter Investigator's Name"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Status:
            <input
              type="text"
              name="Status"
              value={formData.Status}
              onChange={handleChange}
              placeholder="Enter Status"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Date Opened:
            <input
              type="date"
              name="DateOpened"
              value={formData.DateOpened}
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

export default InvestigationsUpdateModal;
