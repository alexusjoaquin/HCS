import React from 'react';

const AppointmentModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    fullname: '',
    contactNumber: '',
    appointmentDate: '',
    appointmentTime: '',
    doctor: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
        <h2>New Appointment</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Fullname:
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              style={{
                width: 'calc(100% - 20px)',
                padding: '8px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                display: 'block',
              }}
            />
          </label>
          <label>
            Contact Number:
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter your contact number"
              required
              style={{
                width: 'calc(100% - 20px)',
                padding: '8px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                display: 'block',
              }}
            />
          </label>
          <div style={{
            display: 'flex',
            marginBottom: '10px',
            gap: '10px',
          }}>
            <label style={{ flex: 1 }}>
              Appointment Date:
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                required
                style={{
                  width: 'calc(100% - 20px)', // Adjusted width
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
            </label>
            <label style={{ flex: 1 }}>
              Time:
              <input
                type="time"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
                required
                style={{
                  width: 'calc(100% - 20px)', // Adjusted width
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
            </label>
          </div>
          <label>
            Doctor:
            <input
              type="text"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              placeholder="Enter doctor's name"
              required
              style={{
                width: 'calc(100% - 20px)',
                padding: '8px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                display: 'block',
              }}
            />
          </label>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <button type="submit" style={{
              padding: '12px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              width: '130px',
              backgroundColor: '#4CAF50',
              color: 'white',
            }}>Submit</button>
            <button type="button" onClick={onClose} style={{
              padding: '12px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              width: '130px',
              backgroundColor: '#f44336',
              color: 'white',
            }}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
