const IncidentManagementViewModal = ({ isOpen, onClose, incidentReport }) => {
  if (!isOpen || !incidentReport) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <span style={modalStyles.close} onClick={onClose}>
          &times;
        </span>
        <h2>Incident Report Details</h2>
        <div style={{ marginTop: '10px' }}>
          <label style={modalStyles.label}>
            Incident ID:
            <input type="text" value={incidentReport.IncidentID || ''} readOnly style={modalStyles.input} />
          </label>
          <label style={modalStyles.label}>
            Incident Type:
            <input type="text" value={incidentReport.IncidentType || ''} readOnly style={modalStyles.input} />
          </label>
          <label style={modalStyles.label}>
            Status:
            <input type="text" value={incidentReport.Status || ''} readOnly style={modalStyles.input} />
          </label>
          <label style={modalStyles.label}>
            Date Reported:
            <input type="text" value={incidentReport.DateReported || ''} readOnly style={modalStyles.input} />
          </label>
          <label style={modalStyles.label}>
            Location:
            <input type="text" value={incidentReport.Location || ''} readOnly style={modalStyles.input} />
          </label>
        </div>
        <button style={modalStyles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};


const modalStyles = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  content: {
    background: 'white',
    padding: '20px',
    borderRadius: '5px',
    width: '400px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  close: {
    cursor: 'pointer',
    position: 'absolute',
    top: '10px',
    right: '20px',
    fontSize: '1.5em',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9', // Slightly different background for read-only
  },
  closeButton: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default IncidentManagementViewModal;
