import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import financialService from '../../../services/financialService';
import FinancialModal from '../Modals/FinancialModal/FinancialModal';
import FinancialViewModal from '../Modals/FinancialViewModal/FinancialViewModal';
import FinancialUpdateModal from '../Modals/FinancialUpdateModal/FinancialUpdateModal';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const FinancialAssistance = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedAssistance, setSelectedAssistance] = useState(null);
  const [assistanceRecords, setAssistanceRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssistanceRecords();
  }, []);

  const fetchAssistanceRecords = async () => {
    try {
      const response = await financialService.getAllFinancialAssistance();
      if (response && response.financialAssistanceRecords) {
        setAssistanceRecords(response.financialAssistanceRecords);
      } else {
        console.warn('Fetched data does not contain assistance records:', response);
        setAssistanceRecords([]);
      }
    } catch (error) {
      console.error('Failed to fetch assistance records:', error);
      toast.error('Failed to fetch assistance records. ' + error.message);
    }
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewRecord = () => {
    setSelectedAssistance(null);
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateSubmit = async (data) => {
    try {
      const assistanceData = {
        AssistanceID: `ASSIST-${Math.floor(Date.now() / 1000)}`,
        ApplicantName: data.ApplicantName,
        DateRequested: data.DateRequested,
        Amount: data.Amount,
        Status: data.Status,
      };

      await financialService.createFinancialAssistance(assistanceData);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Assistance record created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false);
      fetchAssistanceRecords();
    } catch (error) {
      console.error('Error creating assistance record:', error);
      toast.error('Failed to create assistance record: ' + error.message);
    }
  };

  const handleView = (record) => {
    setSelectedAssistance(record);
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedAssistance(null);
  };

  const handleUpdate = (record) => {
    if (record) {
      setSelectedAssistance(record);
      setUpdateModalOpen(true);
    }
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedAssistance(null);
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const updatedRecord = {
        AssistanceID: selectedAssistance.AssistanceID,
        ApplicantName: data.ApplicantName,
        DateRequested: data.DateRequested,
        Amount: data.Amount,
        Status: data.Status,
      };

      await financialService.updateFinancialAssistance(updatedRecord);
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Assistance record updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false);
      fetchAssistanceRecords();
    } catch (error) {
      console.error('Error updating assistance record:', error);
      toast.error('Failed to update assistance record: ' + error.message);
    }
  };

  const handleDelete = async (assistanceID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this assistance record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await financialService.deleteFinancialAssistance(assistanceID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Assistance record has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchAssistanceRecords();
      } catch (error) {
        console.error('Error deleting assistance record:', error);
        toast.error('Failed to delete assistance record: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">FINANCIAL ASSISTANCE</h2>

        <div className="tabs">
          <ul className="tab-list">
            {[
              { label: <><span>Family</span><br /><span>Profiles</span></>, path: '/familyprofiles' },
              { label: <><span>Member</span><br /><span>Management</span></>, path: '/membermanagement' },
              { label: <><span>Health</span><br /><span>& Well Being</span></>, path: '/healthandwellbeing' },
              { label: <><span>Member</span><br /><span>Education</span></>, path: '/education' },
              { label: <><span>Financial</span><br /><span>Assistance</span></>, path: '/financialassistance' },
              { label: <><span>Social</span><br /><span>Services</span></>, path: '/familysocialservices' },
              { label: <><span>Counselling</span><br /><span>& Support</span></>, path: '/counsellingsupport' },
              { label: <><span>Events</span><br /><span>& Activities</span></>, path: '/familyeventsandactivities' },
              { label: <><span>Report</span><br /><span>& Analytics</span></>, path: '/familyreportsandanalytics' },
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
                <th>Assistance ID</th>
                <th>Applicant Name</th>
                <th>Date Requested</th>
                <th>Amount</th>
                <th>Status</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(assistanceRecords) && assistanceRecords.length > 0 ? (
                assistanceRecords.map((record) => (
                  <tr key={record.AssistanceID}>
                    <td>{record.AssistanceID}</td>
                    <td>{record.ApplicantName}</td>
                    <td>{record.DateRequested}</td>
                    <td>{Number(record.Amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                    <td>{record.Status}</td>
                    <td className="actions">
                      <button className="view-button" onClick={() => handleView(record)}>
                        View
                      </button>
                      <button className="update-button" onClick={() => handleUpdate(record)}>
                        Update
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(record.AssistanceID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No assistance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for New Financial Assistance */}
      {isCreateModalOpen && (
        <FinancialModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onSubmit={handleCreateSubmit}
        />
      )}

    {isViewModalOpen && (
      <FinancialViewModal
        isOpen={isViewModalOpen}
        onClose={handleViewModalClose}
        financialData={selectedAssistance} // Change this to 'financialData'
      />
    )}

      {/* Modal for Updating Assistance Record */}
      {isUpdateModalOpen && (
        <FinancialUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        onSave={handleUpdateSubmit}
        financial={selectedAssistance} // Update the prop name to 'financial'
      />
      
      )}
    </div>
  );
};

export default FinancialAssistance;
