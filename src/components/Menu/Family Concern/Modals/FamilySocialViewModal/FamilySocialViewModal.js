import React from 'react';

const FamilySocialViewModal = ({ isOpen, onClose, socialData }) => {
  if (!isOpen || !socialData) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <span style={modalStyles.close} onClick={onClose}>
          &times;
        </span>
        <h2>Family Social Service Details</h2>
        <div style={{ marginTop: '10px' }}>
          <label style={modalStyles.label}>
            Service ID:
            <input type="text" value={socialData.ServiceID || ''} readOnly style={modalStyles.input} />
          </label>
          <label style={modalStyles.label}>
            Case Worker:
            <input type="text" value={socialData.CaseWorker || ''} readOnly style={modalStyles.input} />
          </label>
          <label style={modalStyles.label}>
            Date:
            <input type="text" value={socialData.Date || ''} readOnly style={modalStyles.input} />
          </label>
          <label style={modalStyles.label}>
            Location:
            <input type="text" value={socialData.Location || ''} readOnly style={modalStyles.input} />
          </label>
          <label style={modalStyles.label}>
            Description:
            <textarea value={socialData.Description || ''} readOnly style={{ ...modalStyles.input, height: '80px' }} />
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
    width: '380px',
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

export default FamilySocialViewModal;
