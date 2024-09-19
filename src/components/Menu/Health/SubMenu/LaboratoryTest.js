import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import LaboratoryTestModal from '../Modals/LaboratoryTestModal/LaboratoryTestModal';
import LaboratoryTestViewModal from '../Modals/LaboratoryTestViewModal/LaboratoryTestViewModal';
import LaboratoryTestUpdateModal from '../Modals/LaboratoryTestUpdateModal/LaboratoryTestUpdateModal'; // Import the new modal
import '../CssFiles/LaboratoryTest.css';

const LaboratoryTest = () => {
    const [isNewRecordModalOpen, setIsNewRecordModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // State for the update modal
    const [selectedTest, setSelectedTest] = useState(null);
    const navigate = useNavigate();

    const handleTabClick = (path) => {
        navigate(path);
    };

    const handleNewRecordClick = () => {
        setIsNewRecordModalOpen(true);
    };

    const handleViewClick = (test) => {
        setSelectedTest(test);
        setIsViewModalOpen(true);
    };

    const handleUpdateClick = (test) => {
        setSelectedTest(test);
        setIsUpdateModalOpen(true);
    };

    const handleModalClose = () => {
        setIsNewRecordModalOpen(false);
        setIsViewModalOpen(false);
        setIsUpdateModalOpen(false); // Close the update modal
        setSelectedTest(null);
    };

    const handleUpdateSubmit = (updatedTest) => {
        console.log('Updated Laboratory Test Data:', updatedTest);
        // Here you can add logic to update the test in your data source
        handleModalClose(); // Close the modal after submission
    };

    // Sample test data
    const tests = [
        { id: 1, patientName: 'Jonard Matados', testTaken: 'Urine Test', testResult: 'High Creatine' },
        { id: 2, patientName: 'Jane Doe', testTaken: 'Blood Test', testResult: 'Normal' },
    ];

    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <h2 className="header">LABORATORY TESTS</h2>

                <div className="tabs">
                    <ul className="tab-list">
                        {[
                            { name: 'Patient Management', path: '/patientmanagement' },
                            { name: 'Appointments', path: '/appointment' },
                            { name: 'Medical Records', path: '/medicalrecords' },
                            { name: 'Laboratory Test', path: '/laboratorytest' },
                            { name: 'Bills and Payments', path: '/billspayment' },
                            { name: 'Report and Analytics', path: '/reportsandanalytics' }
                        ].map((tab, index) => (
                            <li
                                key={index}
                                onClick={() => handleTabClick(tab.path)}
                                className="tab"
                            >
                                {tab.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="button-container">
                    <button className="new-record-button" onClick={handleNewRecordClick}>+ New Record</button>
                    <input
                        type="text"
                        placeholder="Search records"
                        className="search-input"
                    />
                </div>

                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr className="table-header">
                                <th className="table-cell">Patient Name</th>
                                <th className="table-cell">Test Taken</th>
                                <th className="table-cell">Test Result</th>
                                <th className="table-cell actions">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tests.map((test, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td className="table-cell">{test.patientName}</td>
                                    <td className="table-cell">{test.testTaken}</td>
                                    <td className="table-cell">{test.testResult}</td>
                                    <td className="table-cell actions">
                                        <button
                                            className="action-button view-button"
                                            onClick={() => handleViewClick(test)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="action-button update-button"
                                            onClick={() => handleUpdateClick(test)} // Open the update modal
                                        >
                                            Update
                                        </button>
                                        <button className="action-button delete-button">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* New Record Modal */}
            <LaboratoryTestModal
                isOpen={isNewRecordModalOpen}
                onClose={handleModalClose}
                onSubmit={(data) => {
                    console.log('New Laboratory Test Data:', data);
                    handleModalClose(); // Close the modal after submission
                }}
            />

            {/* View Record Modal */}
            <LaboratoryTestViewModal
                isOpen={isViewModalOpen}
                onClose={handleModalClose}
                laboratoryTest={selectedTest}
            />

            {/* Update Record Modal */}
            <LaboratoryTestUpdateModal
                isOpen={isUpdateModalOpen}
                onClose={handleModalClose}
                onSave={handleUpdateSubmit}
                test={selectedTest}
            />
        </div>
    );
};

export default LaboratoryTest;
