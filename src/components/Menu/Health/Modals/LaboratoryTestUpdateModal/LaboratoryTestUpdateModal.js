import React from 'react';

const LaboratoryTestUpdateModal = ({ isOpen, onClose, onSave, test }) => {
  const [formData, setFormData] = React.useState(test || { patientName: '', testTaken: '', testResult: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

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
        <h2>Update Laboratory Test</h2>
        <form onSubmit={handleSave}>
          <label>
            Patient Name:
            <input
              placeholder='Enter patient name'
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              style={{ width: '380px', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </label>
          <label>
            Test Taken:
            <input
              placeholder='Enter test taken'
              type="text"
              name="testTaken"
              value={formData.testTaken}
              onChange={handleChange}
              required
              style={{ width: '380px', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </label>
          <label>
            Test Result:
            <input
              placeholder='Enter test result'
              type="text"
              name="testResult"
              value={formData.testResult}
              onChange={handleChange}
              required
              style={{ width: '380px', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection:'column', rowGap:'10px' , marginTop: '20px'}}>
            <button type="submit" style={{ padding: '12px 20px', border: 'none', borderRadius: '5px', backgroundColor: '#4CAF50', color: 'white' }}>Save</button>
            <button type="button" onClick={onClose} style={{ padding: '12px 20px', border: 'none', borderRadius: '5px', backgroundColor: '#f44336', color: 'white' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LaboratoryTestUpdateModal;
