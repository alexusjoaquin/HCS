// src/components/CourtCases/CourtCases.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Sidebar from '../../../templates/Sidebar';
import CourtcasesUpdateModal from '../Modals/CourtcasesUpdateModal/CourtcasesUpdateModal';
import CourtcasesViewModal from '../Modals/CourtcasesViewModal/CourtcasesViewModal';
import CourtcasesModal from '../Modals/CourtcasesModal/CourtcasesModal';
import courtcasesService from '../../../services/courtcasesService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const CourtCases = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [courtCases, setCourtCases] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchCourtCases();
  }, []);

  const fetchCourtCases = async () => {
    try {
      const response = await courtcasesService.getAllCourtCases(); // Fetch court cases
      if (response && Array.isArray(response)) {
        setCourtCases(response);
      } else {
        console.warn('Fetched data is not an array:', response);
        setCourtCases([]);
      }
    } catch (error) {
      console.error('Failed to fetch court cases:', error);
      toast.error('Failed to fetch court cases. ' + error.message);
    }
  };

  const handleTabClick = (path) => {
    navigate(path); 
  };

  const handleNewCase = () => {
    setSelectedCase(null);
    setCreateModalOpen(true); // Open the create modal
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false); // Close the create modal
  };

  const handleCreateSubmit = async (data) => {
    try {
      const courtCaseData = {
        CaseID: `C-${Math.floor(Date.now() / 1000)}`, // Example ID generation
        CourtName: data.CourtName,
        CaseStatus: data.CaseStatus,
      };

      await courtcasesService.createCourtCase(courtCaseData);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Court case created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false); // Close the modal after submission
      fetchCourtCases(); // Refresh the court cases list
    } catch (error) {
      console.error('Error creating court case:', error);
      toast.error('Failed to create court case: ' + error.message);
    }
  };

  const handleView = (courtCase) => {
    setSelectedCase(courtCase);
    setViewModalOpen(true); // Open the view modal
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false); // Close the view modal
    setSelectedCase(null); // Reset selected case
  };

  const handleUpdate = (courtCase) => {
    setSelectedCase(courtCase);
    setUpdateModalOpen(true); // Open the update modal
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false); // Close the update modal
    setSelectedCase(null); // Reset selected case
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const updatedCase = {
        CaseID: selectedCase.CaseID,  // Use the selected case's ID
        CourtName: data.CourtName,
        CaseStatus: data.CaseStatus,
      };

      await courtcasesService.updateCourtCase(updatedCase); // Send to service
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Court case updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false); // Close modal after updating
      fetchCourtCases(); // Refresh the court cases list
    } catch (error) {
      console.error('Error updating court case:', error);
      toast.error('Failed to update court case: ' + error.message);
    }
  };

  const handleDelete = async (caseID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this court case?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await courtcasesService.deleteCourtCase(caseID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Court case has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchCourtCases(); // Refresh the court cases list
      } catch (error) {
        console.error('Error deleting court case:', error);
        toast.error('Failed to delete court case: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">COURT CASES</h2>

        <div className="tabs">
          <ul className="tab-list">
            {[  // Tab navigation
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
          <button className="new-record-button" onClick={handleNewCase}>
            + New Case
          </button>
          <input
            type="text"
            placeholder="Search cases"
            className="search-input"
          />
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Court Name</th>
                <th>Case Status</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(courtCases) && courtCases.length > 0 ? (
                courtCases.map((courtCase) => (
                  <tr key={courtCase.CaseID}>
                    <td>{courtCase.CaseID}</td>
                    <td>{courtCase.CourtName}</td>
                    <td>{courtCase.CaseStatus}</td>
                    <td className="actions">
                      <button className="view-button" onClick={() => handleView(courtCase)}>
                        View
                      </button>
                      <button className="update-button" onClick={() => handleUpdate(courtCase)}>
                        Update
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(courtCase.CaseID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>
                    No court cases found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for New Case */}
      {isCreateModalOpen && (
        <CourtcasesModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onSubmit={handleCreateSubmit}
        />
      )}

      {/* Modal for Viewing Case */}
      {isViewModalOpen && (
        <CourtcasesViewModal
          isOpen={isViewModalOpen}
          onClose={handleViewModalClose}
          courtCase={selectedCase} // Pass the selected court case
        />
      )}

      {/* Modal for Updating Case */}
      {isUpdateModalOpen && (
        <CourtcasesUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          onSave={handleUpdateSubmit} // Change from onSubmit to onSave
          courtCase={selectedCase} // Pass the selected court case for updating
        />
      )}

    </div>
  );
};

export default CourtCases;
