import React from 'react';

const MedRecordUpdateModal = ({ isOpen, onClose, onSave, medicalRecord }) => {
  const [formData, setFormData] = React.useState(medicalRecord || {});

  React.useEffect(() => {
    setFormData(medicalRecord || {});
  }, [medicalRecord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen || !medicalRecord) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}>
        <h2>Update Medical Record</h2>
        <form onSubmit={handleSave}>
          {['fullname', 'diagnostic'].map((field, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <label style={{ flex: '1', marginRight: '10px' }}>
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:
              </label>
              <input
                type="text"
                name={field}
                value={formData[field] || ''}
                onChange={handleChange}
                required
                style={{ flex: '2', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
          ))}
          {['dateOfConfinement', 'dateOfDischarge'].map((field, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <label style={{ flex: '1', marginRight: '10px' }}>
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:
              </label>
              <input
                type="date"
                name={field}
                value={formData[field] || ''}
                onChange={handleChange}
                required
                style={{ flex: '2', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
          ))}
          <div style={{ marginTop: '30px' }}> {/* Increased margin above buttons */}
            <button type="submit" style={{ padding: '12px 20px', cursor: 'pointer', width: 'calc(100% - 16px)', border: 'none', borderRadius: '5px', backgroundColor: '#4CAF50', color: 'white', margin: '0 8px 10px 8px' }}>
              Save
            </button>
            <button type="button" onClick={onClose} style={{ padding: '12px 20px', cursor: 'pointer', width: 'calc(100% - 16px)', border: 'none', borderRadius: '5px', backgroundColor: '#f44336', color: 'white', margin: '0 8px' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedRecordUpdateModal;
