// src/components/Modals/ResidentUpdateModal/ResidentUpdateModal.js
import React from 'react';

const ResidentUpdateModal = ({ isOpen, onClose, onSave, resident }) => {
  const [formData, setFormData] = React.useState({
    Name: resident.Name || '',
    Age: resident.Age || '',
    Birthday: resident.Birthday || '',
    Address: resident.Address || '',
    Gender: resident.Gender || '',
    Status: resident.Status || '',
    BMI: resident.BMI || '',
    Height: resident.Height || '',
    Weight: resident.Weight || '',
    BloodType: resident.BloodType || '',
    IsSenior: resident.IsSenior || false,
  });

  React.useEffect(() => {
    setFormData({
      Name: resident.Name || '',
      Age: resident.Age || '',
      Birthday: resident.Birthday || '',
      Address: resident.Address || '',
      Gender: resident.Gender || '',
      Status: resident.Status || '',
      BMI: resident.BMI || '',
      Height: resident.Height || '',
      Weight: resident.Weight || '',
      BloodType: resident.BloodType || '',
      IsSenior: resident.IsSenior || false,
    });
  }, [resident]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, IsSenior: e.target.checked });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData);
    // Optionally reset form or handle post-save actions
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>Update Resident</h2>
        <form onSubmit={handleSave}>
          <label>
            Name:
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              placeholder="Enter Name"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="Age"
              value={formData.Age}
              onChange={handleChange}
              placeholder="Enter Age"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Birthday:
            <input
              type="date"
              name="Birthday"
              value={formData.Birthday}
              onChange={handleChange}
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
            Status:
            <select
              name="Status"
              value={formData.Status}
              onChange={handleChange}
              required
              style={modalStyles.input}
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
            </select>
          </label>
          <label>
            BMI:
            <input
              type="number"
              name="BMI"
              value={formData.BMI}
              onChange={handleChange}
              placeholder="Enter BMI"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Height:
            <input
              type="number"
              name="Height"
              value={formData.Height}
              onChange={handleChange}
              placeholder="Enter Height"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Weight:
            <input
              type="number"
              name="Weight"
              value={formData.Weight}
              onChange={handleChange}
              placeholder="Enter Weight"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Blood Type:
            <select
              name="BloodType"
              value={formData.BloodType}
              onChange={handleChange}
              required
              style={modalStyles.input}
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A−</option>
              <option value="B+">B+</option>
              <option value="B-">B−</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB−</option>
              <option value="O+">O+</option>
              <option value="O-">O−</option>
            </select>
          </label>
          <label>
            Is Senior:
            <input
              type="checkbox"
              name="IsSenior"
              checked={formData.IsSenior}
              onChange={handleCheckboxChange}
              style={modalStyles.checkbox}
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
    zIndex: 1000, // Ensures the modal is on top
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
  checkbox: {
    marginLeft: '10px',
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

export default ResidentUpdateModal;
