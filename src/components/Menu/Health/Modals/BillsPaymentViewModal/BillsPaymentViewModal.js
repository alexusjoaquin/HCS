import React from 'react';

const BillsPaymentViewModal = ({ isOpen, onClose, bill }) => {
    if (!isOpen || !bill) return null;

    return (
        <div style={{
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
        }}>
            <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '5px',
                width: '400px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}>
                <span style={{
                    cursor: 'pointer',
                    float: 'right',
                    fontSize: '1.5em',
                }} onClick={onClose}>&times;</span>
                <h2>Bill Payment Details</h2>
                <div style={{ marginTop: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Bill ID:
                        <input 
                            type="text" 
                            value={bill.id} // Ensure this matches the key in the bill object
                            readOnly 
                            style={{ width: '380px', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
                        />
                    </label>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Patient Name:
                        <input 
                            type="text" 
                            value={bill.patientName} 
                            readOnly 
                            style={{ width: '380px', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
                        />
                    </label>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Amount Due:
                        <input 
                            type="text" 
                            value={`$${bill.amountDue}`} 
                            readOnly 
                            style={{ width: '380px', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
                        />
                    </label>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Due Date:
                        <input 
                            type="text" 
                            value={bill.dueDate} 
                            readOnly 
                            style={{ width: '380px', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
                        />
                    </label>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Payment Status:
                        <input 
                            type="text" 
                            value={bill.paymentStatus} 
                            readOnly 
                            style={{ width: '380px', marginBottom: '20px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
                        />
                    </label>
                </div>
                <button 
                    style={{ 
                        marginTop: '20px', 
                        padding: '10px', 
                        cursor: 'pointer', 
                        width: '100%',
                        backgroundColor:'#f44336',
                        border: 'none',
                        borderRadius: '5px',
                        color: 'white'
                    }} 
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default BillsPaymentViewModal;
