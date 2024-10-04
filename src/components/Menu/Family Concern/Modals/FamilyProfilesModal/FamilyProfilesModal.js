import React from 'react';

const FamilyProfilesModal = ({ isOpen, onClose, onSubmit }) => {
  // Generate an auto-incremented FamilyID based on timestamp
  const generateFamilyID = () => `FAM-${Date.now()}`; // Fixed string interpolation

  const [formData, setFormData] = React.useState({
    FamilyID: generateFamilyID(), // Auto-generated
    FamilyName: '',
    Members: '', // Ensure this matches in handleCreateSubmit
    Address: '',
    ContactNo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData); // Wait for the submission to complete
    // Reset form with a new FamilyID after successful submission
    setFormData({
      FamilyID: generateFamilyID(),
      FamilyName: '',
      Members: '',
      Address: '',
      ContactNo: '',
    });
    onClose(); // Close only after successful submission
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>New Family Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Family ID:
            <input
              type="text"
              name="FamilyID"
              value={formData.FamilyID}
              readOnly // Auto-generated, so it's read-only
              style={modalStyles.input}
            />
          </label>
          <label>
            Family Name:
            <input
              type="text"
              name="FamilyName"
              value={formData.FamilyName}
              onChange={handleChange}
              placeholder="Enter Family Name"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Members:
            <input
              type="text"
              name="Members" // Ensure this is consistent
              value={formData.Members}
              onChange={handleChange}
              placeholder="Enter Number of Members"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              placeholder="Enter Address"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Contact No.:
            <input
              type="text"
              name="ContactNo"
              value={formData.ContactNo}
              onChange={handleChange}
              placeholder="Enter Contact Number"
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

export default FamilyProfilesModal;
