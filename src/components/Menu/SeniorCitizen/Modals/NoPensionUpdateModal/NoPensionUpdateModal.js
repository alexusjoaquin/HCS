import React from 'react';

const NoPensionUpdateModal = ({ isOpen, onClose, onSave, benefit }) => {
  const [formData, setFormData] = React.useState({
    BenefitID: '',
    BenefitName: '',
    Description: '',
    Eligibility: '',
  });

  React.useEffect(() => {
    if (benefit) {
      setFormData({
        BenefitID: benefit.BenefitID || '',
        BenefitName: benefit.BenefitName || '',
        Description: benefit.Description || '',
        Eligibility: benefit.Eligibility || '',
      });
    }
  }, [benefit]);

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
        <h2>Update No Pension Benefit</h2>
        <form onSubmit={handleSave}>
          <label>
            Benefit ID:
            <span style={modalStyles.readOnlyInput}>
              {formData.BenefitID}
            </span>
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
              style={modalStyles.input}
            />
          </label>
          <label>
            Eligibility:
            <input
              type="text"
              name="Eligibility"
              value={formData.Eligibility}
              onChange={handleChange}
              placeholder="Enter Eligibility"
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
    width: '380px',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'block',
  },
  readOnlyInput: {
    display: 'block',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f0f0f0', // Optional: for visual indication
    color: '#333', // Optional: text color
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '20px'
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

export default NoPensionUpdateModal;
