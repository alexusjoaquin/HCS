import React from 'react';
import { toast } from 'react-toastify';

const IncidentManagementUpdateModal = ({ isOpen, onClose, onSave, incident }) => {
  const [formData, setFormData] = React.useState({
    IncidentID: '',
    IncidentType: '',
    Status: '',
    DateReported: '',
    Location: '',
  });

  React.useEffect(() => {
    if (incident) {
      setFormData({
        IncidentID: incident.IncidentID || '',
        IncidentType: incident.IncidentType || '',
        Status: incident.Status || '',
        DateReported: incident.DateReported || '',
        Location: incident.Location || '',
      });
    }
  }, [incident]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData)
      .catch((error) => {
        toast.error('Failed to update incident: ' + error.message);
      });
  };
  


  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>Update Incident Management</h2>
        <form onSubmit={handleSave}>
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
              name="IncidentType"
              value={formData.IncidentType}
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

export default IncidentManagementUpdateModal;
