import React from 'react';

const InvestigationModal = ({ isOpen, onClose, onSubmit }) => {
  // Generate an auto-incremented InvestigationID based on timestamp
  const generateInvestigationID = () => `INV${Date.now()}`;

  const [formData, setFormData] = React.useState({
    InvestigationID: generateInvestigationID(), // Auto-generated
    CaseTitle: '',
    Investigator: '',
    Status: '',
    DateOpened: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData); // Wait for the submission to complete
    // Reset form with a new InvestigationID after successful submission
    setFormData({
      InvestigationID: generateInvestigationID(),
      CaseTitle: '',
      Investigator: '',
      Status: '',
      DateOpened: '',
    });
    onClose(); // Close only after successful submission
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>New Investigation Report</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Investigation ID:
            <input
              type="text"
              name="InvestigationID"
              value={formData.InvestigationID}
              readOnly // Auto-generated, so it's read-only
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
              placeholder="Enter Investigator Name"
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
              placeholder="Enter Investigation Status"
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

export default InvestigationModal;
