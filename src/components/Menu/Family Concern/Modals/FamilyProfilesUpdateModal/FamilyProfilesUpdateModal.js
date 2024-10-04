import React from 'react';

const FamilyProfilesUpdateModal = ({ isOpen, onClose, onSave, family }) => {
  const [formData, setFormData] = React.useState({
    FamilyID: '',
    FamilyName: '',
    Members: '',
    Address: '',
    ContactNo: '',
  });

  React.useEffect(() => {
    if (family) {
      setFormData({
        FamilyID: family.FamilyID || '',
        FamilyName: family.FamilyName || '',
        Members: family.Members || '',
        Address: family.Address || '',
        ContactNo: family.ContactNo || '',
      });
    }
  }, [family]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Ensure Members is a number before saving
    if (!isNaN(formData.Members) && formData.Members > 0) {
      onSave(formData);
    } else {
      alert("Please enter a valid number for Members.");
    }
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>Update Family Profile</h2>
        <form onSubmit={handleSave}>
          <label>
            Family ID:
            <input
              type="text"
              name="FamilyID"
              value={formData.FamilyID}
              readOnly
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
              type="number"
              name="Members"
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
            Contact No:
            <input
              type="tel"
              name="ContactNo"
              value={formData.ContactNo}
              onChange={handleChange}
              placeholder="Enter Contact No"
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

export default FamilyProfilesUpdateModal;
