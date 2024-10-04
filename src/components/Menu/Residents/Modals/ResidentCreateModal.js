import React, { useState } from 'react';

const ResidentCreateModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    Name: '',
    Age: '',
    Birthday: '',
    Address: '',
    Gender: '',
    Status: '',
    BMI: '',
    Height: '',
    Weight: '',
    BloodType: '',
    is_senior: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>New Resident Record</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              placeholder="Enter Name"
              required
              style={{ ...modalStyles.input, width: '380px' }}
            />
          </label>

          {/* Age and Birthday row */}
          <div style={modalStyles.row}>
            <label style={modalStyles.smallerGap}>
              Age:
              <input
                type="number"
                name="Age"
                value={formData.Age}
                onChange={handleChange}
                placeholder="Enter Age"
                required
                style={{ ...modalStyles.input, width: '170px' }}
              />
            </label>
            <label style={modalStyles.smallerGap}>
              Birthday:
              <input
                type="date"
                name="Birthday"
                value={formData.Birthday}
                onChange={handleChange}
                required
                style={{ ...modalStyles.input, width: '170px' }}
              />
            </label>
          </div>

          <label>
            Address (BRGY):
            <select
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              required
              style={{...modalStyles.input, width: '400px'}}
            >
              <option value="" disabled>Select Barangay</option>
              <option value="Baloc">Baloc</option>
              <option value="Buasao">Buasao</option>
              <option value="Burgos">Burgos</option>
              <option value="Cabugao">Cabugao</option>
              <option value="Casulucan">Casulucan</option>
              <option value="Comitang">Comitang</option>
              <option value="Concepcion">Concepcion</option>
              <option value="Dolores">Dolores</option>
              <option value="General Luna">General Luna</option>
              <option value="Hulo">Hulo</option>
              <option value="Mabini">Mabini</option>
              <option value="Malasin">Malasin</option>
              <option value="Malayantoc">Malayantoc</option>
              <option value="Mambarao">Mambarao</option>
              <option value="Poblacion">Poblacion</option>
              <option value="Malaya (Pook Malaya)">Malaya (Pook Malaya)</option>
              <option value="Pulong Buli">Pulong Buli</option>
              <option value="Sagaba">Sagaba</option>
            </select>
          </label>

          {/* Gender and BloodType row */}
          <div style={modalStyles.row}>
            <label style={modalStyles.adjustedWidth}>
              Gender:
              <select
                name="Gender"
                value={formData.Gender}
                onChange={handleChange}
                required
                style={{...modalStyles.input, width: '170px'}}
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <label style={modalStyles.adjustedWidth}>
              Blood Type:
              <select
                name="BloodType"
                value={formData.BloodType}
                onChange={handleChange}
                required
                style={{...modalStyles.input, width: '170px'}}
              >
                <option value="" disabled>Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A−">A−</option>
                <option value="B+">B+</option>
                <option value="B−">B−</option>
                <option value="AB+">AB+</option>
                <option value="AB−">AB−</option>
                <option value="O+">O+</option>
                <option value="O−">O−</option>
              </select>
            </label>
          </div>

          {/* BMI, Height, and Weight row with larger gap */}
          <div style={modalStyles.row}>
            <label style={modalStyles.largerGap}>
              BMI:
              <input
                type="number"
                name="BMI"
                value={formData.BMI}
                onChange={handleChange}
                placeholder="Enter BMI"
                required
                style={{ ...modalStyles.input, width: '100px' }}
              />
            </label>
            <label style={modalStyles.largerGap}>
              Height (cm):
              <input
                type="number"
                name="Height"
                value={formData.Height}
                onChange={handleChange}
                placeholder="Enter Height"
                required
                style={{ ...modalStyles.input, width: '100px' }}
              />
            </label>
            <label style={modalStyles.largerGap}>
              Weight (kg):
              <input
                type="number"
                name="Weight"
                value={formData.Weight}
                onChange={handleChange}
                placeholder="Enter Weight"
                required
                style={{ ...modalStyles.input, width: '100px' }}
              />
            </label>
          </div>

          <label>
            Status:
            <select
              name="Status"
              value={formData.Status}
              onChange={handleChange}
              required
              style={{...modalStyles.input, width: '400px'}}
            >
              <option value="" disabled>Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="widowed">Widowed</option>
            </select>
          </label>

          <label>
            Check if Senior:
            <input
              type="checkbox"
              name="is_senior"
              checked={formData.is_senior}
              onChange={handleChange}
              style={modalStyles.checkbox}
            />
          </label>

          <div style={modalStyles.buttonContainer}>
            <button type="submit" style={modalStyles.submitButton}>
              Submit
            </button>
            <button type="button" onClick={onClose} style={modalStyles.closeButton}>
              Close
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
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'block',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  smallerGap: {
    width: '48%', // Smaller gap for Age and Birthday
  },
  adjustedWidth: {
    width: '43%', // Reduced width for Gender and BloodType
  },
  largerGap: {
    width: '30%', // Larger gap for BMI, Height, and Weight
  },
  checkbox: {
    marginLeft: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
  },
  submitButton: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '130px',
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  closeButton: {
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

export default ResidentCreateModal;
