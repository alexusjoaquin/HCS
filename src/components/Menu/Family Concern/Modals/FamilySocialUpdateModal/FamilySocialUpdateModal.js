import React from 'react';

const FamilySocialUpdateModal = ({ isOpen, onClose, onSave, service }) => {
  const [formData, setFormData] = React.useState({
    ServiceID: '',
    CaseWorker: '',
    Date: '',
    Location: '',
    Description: '',
  });

  React.useEffect(() => {
    if (service) {
      setFormData({
        ServiceID: service.ServiceID || '',
        CaseWorker: service.CaseWorker || '',
        Date: service.Date || '',
        Location: service.Location || '',
        Description: service.Description || '',
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Perform any additional validation if necessary
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>Update Family Social Record</h2>
        <form onSubmit={handleSave}>
          <label>
            Service ID:
            <input
              type="text"
              name="ServiceID"
              value={formData.ServiceID}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label>
            Case Worker:
            <input
              type="text"
              name="CaseWorker"
              value={formData.CaseWorker}
              onChange={handleChange}
              placeholder="Enter Case Worker Name"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="Date"
              value={formData.Date}
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
          <label>
            Description:
            <textarea
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              placeholder="Enter Description"
              required
              style={{ ...modalStyles.input, height: '100px' }}
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
    paddingTop: '20px',
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

export default FamilySocialUpdateModal;
