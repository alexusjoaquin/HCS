import React from 'react';

const SeniorSocialModal = ({ isOpen, onClose, onSubmit }) => {
  // Generate an auto-incremented ServiceID based on timestamp
  const generateServiceID = () => `SRV${Date.now()}`;

  const [formData, setFormData] = React.useState({
    ServiceID: generateServiceID(), // Auto-generated
    ServiceName: '',
    Provider: '',
    ContactInfo: '',
    Description: '',
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
      ServiceName: '',
      Provider: '',
      ContactInfo: '',
      Description: '',
    });
    onClose(); // Close only after successful submission
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>Add New Service</h2>
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
            Service Name:
            <input
              type="text"
              name="ServiceName"
              value={formData.ServiceName}
              onChange={handleChange}
              placeholder="Enter Service Name"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Provider:
            <input
              type="text"
              name="Provider"
              value={formData.Provider}
              onChange={handleChange}
              placeholder="Enter Provider Name"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Contact Info:
            <input
              type="text"
              name="ContactInfo"
              value={formData.ContactInfo}
              onChange={handleChange}
              placeholder="Enter Contact Info"
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
    height: '100px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop:'30px'

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

export default SeniorSocialModal;
