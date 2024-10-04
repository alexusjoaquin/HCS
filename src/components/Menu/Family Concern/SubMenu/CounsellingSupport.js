import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import CounsellingModal from '../Modals/CounsellingModal/CounsellingModal';
import CounsellingViewModal from '../Modals/CounsellingViewModal/CounsellingViewModal';
import CounsellingUpdateModal from '../Modals/CounsellingUpdateModal/CounsellingUpdateModal';
import familycounsellingService from '../../../services/familycounsellingService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const CounsellingSupport = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedCounselling, setSelectedCounselling] = useState(null);
  const [counsellingRecords, setCounsellingRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCounsellingRecords();
  }, []);

  const fetchCounsellingRecords = async () => {
    try {
      const response = await familycounsellingService.getAllFamilyCounselling();
      if (response && Array.isArray(response.counselingRecords)) {
        setCounsellingRecords(response.counselingRecords);
      } else {
        console.warn('Fetched data is not an array:', response);
        setCounsellingRecords([]);
      }
    } catch (error) {
      console.error('Failed to fetch counselling records:', error);
      toast.error('Failed to fetch counselling records. ' + error.message);
    }
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewRecord = () => {
    setSelectedCounselling(null);
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateSubmit = async (data) => {
    try {
      const counsellingData = {
        ServiceID: `S-${Math.floor(Date.now() / 1000)}`,
        ClientName: data.ClientName,
        Counselor: data.Counselor,
        DateOfSession: data.DateOfSession,
        Location: data.Location,
      };

      await familycounsellingService.createFamilyCounselling(counsellingData);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Counselling record created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false);
      fetchCounsellingRecords();
    } catch (error) {
      console.error('Error creating counselling record:', error);
      toast.error('Failed to create counselling record: ' + error.message);
    }
  };

  const handleView = (record) => {
    setSelectedCounselling(record);
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedCounselling(null);
  };

  const handleUpdate = (record) => {
    if (record) {
      setSelectedCounselling(record);
      setUpdateModalOpen(true);
    }
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedCounselling(null);
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const updatedRecord = {
        ServiceID: selectedCounselling.ServiceID,
        ClientName: data.ClientName,
        Counselor: data.Counselor,
        DateOfSession: data.DateOfSession,
        Location: data.Location,
      };

      await familycounsellingService.updateFamilyCounselling(updatedRecord);
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Counselling record updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false);
      fetchCounsellingRecords();
    } catch (error) {
      console.error('Error updating counselling record:', error);
      toast.error('Failed to update counselling record: ' + error.message);
    }
  };

  const handleDelete = async (serviceID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this counselling record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await familycounsellingService.deleteFamilyCounselling(serviceID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Counselling record has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchCounsellingRecords();
      } catch (error) {
        console.error('Error deleting counselling record:', error);
        toast.error('Failed to delete counselling record: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">COUNSELLING AND SUPPORT</h2>

        <div className="tabs">
          <ul className="tab-list">
            {[
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
                <th>Service ID</th>
                <th>Client Name</th>
                <th>Counselor</th>
                <th>Date of Session</th>
                <th>Location</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(counsellingRecords) && counsellingRecords.length > 0 ? (
                counsellingRecords.map((record) => (
                  <tr key={record.ServiceID}>
                    <td>{record.ServiceID}</td>
                    <td>{record.ClientName}</td>
                    <td>{record.Counselor}</td>
                    <td>{record.DateOfSession}</td>
                    <td>{record.Location}</td>
                    <td className="actions">
                      <button className="view-button" onClick={() => handleView(record)}>
                        View
                      </button>
                      <button className="update-button" onClick={() => handleUpdate(record)}>
                        Update
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(record.ServiceID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No counselling records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for New Counselling Record */}
      {isCreateModalOpen && (
        <CounsellingModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onSubmit={handleCreateSubmit}
        />
      )}

      {/* Modal for Viewing Counselling Record */}
      {isViewModalOpen && (
        <CounsellingViewModal
          isOpen={isViewModalOpen}
          onClose={handleViewModalClose}
          record={selectedCounselling}
        />
      )}

      {/* Modal for Updating Counselling Record */}
      {isUpdateModalOpen && (
        <CounsellingUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          onSubmit={handleUpdateSubmit}
          record={selectedCounselling}
        />
      )}
    </div>
  );
};

export default CounsellingSupport;
