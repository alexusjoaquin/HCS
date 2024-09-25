import React from 'react';

const IncidentManagementModal = ({ isOpen, onClose, onSubmit }) => {
    // Generate a unique Incident ID
    const generateIncidentID = () => `INC${Math.floor(Date.now() / 1000)}`;


  // Ensure all initial values are defined
  const [formData, setFormData] = React.useState({
    IncidentID: generateIncidentID(),
    Type: '',
    Status: '',
    DateReported: '',
    Location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData); // Wait for the submission to complete
    // Reset form after successful submission
    setFormData({
      IncidentID: generateIncidentID(),
      Type: '',
      Status: '',
      DateReported: '',
      Location: '',
    });
    onClose(); // Close only after successful submission
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>New Incident Report</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Incident ID:
            <input
              type="text"
              name="IncidentID"
              value={formData.IncidentID}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label>
            Incident Type:
            <input
              type="text"
              name="Type"
              value={formData.Type}
              onChange={handleChange}
              placeholder="Enter Incident Type"
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
            Date Reported:
            <input
              type="date"
              name="DateReported"
              value={formData.DateReported}
              onChange={handleChange}
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="Location"
              value={formData.Location}
              onChange={handleChange}
              placeholder="Enter Location"
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

export default IncidentManagementModal;
