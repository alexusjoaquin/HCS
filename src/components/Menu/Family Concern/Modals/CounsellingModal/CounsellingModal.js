import React from 'react';

const CounsellingModal = ({ isOpen, onClose, onSubmit }) => {
  // Generate an auto-incremented ServiceID based on timestamp
  const generateServiceID = () => `SERV-${Date.now()}`; // Fixed string interpolation

  const [formData, setFormData] = React.useState({
    ServiceID: generateServiceID(), // Auto-generated
    ClientName: '',
    Counselor: '',
    DateOfSession: '',
    Location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData); // Wait for the submission to complete
    // Reset form with a new ServiceID after successful submission
    setFormData({
      ServiceID: generateServiceID(),
      ClientName: '',
      Counselor: '',
      DateOfSession: '',
      Location: '',
    });
    onClose(); // Close only after successful submission
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>New Counselling Session</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Service ID:
            <input
              type="text"
              name="ServiceID"
              value={formData.ServiceID}
              readOnly // Auto-generated, so it's read-only
              style={modalStyles.input}
            />
          </label>
          <label>
            Client Name:
            <input
              type="text"
              name="ClientName"
              value={formData.ClientName}
              onChange={handleChange}
              placeholder="Enter Client Name"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Counselor:
            <input
              type="text"
              name="Counselor"
              value={formData.Counselor}
              onChange={handleChange}
              placeholder="Enter Counselor Name"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Date of Session:
            <input
              type="date"
              name="DateOfSession"
              value={formData.DateOfSession}
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

// Styles...
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
    paddingTop: '20px'
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

export default CounsellingModal;
