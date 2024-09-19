import React from 'react';

const BillsPaymentModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    billId: '',
    patientName: '',
    amountDue: '',
    dueDate: '',
    paymentStatus: 'Pending', // Set a default value
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
        <h2>Bill Payment</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Bill ID:
            <input
              type="text"
              name="billId"
              value={formData.billId}
              onChange={handleChange}
              placeholder="Enter Bill ID"
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
            Patient Name:
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="Enter Patient Name"
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
            Amount Due:
            <input
              type="text" // Changed to text
              name="amountDue"
              value={formData.amountDue}
              onChange={handleChange}
              placeholder="Enter Amount Due"
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
            Due Date:
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              style={{
                width: 'calc(100% - 20px)',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                display: 'block',
                marginBottom: '10px',
              }}
            />
          </label>
          <label>
            Payment Status:
            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                display: 'block',
              }}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Paid">Overdue</option>
            </select>
          </label>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '30px'
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

export default BillsPaymentModal;
