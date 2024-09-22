// src/components/MedicalRecords/MedicalRecord.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import MedRecordModal from '../Modals/MedRecordModal/MedRecordModal';
import MedRecordViewModal from '../Modals/MedRecordViewModal/MedRecordViewModal';
import MedRecordUpdateModal from '../Modals/MedRecordUpdateModal/MedRecordUpdateModal';
import medicalRecordService from '../../../services/medicalRecordService'; 
import '../CssFiles/MedicalRecord.css';
import { toast } from 'react-toastify'; // For notifications
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const MedicalRecord = () => {
  const navigate = useNavigate();
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // For search functionality

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const fetchMedicalRecords = async () => {
    try {
      const data = await medicalRecordService.getAllMedicalRecords();
      console.log('Fetched medical records:', data); // Debugging line
      setMedicalRecords(data);
    } catch (error) {
      console.error('Failed to fetch medical records:', error);
      toast.error('Failed to fetch medical records.');
    }
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewRecord = async (data) => {
    try {
      // Assuming the backend generates RecordID, otherwise generate it here
      const recordData = {
        // RecordID is handled by the backend
        PatientID: data.PatientID,
        DoctorID: data.DoctorID,
        Date: data.Date,
        Diagnosis: data.Diagnosis,
        Treatment: data.Treatment,
        Notes: data.Notes,
      };
      const response = await medicalRecordService.createMedicalRecord(recordData);
      console.log('Medical record created:', response);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Medical record created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false); // Close the modal
      fetchMedicalRecords(); // Refresh the list
    } catch (error) {
      console.error('Error creating medical record:', error);
      toast.error('Failed to create medical record.');
    }
  };

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setViewModalOpen(true);
  };

  const handleUpdateRecord = async (data) => {
    try {
      const recordData = {
        RecordID: data.RecordID,
        PatientID: data.PatientID,
        DoctorID: data.DoctorID,
        Date: data.Date,
        Diagnosis: data.Diagnosis,
        Treatment: data.Treatment,
        Notes: data.Notes,
      };
      const updatedAttributes = await medicalRecordService.updateMedicalRecord(recordData);
      console.log('Medical record updated:', updatedAttributes);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Medical record updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false); // Close the modal
      fetchMedicalRecords(); // Refresh the list
    } catch (error) {
      console.error('Error updating medical record:', error);
      toast.error('Failed to update medical record.');
    }
  };

  const handleDeleteRecord = async (recordID) => {
    // Integrate SweetAlert2 confirm dialog
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this medical record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await medicalRecordService.deleteMedicalRecord(recordID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Medical record has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchMedicalRecords(); // Refresh the list
      } catch (error) {
        console.error('Error deleting medical record:', error);
        toast.error('Failed to delete medical record.');
      }
    }
    // If canceled, do nothing
  };

  // Filtered records based on search query
  const filteredRecords = medicalRecords.filter((record) =>
    Object.values(record).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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

        {/* Action Buttons */}
        <div className="buttonContainer">
          <button className="newRecordButton" onClick={() => setCreateModalOpen(true)}>+ New Record</button>
          <input 
            type="text" 
            placeholder="Search records" 
            className="searchInput" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Medical Records Table */}
        <div className="tableContainer">
          <table className="table">
            <thead>
              <tr className="tableHeader">
                <th>Record ID</th>
                <th>Patient ID</th>
                <th>Doctor ID</th>
                <th>Date</th>
                <th>Diagnosis</th>
                <th>Treatment</th>
                <th>Notes</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.RecordID} className="tableRow">
                    <td>{record.RecordID}</td>
                    <td>{record.PatientID}</td>
                    <td>{record.DoctorID}</td>
                    <td>{record.Date}</td>
                    <td>{record.Diagnosis}</td>
                    <td>{record.Treatment}</td>
                    <td>{record.Notes}</td>
                    <td className="actions">
                      <button 
                        className="actionButton viewButton" 
                        onClick={() => handleViewRecord(record)}
                      >
                        View
                      </button>
                      <button 
                        className="actionButton updateButton" 
                        onClick={() => setSelectedRecord(record) || setUpdateModalOpen(true)}
                      >
                        Update
                      </button>
                      <button
                        className="actionButton deleteButton"
                        onClick={() => handleDeleteRecord(record.RecordID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center' }}>
                    No medical records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Component for New Record */}
      <MedRecordModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
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
        medicalRecord={selectedRecord}
      />
    </div>
  );
};

export default MedicalRecord;
