import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import healthManagementService from '../../../services/healthManagemetService';
import HealthManagementModal from '../Modals/HealthManagementModal/HealthManagementModal';
import HealthManagementViewModal from '../Modals/HealthManagementViewModal/HealthManagementViewModal';
import HealthManagementUpdateModal from '../Modals/HealthManagementUpdateModal/HealthManagementUpdateModal';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const HealthManagement = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [healthRecords, setHealthRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHealthRecords();
  }, []);

  const fetchHealthRecords = async () => {
    try {
      const response = await healthManagementService.getAllRecords();
      if (response && Array.isArray(response)) {
        setHealthRecords(response);
      } else {
        console.warn('Fetched data is not an array:', response);
        setHealthRecords([]);
      }
    } catch (error) {
      console.error('Failed to fetch health records:', error);
      toast.error('Failed to fetch health records: ' + error.message);
    }
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewRecord = () => {
    setSelectedRecord(null);
    setModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const updatedRecord = {
        RecordID: selectedRecord.RecordID,
        SeniorName: data.SeniorName,
        ChronicCondition: data.ChronicCondition,
        Medication: data.Medication,
        LastCheckUp: data.LastCheckUp,
      };

      await healthManagementService.updateRecord(updatedRecord);
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Health record updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false);
      fetchHealthRecords();
    } catch (error) {
      console.error('Error updating health record:', error);
      toast.error('Failed to update health record: ' + error.message);
    }
  };

  const handleCreateSubmit = async (data) => {
    try {
      const newRecordData = {
        RecordID: `R-${Math.floor(Date.now() / 1000)}`,
        SeniorName: data.SeniorName,
        ChronicCondition: data.ChronicCondition,
        Medication: data.Medication,
        LastCheckUp: data.LastCheckUp,
      };

      await healthManagementService.createRecord(newRecordData);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Health record created successfully!',
        confirmButtonText: 'OK',
      });
      setModalOpen(false);
      fetchHealthRecords();
    } catch (error) {
      console.error('Error creating health record:', error);
      toast.error('Failed to create health record: ' + error.message);
    }
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setViewModalOpen(true);
  };

  const handleUpdate = (record) => {
    setSelectedRecord(record);
    setUpdateModalOpen(true);
  };

  const handleDelete = async (recordID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this health record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (result.isConfirmed) {
      try {
        await healthManagementService.deleteRecord(recordID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Health record has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchHealthRecords();
      } catch (error) {
        console.error('Error deleting health record:', error);
        toast.error('Failed to delete health record: ' + error.message);
      }
    }
  };
  

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">SENIOR CITIZEN HEALTH MANAGEMENT</h2>

        <div className="tabs">
          <ul className="tab-list">
            {[
              { label: 'Senior Citizen', path: '/seniorcitizen' },
              { label: 'Health Management', path: '/healthmanagement' },
              { label: 'Events & Activities', path: '/eventsandactivities' },
              { label: 'Social Service', path: '/socialservice' },
              { label: 'Benefits & Entitlements w/ Pension', path: '/benifitswithpension' },
              { label: 'Without Pension', path: '/benifitswithoutpension' },
              { label: 'Report and Analytics', path: '/seniorreportsandanalytics' }
            ].map((tab, index) => (
              <li key={index} onClick={() => handleTabClick(tab.path)} className="tab">
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="button-container">
          <button className="new-record-button" onClick={handleNewRecord}>
            + New Record
          </button>
          <input
            type="text"
            placeholder="Search records"
            className="search-input"
          />
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Senior Name</th>
                <th>Chronic Condition</th>
                <th>Medication</th>
                <th>Last Check-Up</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {healthRecords.length > 0 ? (
                healthRecords.map((record) => (
                  <tr key={record.RecordID}>
                    <td>{record.RecordID}</td>
                    <td>{record.SeniorName}</td>
                    <td>{record.ChronicCondition}</td>
                    <td>{record.Medication}</td>
                    <td>{record.LastCheckUp}</td>
                    <td className="actions">
                      <button className="view-button" onClick={() => handleView(record)}>
                        View
                      </button>
                      <button className="update-button" onClick={() => handleUpdate(record)}>
                        Update
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(record.RecordID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No health records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for New Health Record */}
      {isModalOpen && (
        <HealthManagementModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreateSubmit}
        />
      )}

      {/* Modal for Viewing Health Record */}
      {isViewModalOpen && (
        <HealthManagementViewModal
          isOpen={isViewModalOpen}
          onClose={handleViewModalClose}
          healthRecord={selectedRecord} // Pass the selected record here
        />
      )}


      {/* Modal for Updating Health Record */}
      {isUpdateModalOpen && (
        <HealthManagementUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          onSave={handleUpdateSubmit}
          healthRecord={selectedRecord} // Ensure this is passed correctly
        />
      )}
    </div>
  );
};

export default HealthManagement;
