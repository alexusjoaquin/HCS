// src/components/CrimeReports/CrimeReports.js
import React, { useState, useEffect } from 'react';
import Sidebar from '../../../templates/Sidebar';
import CrimeReportModal from '../Modals/CrimeReportModal/CrimeReportModal';
import CrimeReportViewModal from '../Modals/CrimeReportViewModal/CrimeReportViewModal';
import CrimeReportUpdateModal from '../Modals/CrimeReportUpdateModal/CrimeReportUpdateModal';
import crimeReportService from '../../../services/crimeReportService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';

const MySwal = withReactContent(Swal);

const CrimeReports = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [crimeReports, setCrimeReports] = useState([]);

  useEffect(() => {
    fetchCrimeReports();
  }, []);

  const fetchCrimeReports = async () => {
    try {
        const response = await crimeReportService.getAllCrimeReports();
        if (response && response.crimeReports) {
            setCrimeReports(response.crimeReports);
        } else {
            console.warn('Fetched data is not valid:', response);
            setCrimeReports([]);
        }
    } catch (error) {
        console.error('Failed to fetch crime reports:', error);
        toast.error('Failed to fetch crime reports.');
    }
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
        const reportData = {
            ReportID: `CR${Math.floor(Date.now() / 1000)}`,
            Location: data.Location,
            Description: data.Description,
            Date: data.Date,
            OfficerInCharge: data.OfficerInCharge,
        };
        await crimeReportService.createCrimeReport(reportData);
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
        toast.error('Failed to create crime report.');
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
        const reportData = {
            ReportID: data.ReportID,
            Location: data.Location,
            Description: data.Description,
            Date: data.Date,
            OfficerInCharge: data.OfficerInCharge,
        };
        await crimeReportService.updateCrimeReport(reportData);
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
        toast.error('Failed to update crime report.');
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
      reverseButtons: true,
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
        toast.error('Failed to delete crime report.');
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content" style={{ padding: '20px' }}>
        <Typography variant="h4" className="header" style={{ fontWeight: '700', marginLeft: '40px', marginTop: '20px' }}>CRIME REPORTS</Typography>

        <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', gap: '30px' }}>
          <Button variant="contained" color="primary" style={{ height: '56px' }} onClick={handleNewReport}>
            + New Report
          </Button>
          <TextField
            style={{ width: '300px', marginRight: '40px' }}
            variant="outlined"
            placeholder="Search reports"
            className="search-input"
          />
        </div>

        <TableContainer style={{ maxWidth: '95%', margin: '30px auto', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Report ID', 'Description', 'Location', 'Date', 'Officer In Charge', 'Actions'].map((header) => (
                  <TableCell key={header} style={{ backgroundColor: '#0B8769', color: 'white', padding: '10px', textAlign: 'center' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(crimeReports) && crimeReports.length > 0 ? (
                crimeReports.map((report) => (
                  <TableRow key={report.ReportID}>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{report.ReportID}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{report.Description}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{report.Location}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{report.Date}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{report.OfficerInCharge}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>
                      <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={() => handleView(report)}>
                        View
                      </Button>
                      <Button variant="contained" color="secondary" style={{ marginRight: '10px' }} onClick={() => handleUpdate(report)}>
                        Update
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleDelete(report.ReportID)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                    No crime reports found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
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
        crimeReport={selectedReport}  // Change "report" to "crimeReport"
      />


      {/* Modal for Updating Crime Report */}
      <CrimeReportUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        onSave={handleUpdateSave}
        report={selectedReport}
      />
    </div>
  );
};

export default CrimeReports;
