import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../templates/Sidebar';
import SeniorCitizenModal from './Modals/SeniorCitizenModal/SeniorCitizenModal';
import SeniorCitizenViewModal from './Modals/SeniorCitizenViewModal/SeniorCitizenViewModal';
import SeniorCitizenUpdateModal from './Modals/SeniorCitizenUpdateModal/SeniorCitizenUpdateModal';
import seniorcitizenService from '../../services/seniorcitizenService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const SeniorCitizen = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedSeniorCitizen, setSelectedSeniorCitizen] = useState(null);
  const [seniorCitizens, setSeniorCitizens] = useState([]);
  const navigate = useNavigate();

  // Fetch senior citizens data when component loads
  useEffect(() => {
    fetchSeniorCitizens();
  }, []);

  const fetchSeniorCitizens = async () => {
    try {
      const response = await seniorcitizenService.getAllSeniorCitizens();
      console.log('Fetched senior citizens:', response); // Log the response
      setSeniorCitizens(response);
    } catch (error) {
      console.error('Failed to fetch senior citizens:', error);
    }
  };

  // Tab navigation
  const handleTabClick = (path) => {
    navigate(path);
  };

  // Handlers for Modals
  const handleNewRecord = () => {
    setSelectedSeniorCitizen(null);
    setCreateModalOpen(true); // Open create modal
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false); // Close create modal
  };

  const handleCreateSubmit = async (data) => {
    try {
      const seniorCitizenData = {
        SeniorID: `S-${Math.floor(Date.now() / 1000)}`, // Example ID generation
        FullName: data.FullName,
        Address: data.Address,
        DateOfBirth: data.DateOfBirth,
        ContactInfo: data.ContactInfo, // Use the object directly
        Gender: data.Gender,
        MedicalHistory: data.MedicalHistory,
      };
  
      await seniorcitizenService.createSeniorCitizen(seniorCitizenData);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Senior Citizen record created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false); // Close modal after submit
      fetchSeniorCitizens(); // Refresh the list
    } catch (error) {
      console.error('Error creating record:', error);
    }
  };

  const handleView = (seniorCitizen) => {
    setSelectedSeniorCitizen(seniorCitizen);
    setViewModalOpen(true); // Open view modal
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false); // Close view modal
    setSelectedSeniorCitizen(null);
  };

  const handleUpdate = (seniorCitizen) => {
    setSelectedSeniorCitizen(seniorCitizen);
    setUpdateModalOpen(true); // Open update modal
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false); // Close update modal
    setSelectedSeniorCitizen(null);
  };

  /*
  const handleUpdateSubmit = async (data) => {
    try {
      const updatedSeniorCitizen = {
        SeniorID: selectedSeniorCitizen.SeniorID, // Use existing ID
        FullName: data.FullName,
        Address: data.Address,
        DateOfBirth: data.DateOfBirth,
        ContactInfo: { Phone: data.ContactInfo.Phone }, // Make sure to include Phone
        Gender: data.Gender,
        MedicalHistory: data.MedicalHistory,
      };

      await seniorcitizenService.updateSeniorCitizen(updatedSeniorCitizen);
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Senior Citizen record updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false); // Close modal after updating
      fetchSeniorCitizens(); // Refresh the list
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  */

  const handleDelete = async (seniorCitizenID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await seniorcitizenService.deleteSeniorCitizen(seniorCitizenID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Record has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchSeniorCitizens(); // Refresh the list
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px', marginLeft: '250px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '30px', color: "#0B8769", marginLeft: '50px' }}>
          SENIOR CITIZEN
        </h2>

        {/* Tabs */}
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', marginLeft: '50px' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', alignItems: 'center' }}>
            {[
            ].map((tab, index) => (
              <li
                key={index}
                onClick={() => handleTabClick(tab.path)}
                style={{
                  marginRight: '10px',
                  cursor: 'pointer',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  backgroundColor: '#0B8769',
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  minWidth: '150px',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Search and Add */}
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <button onClick={handleNewRecord} style={{ marginLeft: 'auto', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
            + New Record
          </button>
          <input type="text" placeholder="Search records" style={{ padding: '10px', width: '200px', borderRadius: '5px', border: '1px solid #ccc', marginLeft: '20px' }} />
        </div>

        <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '5px', marginLeft: '50px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'center' }}>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>SeniorID</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>FullName</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Address</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Date of Birth</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Contact no.</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Gender</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>MedicalHistory</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {seniorCitizens.map((seniorCitizen) => (
                <tr key={seniorCitizen.SeniorID} style={{ textAlign: 'center' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{seniorCitizen.SeniorID}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{seniorCitizen.FullName}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{seniorCitizen.Address}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{seniorCitizen.DateOfBirth}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{seniorCitizen.ContactInfo?.Phone}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{seniorCitizen.Gender}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{seniorCitizen.MedicalHistory}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                    <button onClick={() => handleView(seniorCitizen)} style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
                      View
                    </button>
                    <button onClick={() => handleUpdate(seniorCitizen)} style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px' }}>
                      Update
                    </button>
                    <button onClick={() => handleDelete(seniorCitizen.SeniorID)} style={{ padding: '5px 10px', backgroundColor: '#F44336', color: 'white', border: 'none', borderRadius: '5px' }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modals */}
        {isCreateModalOpen && (
          <SeniorCitizenModal
            isOpen={isCreateModalOpen}
            onClose={handleCreateModalClose}
            onSubmit={handleCreateSubmit}
          />
        )}

        {isViewModalOpen && (
          <SeniorCitizenViewModal
            isOpen={isViewModalOpen}
            onClose={handleViewModalClose}
            seniorCitizen={selectedSeniorCitizen}
          />
        )}

        {/*
        {isUpdateModalOpen && (
          <SeniorCitizenUpdateModal
            isOpen={isUpdateModalOpen}
            onClose={handleUpdateModalClose}
            seniorCitizen={selectedSeniorCitizen}
            onSubmit={handleUpdateSubmit}
          />
        )}*/}
      </div>
    </div>
  );
};

export default SeniorCitizen;
