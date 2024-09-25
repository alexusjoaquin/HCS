// src/components/Modals/CrimeReportUpdateModal/CrimeReportUpdateModal.js
import React from 'react';

const CrimeReportUpdateModal = ({ isOpen, onClose, onSave, report }) => {
  const [formData, setFormData] = React.useState({
    ReportID: report.ReportID || '',
    Description: report.Description || '',
    Date: report.Date || '',
    Location: report.Location || '',
    OfficerInCharge: report.OfficerInCharge || '',
  });

  React.useEffect(() => {
    setFormData({
      ReportID: report.ReportID || '',
      Description: report.Description || '',
      Date: report.Date || '',
      Location: report.Location || '',
      OfficerInCharge: report.OfficerInCharge || '',
    });
  }, [report]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>Update Crime Report</h2>
        <form onSubmit={handleSave}>
          <label>
            Report ID:
            <input
              type="text"
              name="ReportID"
              value={formData.ReportID}
              readOnly
              style={modalStyles.input}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              placeholder="Enter Report Description"
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
            Officer In Charge:
            <input
              type="text"
              name="OfficerInCharge"
              value={formData.OfficerInCharge}
              onChange={handleChange}
              placeholder="Enter Officer's Name"
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

export default CrimeReportUpdateModal;
