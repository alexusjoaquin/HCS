import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import suspectService from '../../../services/suspectService'; // Adjust the path if necessary
import SuspectModal from '../Modals/SuspectModal/SuspectModal';
import SuspectViewModal from '../Modals/SuspectViewModal/SuspectViewModal';
import SuspectUpdateModal from '../Modals/SuspectUpdateModal/SuspectUpdateModal';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Suspects = () => {
  const [suspects, setSuspects] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuspects();
  }, []);

  const fetchSuspects = async () => {
    try {
      const response = await suspectService.getAllSuspects();
      if (response && Array.isArray(response)) {
        setSuspects(response);
      } else {
        console.warn('Fetched data is not an array:', response);
        setSuspects([]);
      }
    } catch (error) {
      console.error('Failed to fetch suspects:', error);
      toast.error('Failed to fetch suspects. ' + error.message);
    }
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewSuspect = () => {
    setSelectedSuspect(null);
    setCreateModalOpen(true); // Open the create modal
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false); // Close the create modal
  };

  const handleCreateSubmit = async (data) => {
    try {
      const suspectData = {
        SuspectID: `SUS-${Math.floor(Date.now() / 1000)}`, // Generate Suspect ID based on timestamp
        FullName: data.FullName,
        Alias: data.Alias,
        LastKnownAddress: data.LastKnownAddress,
        Status: data.Status,
      };

      await suspectService.createSuspect(suspectData);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Suspect created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false); // Close the modal after submission
      fetchSuspects(); // Refresh the suspects list
    } catch (error) {
      console.error('Error creating suspect:', error);
      toast.error('Failed to create suspect: ' + error.message); // Show error notification
    }
  };

  const handleView = (suspect) => {
    setSelectedSuspect(suspect);
    setViewModalOpen(true); // Open the view modal
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false); // Close the view modal
    setSelectedSuspect(null); // Reset selected suspect
  };

  const handleUpdate = (suspect) => {
    setSelectedSuspect(suspect);
    setUpdateModalOpen(true); // Open the update modal
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false); // Close the update modal
    setSelectedSuspect(null); // Reset selected suspect
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const updatedSuspect = {
        SuspectID: selectedSuspect.SuspectID, // Use the selected record's ID
        FullName: data.FullName,
        Alias: data.Alias,
        LastKnownAddress: data.LastKnownAddress,
        Status: data.Status,
      };

      await suspectService.updateSuspect(updatedSuspect); // Send to service
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Suspect updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false); // Close modal after updating
      fetchSuspects(); // Refresh the suspects list
    } catch (error) {
      console.error('Error updating suspect:', error);
      toast.error('Failed to update suspect: ' + error.message);
    }
  };

  const handleDelete = async (suspectID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this suspect?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await suspectService.deleteSuspect(suspectID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Suspect has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchSuspects(); // Refresh the suspects list
      } catch (error) {
        console.error('Error deleting suspect:', error);
        toast.error('Failed to delete suspect: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">SUSPECTS</h2>

        <div className="tabs">
          <ul className="tab-list">
            {[
              { label: 'Crime Reports', path: '/crimereports' },
              { label: 'Suspects', path: '/suspects' },
              { label: 'Victims', path: '/victims' },
            ].map((tab, index) => (
              <li key={index} onClick={() => handleTabClick(tab.path)} className="tab">
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="button-container">
          <button className="new-record-button" onClick={handleNewSuspect}>
            + New Suspect
          </button>
          <input
            type="text"
            placeholder="Search suspects"
            className="search-input"
          />
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Suspect ID</th>
                <th>Full Name</th>
                <th>Alias</th>
                <th>Last Known Address</th>
                <th>Status</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(suspects) && suspects.length > 0 ? (
                suspects.map((suspect) => (
                  <tr key={suspect.SuspectID}>
                    <td>{suspect.SuspectID}</td>
                    <td>{suspect.FullName}</td>
                    <td>{suspect.Alias}</td>
                    <td>{suspect.LastKnownAddress}</td>
                    <td>{suspect.Status}</td>
                    <td className="actions">
                      <button className="view-button" onClick={() => handleView(suspect)}>
                        View
                      </button>
                      <button className="update-button" onClick={() => handleUpdate(suspect)}>
                        Update
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(suspect.SuspectID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No suspects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal for New Suspect */}
        {isCreateModalOpen && (
          <SuspectModal
            isOpen={isCreateModalOpen}
            onClose={handleCreateModalClose}
            onSubmit={handleCreateSubmit}
          />
        )}

        {/* Modal for Viewing Suspect */}
        {isViewModalOpen && (
          <SuspectViewModal
            isOpen={isViewModalOpen}
            onClose={handleViewModalClose}
            suspect={selectedSuspect} // Pass the selected suspect
          />
        )}


        {isUpdateModalOpen && (
          <SuspectUpdateModal
            isOpen={isUpdateModalOpen}
            onClose={handleUpdateModalClose}
            onSave={handleUpdateSubmit} // Ensure this is correctly passed
            suspect={selectedSuspect} // Pass the selected suspect for updating
          />
        )}

      </div>
    </div>
  );
};

export default Suspects;
