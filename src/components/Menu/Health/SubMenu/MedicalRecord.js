import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import MedRecordModal from '../Modals/MedRecordModal/MedRecordModal';
import MedRecordViewModal from '../Modals/MedRecordViewModal/MedRecordViewModal'; // Import the view modal
import MedRecordUpdateModal from '../Modals/MedRecordUpdateModal/MedRecordUpdateModal';
import '../CssFiles/MedicalRecord.css';

const MedicalRecord = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false); // New state for update modal
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewRecord = (data) => {
    console.log('New Record Submitted:', data);
    // Optionally, update your records state to include this new record
  };

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setViewModalOpen(true);
  };

  const handleUpdateRecord = (updatedRecord) => {
    console.log('Updated Record:', updatedRecord);
    // Update your records state with the updated record
    setUpdateModalOpen(false);
  };

  const handleUpdateClick = (record) => {
    setSelectedRecord(record);
    setUpdateModalOpen(true); // Open the update modal
  };

  const mockRecords = [
    {
      fullname: "Jonard Matados",
      dateOfConfinement: "08/20/2024",
      diagnostic: "Hypertension",
      dateOfDischarge: "08/20/2024",
    },
    // Add more mock records as needed
  ];

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">MEDICAL RECORDS</h2>

        {/* Tabs Section */}
        <div className="tabs">
          <ul className="tabList">
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
                className="tabItem"
              >
                {tab.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="buttonContainer">
          <button className="newRecordButton" onClick={() => setModalOpen(true)}>+ New Record</button>
          <input 
            type="text" 
            placeholder="Search records" 
            className="searchInput" 
          />
        </div>

        <div className="tableContainer">
          <table className="table">
            <thead>
              <tr className="tableHeader">
                <th>Fullname</th>
                <th>Date of Confinement</th>
                <th>Diagnostic</th>
                <th>Date of Discharge</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockRecords.map((record, index) => (
                <tr key={index} className="tableRow">
                  <td>{record.fullname}</td>
                  <td>{record.dateOfConfinement}</td>
                  <td>{record.diagnostic}</td>
                  <td>{record.dateOfDischarge}</td>
                  <td className="actions">
                    <button 
                      className="actionButton viewButton" 
                      onClick={() => handleViewRecord(record)} // Open view modal with the record
                    >
                      View
                    </button>
                    <button 
                      className="actionButton updateButton" 
                      onClick={() => handleUpdateClick(record)} // Open update modal with the record
                    >
                      Update
                    </button>
                    <button className="actionButton deleteButton">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Component for New Record */}
      <MedRecordModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleNewRecord}
      />

      {/* Modal Component for Viewing Record */}
      <MedRecordViewModal
        isOpen={isViewModalOpen}
        onClose={() => setViewModalOpen(false)}
        medicalRecord={selectedRecord}
      />

      {/* Modal Component for Updating Record */}
      <MedRecordUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onSave={handleUpdateRecord}
        medicalRecord={selectedRecord} // Ensure this is checked
      />
    </div>
  );
};

export default MedicalRecord;
