// src/components/CrimeReports/CrimeReports.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import CrimeReportModal from '../Modals/CrimeReportModal/CrimeReportModal';
import CrimeReportViewModal from '../Modals/CrimeReportViewModal/CrimeReportViewModal';
import CrimeReportUpdateModal from '../Modals/CrimeReportUpdateModal/CrimeReportUpdateModal'; // Import update modal
import crimeReportService from '../../../services/crimeReportService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const CrimeReports = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false); // State to control update modal
  const [selectedReport, setSelectedReport] = useState(null);
  const [crimeReports, setCrimeReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCrimeReports();
  }, []);

  const fetchCrimeReports = async () => {
    try {
      const response = await crimeReportService.getAllCrimeReports();
      if (response && response.crimeReports && Array.isArray(response.crimeReports)) {
        setCrimeReports(response.crimeReports);
      } else {
        console.warn('Fetched data is not an array:', response);
        setCrimeReports([]);
      }
    } catch (error) {
      console.error('Failed to fetch crime reports:', error);
      toast.error('Failed to fetch crime reports. ' + error.message);
    }
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewReport = () => {
    setSelectedReport(null);
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateSubmit = async (data) => {
    try {
      const crimeReportData = {
        ReportID: `CR${Math.floor(Date.now() / 1000)}`,
        Location: data.Location,
        Description: data.Description,
        Date: data.Date, // Ensure this field is included
        OfficerInCharge: data.OfficerInCharge,
      };

      await crimeReportService.createCrimeReport(crimeReportData);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Crime report created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false);
      fetchCrimeReports();
    } catch (error) {
      console.error('Error creating crime report:', error);
      toast.error('Failed to create crime report: ' + error.message);
    }
  };

  const handleView = (report) => {
    setSelectedReport(report);
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedReport(null);
  };

  const handleUpdate = (report) => {
    setSelectedReport(report);
    setUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedReport(null);
  };

  const handleUpdateSave = async (data) => {
    try {
      const updatedReportData = {
        ReportID: data.ReportID,
        Location: data.Location,
        Description: data.Description,
        Date: data.Date,
        OfficerInCharge: data.OfficerInCharge,
      };

      await crimeReportService.updateCrimeReport(updatedReportData);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Crime report updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false);
      fetchCrimeReports();
    } catch (error) {
      console.error('Error updating crime report:', error);
      toast.error('Failed to update crime report: ' + error.message);
    }
  };

  const handleDelete = async (reportID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this crime report?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await crimeReportService.deleteCrimeReport(reportID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Crime report has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchCrimeReports();
      } catch (error) {
        console.error('Error deleting crime report:', error);
        toast.error('Failed to delete crime report: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">CRIME REPORTS</h2>

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
          <button className="new-record-button" onClick={handleNewReport}>
            + New Crime Report
          </button>
          <input
            type="text"
            placeholder="Search reports"
            className="search-input"
          />
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Description</th>
                <th>Location</th>
                <th>Date Reported</th>
                <th>Officer In Charge</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(crimeReports) && crimeReports.length > 0 ? (
                crimeReports.map((report) => (
                  <tr key={report.ReportID}>
                    <td>{report.ReportID}</td>
                    <td>{report.Description}</td>
                    <td>{report.Location}</td>
                    <td>{report.Date}</td>
                    <td>{report.OfficerInCharge}</td>
                    <td className="actions">
                      <button className="view-button" onClick={() => handleView(report)}>
                        View
                      </button>
                      <button className="update-button" onClick={() => handleUpdate(report)}>
                        Update
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(report.ReportID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No crime reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for New Crime Report */}
      <CrimeReportModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        onSubmit={handleCreateSubmit}
      />

      {/* Modal for Viewing Crime Report */}
      <CrimeReportViewModal
        isOpen={isViewModalOpen}
        onClose={handleViewModalClose}
        crimeReport={selectedReport} // Pass the selected report
      />

      {/* Other modals */}

      {/* Modal for Updating Crime Report */}
      <CrimeReportUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        onSave={handleUpdateSave}
        report={selectedReport || {}}
      />
    </div>
  );
};

export default CrimeReports;
