import React from 'react';

const FinancialUpdateModal = ({ isOpen, onClose, onSave, financial }) => {
  const [formData, setFormData] = React.useState({
    AssistanceID: '',
    ApplicantName: '',
    DateRequested: '',
    Amount: '',
    Status: '',
  });

  React.useEffect(() => {
    if (financial) {
      setFormData({
        AssistanceID: financial.AssistanceID || '',
        ApplicantName: financial.ApplicantName || '',
        DateRequested: financial.DateRequested || '',
        Amount: financial.Amount || '',
        Status: financial.Status || '',
      });
    }
  }, [financial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Ensure Amount is a valid number before saving
    if (!isNaN(formData.Amount) && formData.Amount >= 0) {
      onSave(formData);
    } else {
      alert("Please enter a valid amount.");
    }
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>Update Financial Record</h2>
        <form onSubmit={handleSave}>
          <label>
            Assistance ID:
            <input
              type="text"
              name="AssistanceID"
              value={formData.AssistanceID}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label>
            Applicant Name:
            <input
              type="text"
              name="ApplicantName"
              value={formData.ApplicantName}
              onChange={handleChange}
              placeholder="Enter Applicant Name"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Date Requested:
            <input
              type="date"
              name="DateRequested"
              value={formData.DateRequested}
              onChange={handleChange}
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Amount:
            <input
              type="number"
              name="Amount"
              value={formData.Amount}
              onChange={handleChange}
              placeholder="Enter Amount"
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

// Modal styles
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
    width: '380px',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'block',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '20px',
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

export default FinancialUpdateModal;
