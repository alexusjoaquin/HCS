import React from 'react';

const SeniorCitizenModal = ({ isOpen, onClose, onSubmit }) => {
  // Generate an auto-incremented SeniorID based on timestamp
  const generateSeniorID = () => `SR${Date.now()}`;

  const [formData, setFormData] = React.useState({
    SeniorID: generateSeniorID(), // Auto-generated
    FullName: '',
    Address: '',
    DateOfBirth: '',
    ContactInfo: { Phone: '', Email: '' }, // Change to an object
    Gender: '',
    MedicalHistory: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "ContactNo") {
      setFormData({ ...formData, ContactInfo: { ...formData.ContactInfo, Phone: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData); // Wait for the submission to complete
    // Reset form with a new SeniorID after successful submission
    setFormData({
      SeniorID: generateSeniorID(),
      FullName: '',
      Address: '',
      DateOfBirth: '',
      ContactNo: '',
      Gender: '',
      MedicalHistory: '',
    });
    onClose(); // Close only after successful submission
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>New Senior Citizen Record</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Senior ID:
            <input
              type="text"
              name="SeniorID"
              value={formData.SeniorID}
              readOnly // Auto-generated, so it's read-only
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
            Date of Birth:
            <input
              type="date"
              name="DateOfBirth"
              value={formData.DateOfBirth}
              onChange={handleChange}
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
              placeholder="Enter Contact No."
              required
              style={modalStyles.input}
            />
          </label>
          <label>
              Gender:
              <select
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                  required
                  style={modalStyles.input}
              >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
              </select>
          </label>
          <label>
            Medical History:
            <textarea
              name="MedicalHistory"
              value={formData.MedicalHistory}
              onChange={handleChange}
              placeholder="Enter Medical History"
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

export default SeniorCitizenModal;
