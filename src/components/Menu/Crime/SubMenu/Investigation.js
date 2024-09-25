// src/components/Investigation/Investigation.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import InvestigationsModal from '../Modals/InvestigationsModal/InvestigationsModal';
import InvestigationsViewModal from '../Modals/InvestigationsViewModal/InvestigationsViewModal';
import InvestigationsUpdateModal from '../Modals/InvestigationsUpdateModal/InvestigationsUpdateModal';
import investigationService from '../../../services/investigationService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Investigation = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedInvestigation, setSelectedInvestigation] = useState(null);
  const [investigations, setInvestigations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvestigations();
  }, []);

  const fetchInvestigations = async () => {
    try {
      const response = await investigationService.getAllInvestigations();
      if (response && Array.isArray(response)) {
        setInvestigations(response);
      } else {
        console.warn('Fetched data is not an array:', response);
        setInvestigations([]);
      }
    } catch (error) {
      console.error('Failed to fetch investigations:', error);
      toast.error('Failed to fetch investigations. ' + error.message);
    }
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewInvestigation = () => {
    setSelectedInvestigation(null);
    setCreateModalOpen(true); // Open the create modal
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false); // Close the create modal
  };

  const handleCreateSubmit = async (data) => {
    try {
      const investigationData = {
        InvestigationID: `INV-${Math.floor(Date.now() / 1000)}`,
        CaseTitle: data.CaseTitle,
        Investigator: data.Investigator,
        Status: data.Status,
        DateOpened: data.DateOpened,
      };

      await investigationService.createInvestigation(investigationData);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Investigation created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false); // Close the modal after submission
      fetchInvestigations(); // Refresh the investigations list
    } catch (error) {
      console.error('Error creating investigation:', error);
      toast.error('Failed to create investigation: ' + error.message);
    }
  };

  const handleView = (investigation) => {
    setSelectedInvestigation(investigation);
    setViewModalOpen(true); // Open the view modal
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false); // Close the view modal
    setSelectedInvestigation(null); // Reset selected investigation
  };

  const handleUpdate = (investigation) => {
    setSelectedInvestigation(investigation);
    setUpdateModalOpen(true); // Open the update modal
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false); // Close the update modal
    setSelectedInvestigation(null); // Reset selected investigation
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const updatedInvestigation = {
        InvestigationID: selectedInvestigation.InvestigationID,  // Use the selected record's ID
        CaseTitle: data.CaseTitle,
        Investigator: data.Investigator,
        Status: data.Status,
        DateOpened: data.DateOpened,
      };

      await investigationService.updateInvestigation(updatedInvestigation); // Send to service
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Investigation updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false); // Close modal after updating
      fetchInvestigations(); // Refresh the investigations list
    } catch (error) {
      console.error('Error updating investigation:', error);
      toast.error('Failed to update investigation: ' + error.message);
    }
  };


  const handleDelete = async (investigationID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this investigation?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await investigationService.deleteInvestigation(investigationID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Investigation has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchInvestigations(); // Refresh the investigations list
      } catch (error) {
        console.error('Error deleting investigation:', error);
        toast.error('Failed to delete investigation: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">INVESTIGATION</h2>

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
          <button className="new-record-button" onClick={handleNewInvestigation}>
            + New Investigation
          </button>
          <input
            type="text"
            placeholder="Search investigations"
            className="search-input"
          />
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Investigation ID</th>
                <th>Case Title</th>
                <th>Investigator</th>
                <th>Status</th>
                <th>Date Opened</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(investigations) && investigations.length > 0 ? (
                investigations.map((investigation) => (
                  <tr key={investigation.InvestigationID}>
                    <td>{investigation.InvestigationID}</td>
                    <td>{investigation.CaseTitle}</td>
                    <td>{investigation.Investigator}</td>
                    <td>{investigation.Status}</td>
                    <td>{investigation.DateOpened}</td>
                    <td className="actions">
                      <button className="view-button" onClick={() => handleView(investigation)}>
                        View
                      </button>
                      <button className="update-button" onClick={() => handleUpdate(investigation)}>
                        Update
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(investigation.InvestigationID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No investigations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for New Investigation */}
      {isCreateModalOpen && (
        <InvestigationsModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onSubmit={handleCreateSubmit}
        />
      )}

      {/* Modal for Viewing Investigation */}
      {isViewModalOpen && (
        <InvestigationsViewModal
          isOpen={isViewModalOpen}
          onClose={handleViewModalClose}
          investigation={selectedInvestigation} // Pass the selected investigation
        />
      )}

      {isUpdateModalOpen && (
        <InvestigationsUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          onSave={handleUpdateSubmit}  // Change from onSubmit to onSave
          investigation={selectedInvestigation}  // Pass the selected investigation for updating
        />
      )}

    </div>
  );
};

export default Investigation;
