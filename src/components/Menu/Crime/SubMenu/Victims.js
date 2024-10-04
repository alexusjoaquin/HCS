// src/components/Victims/Victims.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import VictimsModal from '../Modals/VictimsModal/VictimsModal'; // Ensure this modal is created
import VictimsViewModal from '../Modals/VictimsViewModal/VictimsViewModal'; // Ensure this modal is created
import VictimsUpdateModal from '../Modals/VictimsUpdateModal/VictimsUpdateModal'; // Ensure this modal is created
import victimsService from '../../../services/victimsService'; // Ensure this service is created
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Victims = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedVictim, setSelectedVictim] = useState(null);
  const [victims, setVictims] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVictims();
  }, []);

  const fetchVictims = async () => {
    try {
      const response = await victimsService.getAllVictims(); // Fetch victims from the service
      if (response && Array.isArray(response)) {
        setVictims(response);
      } else {
        console.warn('Fetched data is not an array:', response);
        setVictims([]);
      }
    } catch (error) {
      console.error('Failed to fetch victims:', error);
      toast.error('Failed to fetch victims. ' + error.message);
    }
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewVictim = () => {
    setSelectedVictim(null);
    setCreateModalOpen(true); // Open the create modal
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false); // Close the create modal
  };

  const handleCreateSubmit = async (data) => {
    try {
      const victimData = {
        VictimID: `V-${Math.floor(Date.now() / 1000)}`, // Example ID generation
        FullName: data.FullName,
        LastKnownAddress: data.LastKnownAddress,
        IncidentDate: data.IncidentDate,
        CaseStatus: data.CaseStatus,
      };

      await victimsService.createVictim(victimData);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Victim created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false); // Close the modal after submission
      fetchVictims(); // Refresh the victims list
    } catch (error) {
      console.error('Error creating victim:', error);
      toast.error('Failed to create victim: ' + error.message);
    }
  };

  const handleView = (victim) => {
    setSelectedVictim(victim);
    setViewModalOpen(true); // Open the view modal
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false); // Close the view modal
    setSelectedVictim(null); // Reset selected victim
  };

  const handleUpdate = (victim) => {
    setSelectedVictim(victim);
    setUpdateModalOpen(true); // Open the update modal
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false); // Close the update modal
    setSelectedVictim(null); // Reset selected victim
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const updatedVictim = {
        VictimID: selectedVictim.VictimID,  // Use the selected record's ID
        FullName: data.FullName,
        LastKnownAddress: data.LastKnownAddress,
        IncidentDate: data.IncidentDate,
        CaseStatus: data.CaseStatus,
      };

      await victimsService.updateVictim(updatedVictim); // Send to service
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Victim updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false); // Close modal after updating
      fetchVictims(); // Refresh the victims list
    } catch (error) {
      console.error('Error updating victim:', error);
      toast.error('Failed to update victim: ' + error.message);
    }
  };

  const handleDelete = async (victimID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this victim?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await victimsService.deleteVictim(victimID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Victim has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchVictims(); // Refresh the victims list
      } catch (error) {
        console.error('Error deleting victim:', error);
        toast.error('Failed to delete victim: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">VICTIMS</h2>

        <div className="tabs">
          <ul className="tab-list">
            {[
              { label: 'Crime Reports', path: '/crimereports' },
              { label: 'Incident Management', path: '/incidentmanagement' },
              { label: 'Investigation', path: '/investigation' },
              { label: 'Suspects', path: '/suspects' },
              { label: 'Victims', path: '/victims' },
              { label: 'Court Cases', path: '/courtcases' },
              { label: 'Report and Analytics', path: '/crimereportsandanalytics' },
            ].map((tab, index) => (
              <li key={index} onClick={() => handleTabClick(tab.path)} className="tab">
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="button-container">
          <button className="new-record-button" onClick={handleNewVictim}>
            + New Victim
          </button>
          <input
            type="text"
            placeholder="Search victims"
            className="search-input"
          />
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Victim ID</th>
                <th>Full Name</th>
                <th>Last Known Address</th>
                <th>Incident Date</th>
                <th>Case Status</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(victims) && victims.length > 0 ? (
                victims.map((victim) => (
                  <tr key={victim.VictimID}>
                    <td>{victim.VictimID}</td>
                    <td>{victim.FullName}</td>
                    <td>{victim.LastKnownAddress}</td>
                    <td>{victim.IncidentDate}</td>
                    <td>{victim.CaseStatus}</td>
                    <td className="actions">
                      <button className="view-button" onClick={() => handleView(victim)}>
                        View
                      </button>
                      <button className="update-button" onClick={() => handleUpdate(victim)}>
                        Update
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(victim.VictimID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No victims found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for New Victim */}
      {isCreateModalOpen && (
        <VictimsModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onSubmit={handleCreateSubmit}
        />
      )}

      {/* Modal for Viewing Victim */}
      {isViewModalOpen && (
        <VictimsViewModal
          isOpen={isViewModalOpen}
          onClose={handleViewModalClose}
          victim={selectedVictim} // Pass the selected victim
        />
      )}

      {isUpdateModalOpen && (
        <VictimsUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          onSave={handleUpdateSubmit}  // Change from onSubmit to onSave
          victim={selectedVictim} // Pass the selected victim for editing
        />
      )}
    </div>
  );
};

export default Victims;
