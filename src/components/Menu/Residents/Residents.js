import React, { useState, useEffect } from 'react';
import Sidebar from '../../templates/Sidebar';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import residentsService from '../../services/residentsService';
import { toast } from 'react-toastify';
import ResidentCreateModal from './Modals/ResidentCreateModal'
import ResidentViewModal from './Modals/ResidentViewModal'
import ResidentUpdateModal from './Modals/ResidentUpdateModal'
import '../Health/CssFiles/Appointment.css'

const MySwal = withReactContent(Swal);

const Residents = () => {
  const [residents, setResidents] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    try {
      const response = await residentsService.getAllResidents(); // Fetch residents data
      if (response && Array.isArray(response)) {
        setResidents(response);
      } else {
        console.warn('Fetched data is not an array:', response);
        setResidents([]);
      }
    } catch (error) {
      console.error('Failed to fetch residents:', error);
      toast.error('Failed to fetch residents. ' + error.message);
    }
  };

  const handleNewResident = () => {
    setSelectedResident(null);
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateSubmit = async (data) => {
    try {
      const residentData = {
        Name: data.Name,
        Age: data.Age,
        Birthday: data.Birthday,
        Address: data.Address,
        Gender: data.Gender,
        Status: data.Status,
        BMI: data.BMI,
        Height: data.Height,
        Weight: data.Weight,
        BloodType: data.BloodType,
        is_senior: data.is_senior
      };

      await residentsService.createResident(residentData);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Resident created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false);
      fetchResidents();
    } catch (error) {
      console.error('Error creating resident:', error);
      toast.error('Failed to create resident: ' + error.message);
    }
  };

  const handleView = (resident) => {
    setSelectedResident(resident);
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedResident(null);
  };

  const handleUpdate = (resident) => {
    setSelectedResident(resident);
    setUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedResident(null);
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const updatedResident = {
        ...selectedResident, // Keep the existing resident details
        ...data, // Overwrite with the new form data
      };

      await residentsService.updateResident(updatedResident);
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Resident updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false);
      fetchResidents();
    } catch (error) {
      console.error('Error updating resident:', error);
      toast.error('Failed to update resident: ' + error.message);
    }
  };

  const handleDelete = async (residentID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this resident?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await residentsService.deleteResident(residentID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Resident has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchResidents();
      } catch (error) {
        console.error('Error deleting resident:', error);
        toast.error('Failed to delete resident: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">RESIDENTS</h2>

        <div className="button-container">
          <button className="new-record-button" onClick={handleNewResident}>
            + New Resident
          </button>
          <input
            type="text"
            placeholder="Search residents"
            className="search-input"
            // Implement search functionality if desired
          />
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Birthday</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Status</th>
                <th>BMI</th>
                <th>Height</th>
                <th>Weight</th>
                <th>Blood Type</th>
                <th>Is Senior</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(residents) && residents.length > 0 ? (
                residents.map((resident) => (
                  <tr key={resident.id}>
                    <td>{resident.Name}</td>
                    <td>{resident.Age}</td>
                    <td>{resident.Birthday}</td>
                    <td>{resident.Address}</td>
                    <td>{resident.Gender}</td>
                    <td>{resident.Status}</td>
                    <td>{resident.BMI}</td>
                    <td>{resident.Height}</td>
                    <td>{resident.Weight}</td>
                    <td>{resident.BloodType}</td>
                    <td>{resident.is_senior ? 'Yes' : 'No'}</td>
                    <td className="actions">
                      <button className="view-button" onClick={() => handleView(resident)}>
                        View
                      </button>
                      <button className="update-button" onClick={() => handleUpdate(resident)}>
                        Update
                      </button>
                      <button className="delete-button" onClick={() => handleDelete(resident.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" style={{ textAlign: 'center' }}>
                    No residents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for New Resident */}
      <ResidentCreateModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        onSubmit={handleCreateSubmit}
      />

      {/* Modal for Viewing Resident */}
      <ResidentViewModal
        isOpen={isViewModalOpen}
        onClose={handleViewModalClose}
        resident={selectedResident}
      />

      {/* Modal for Updating Resident */}
      <ResidentUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        onSave={handleUpdateSubmit}
        resident={selectedResident || {}}
      />
    </div>
  );
};

export default Residents;
