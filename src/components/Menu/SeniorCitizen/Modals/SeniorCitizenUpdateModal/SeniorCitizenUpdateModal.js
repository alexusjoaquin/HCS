import React from 'react';

const SeniorCitizenUpdateModal = ({ isOpen, onClose, onSave, seniorCitizen }) => {
  const [formData, setFormData] = React.useState({
    SeniorID: seniorCitizen.SeniorID || '',
    FullName: seniorCitizen.FullName || '',
    Address: seniorCitizen.Address || '',
    DateOfBirth: seniorCitizen.DateOfBirth || '',
    ContactInfo: seniorCitizen.ContactInfo || { Phone: '', Email: '' },
    Gender: seniorCitizen.Gender || '',
    MedicalHistory: seniorCitizen.MedicalHistory || '',
  });

  React.useEffect(() => {
    setFormData({
      SeniorID: seniorCitizen.SeniorID || '',
      FullName: seniorCitizen.FullName || '',
      Address: seniorCitizen.Address || '',
      DateOfBirth: seniorCitizen.DateOfBirth || '',
      ContactInfo: seniorCitizen.ContactInfo || { Phone: '', Email: '' },
      Gender: seniorCitizen.Gender || '',
      MedicalHistory: seniorCitizen.MedicalHistory || '',
    });
  }, [seniorCitizen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ContactInfo.Phone') {
        setFormData({ ...formData, ContactInfo: { ...formData.ContactInfo, Phone: value } });
    } else {
        setFormData({ ...formData, [name]: value });
    }
};
  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>Update Senior Citizen</h2>
        <form onSubmit={handleSave}>
          <label>
            Senior ID:
            <input
              type="text"
              name="SeniorID"
              value={formData.SeniorID}
              readOnly
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
              name="ContactInfo.Phone"
              value={formData.ContactInfo.Phone}
              onChange={handleChange}
              placeholder="Enter Contact No."
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Gender:
            <input
              type="text"
              name="Gender"
              value={formData.Gender}
              onChange={handleChange}
              placeholder="Enter Gender"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Medical History:
            <textarea
              name="MedicalHistory"
              value={formData.MedicalHistory}
              onChange={handleChange}
              placeholder="Enter Medical History"
              required
              style={{ ...modalStyles.input, height: '60px' }}
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

export default SeniorCitizenUpdateModal;
