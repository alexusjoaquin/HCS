import React from 'react';

const NoPensionModal = ({ isOpen, onClose, onSubmit }) => {
  // Generate an auto-incremented Record ID based on timestamp
  const generateRecordID = () => `REC${Date.now()}`;

  const [formData, setFormData] = React.useState({
    RecordID: generateRecordID(), // Auto-generated
    BenefitName: '',
    Description: '',
    Eligibility: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData); // Wait for the submission to complete
    // Reset form with a new Record ID after successful submission
    setFormData({
      RecordID: generateRecordID(),
      BenefitName: '',
      Description: '',
      Eligibility: '',
    });
    onClose(); // Close only after successful submission
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>Add No Pension Benefit</h2>
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
            Benefit Name:
            <input
              type="text"
              name="BenefitName"
              value={formData.BenefitName}
              onChange={handleChange}
              placeholder="Enter Benefit Name"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Description:
            <textarea
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              placeholder="Enter Description"
              required
              style={modalStyles.textarea}
            />
          </label>
          <label>
            Eligibility:
            <input
              type="text"
              name="Eligibility"
              value={formData.Eligibility}
              onChange={handleChange}
              placeholder="Enter Eligibility Criteria"
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
    width: '380px',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'block',
  },
  textarea: {
    width: '380px',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'block',
    minHeight: '80px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 0 20px'
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

export default NoPensionModal;
