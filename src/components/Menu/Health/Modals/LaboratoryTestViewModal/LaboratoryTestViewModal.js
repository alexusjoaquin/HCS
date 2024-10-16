// LaboratoryTestViewModal.js

import React from 'react';

const LaboratoryTestViewModal = ({ isOpen, onClose, laboratoryTest }) => {
    if (!isOpen || !laboratoryTest) return null;

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
                <h2>Laboratory Test Details</h2>
                <div style={{ marginTop: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Test ID:
                        <input
                            type="text"
                            value={laboratoryTest.TestID}
                            readOnly
                            style={{ width: '380px', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </label>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Patient ID:
                        <input
                            type="text"
                            value={laboratoryTest.PatientID}
                            readOnly
                            style={{ width: '380px', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </label>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Doctor ID:
                        <input
                            type="text"
                            value={laboratoryTest.DoctorID}
                            readOnly
                            style={{ width: '380px', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </label>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Test Name:
                        <input
                            type="text"
                            value={laboratoryTest.TestName}
                            readOnly
                            style={{ width: '380px', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </label>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Test Date:
                        <input
                            type="date"
                            value={laboratoryTest.TestDate}
                            readOnly
                            style={{ width: '380px', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </label>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Results:
                        <input
                            type="text"
                            value={laboratoryTest.Results}
                            readOnly
                            style={{ width: '380px', marginBottom: '20px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </label>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Notes:
                        <textarea
                            name="Notes"
                            value={laboratoryTest.Notes}
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
                        backgroundColor: '#f44336',
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

export default LaboratoryTestViewModal;
