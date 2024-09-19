import React from 'react';

const BillsPaymentUpdateModal = ({ isOpen, onClose, onSave, bill }) => {
  const [formData, setFormData] = React.useState(bill || {
    patientName: '',
    amountDue: 0,
    dueDate: '',
    paymentStatus: ''
  });

  React.useEffect(() => {
    setFormData(bill || {
      patientName: '',
      amountDue: 0,
      dueDate: '',
      paymentStatus: ''
    });
  }, [bill]);

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
        <h2>Update Bill Payment</h2>
        <form onSubmit={handleSave}>
          <label>
            Patient Name:
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="Enter patient name"
              required
              style={{ width: 'calc(100% - 20px)', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', display: 'block' }}
            />
          </label>
          <label>
            Amount Due:
            <input
              type="number"
              name="amountDue"
              value={formData.amountDue}
              onChange={handleChange}
              placeholder="Enter amount due"
              required
              style={{ width: 'calc(100% - 20px)', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', display: 'block' }}
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
              style={{ width: 'calc(100% - 20px)', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </label>
          <label>
            Payment Status:
            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              <option value="" disabled>Select status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="submit" style={{ padding: '12px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', width: '130px', backgroundColor: '#4CAF50', color: 'white' }}>Save</button>
            <button type="button" onClick={onClose} style={{ padding: '12px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', width: '130px', backgroundColor: '#f44336', color: 'white' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillsPaymentUpdateModal;
