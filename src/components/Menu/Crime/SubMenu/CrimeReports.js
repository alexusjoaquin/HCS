// src/components/CrimeReports/CrimeReports.js
import React, { useState, useEffect } from 'react';
import Sidebar from '../../../templates/Sidebar';
import CrimeReportModal from '../Modals/CrimeReportModal/CrimeReportModal';
import CrimeReportUpdateModal from '../Modals/CrimeReportUpdateModal/CrimeReportUpdateModal';
import VictimsViewModal from '../Modals/VictimsViewModal/VictimsViewModal'; // Import Victim Modal
import SuspectViewModal from '../Modals/SuspectViewModal/SuspectViewModal'; // Import Suspect Modal
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
import { CSVLink } from 'react-csv';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PrintIcon from '@mui/icons-material/Print';
import axios from 'axios';
import apiconfig from '../../../../api/apiconfig'; // Adjust the path as necessary

const MySwal = withReactContent(Swal);

const CrimeReports = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [crimeReports, setCrimeReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isVictimModalOpen, setVictimModalOpen] = useState(false);
  const [selectedVictim, setSelectedVictim] = useState(null);
  const [isSuspectModalOpen, setSuspectModalOpen] = useState(false);
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  // Get username from localStorage and check if the user is an admin
const username = localStorage.getItem('username');
const isAdmin = username && username.startsWith('admin');

// Function to extract barangay name
const extractBarangay = (username) => {
  if (isAdmin) return null; // If admin, return null
  
  const parts = username.split('_');
  // Join all parts after the first one to handle names with spaces
  return parts.slice(1).join(' ').replace(/_/g, ' '); // Replace underscores with spaces
};

const barangay = extractBarangay(username); // Extract barangay


  useEffect(() => {
    fetchCrimeReports();
  }, []);

  useEffect(() => {
    const results = crimeReports.filter(report =>
      report.Location.toLowerCase().includes(searchTerm.toLowerCase()) || 
      report.Description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReports(results);
  }, [searchTerm, crimeReports]);

  const fetchCrimeReports = async () => {
  try {
    setLoading(true); // Set loading to true before fetching
    const response = await axios.get(apiconfig.crime.getAll); // Fetch all crime reports
    if (response.data.status === 'success') {
      let fetchedReports = response.data.data.crimeReports;

      // Filter crime reports by barangay if not admin
      if (!isAdmin) {
        fetchedReports = fetchedReports.filter(report => report.Location === barangay);
      }

      setCrimeReports(fetchedReports);
      setFilteredReports(fetchedReports);
    } else {
      console.warn('Fetched data is not valid:', response);
      setCrimeReports([]);
      setFilteredReports([]);
    }
  } catch (error) {
    console.error('Failed to fetch crime reports:', error);
    toast.error('Failed to fetch crime reports.');
  } finally {
    setLoading(false); // Set loading to false after fetching
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
        SuspectID: data.SuspectID,  // Include SuspectID
        VictimID: data.VictimID,    // Include VictimID
      };
      await axios.post(apiconfig.crime.create, reportData); // Create a new crime report
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
        SuspectID: data.SuspectID,  // Include SuspectID
        VictimID: data.VictimID,    // Include VictimID
      };
      await axios.put(apiconfig.crime.update, reportData); // Update the crime report
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
        // Send the ReportID in the body of the delete request
        await axios.delete(apiconfig.crime.delete, {
          data: { ReportID: reportID }  // Include the ReportID in the request body
        });
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
  

  // CSV headers for export
  const csvHeaders = [
    { label: "Report ID", key: "ReportID" },
    { label: "Description", key: "Description" },
    { label: "Location", key: "Location" },
    { label: "Date", key: "Date" },
    { label: "Officer In Charge", key: "OfficerInCharge" },
    { label: "Suspect ID", key: "SuspectID" }, // Added SuspectID
    { label: "Victim ID", key: "VictimID" },   // Added VictimID
  ];

  const handleFileUpload = () => {
    // Handle file upload logic here
  }

  // Handle Print Records
  const handlePrint = () => {
    window.print();
  };

  // Fetch victim data by ID
  const fetchVictimData = async (victimID) => {
    try {
      const response = await axios.get(apiconfig.victims.getById(victimID)); // Adjust as necessary
      if (response.data.status === 'success') {
        setSelectedVictim(response.data.data); // Ensure correct data structure
        setVictimModalOpen(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching victim data:', error);
      toast.error('Failed to fetch victim data.');
    }
  };

  // Fetch suspect data by ID
  const fetchSuspectData = async (suspectID) => {
    try {
      const response = await axios.get(apiconfig.suspect.getById(suspectID)); // Adjust as necessary
      if (response.data.status === 'success') {
        setSelectedSuspect(response.data.data.suspectDetails); // Ensure correct data structure
        setSuspectModalOpen(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching suspect data:', error);
      toast.error('Failed to fetch suspect data.');
    }
  };

  const handleVictimClick = (victimID) => {
    fetchVictimData(victimID);
  };

  const handleSuspectClick = (suspectID) => {
    fetchSuspectData(suspectID);
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content" style={{ padding: '20px' }}>
        <Typography variant="h4" className="header" style={{ fontWeight: '700', marginLeft: '40px', marginTop: '20px' }}>CRIME REPORTS</Typography>

        <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', gap: '30px', alignItems: 'center' }}>
          {/* Import CSV with Tooltip */}
          <input
            accept=".csv"
            id="import-csv"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <Tooltip title="Import CSV" arrow>
            <IconButton onClick={() => document.getElementById('import-csv').click()} color="primary" aria-label="Import CSV">
              <ImportExportIcon />
            </IconButton>
          </Tooltip>

          {/* Export CSV with Tooltip */}
          <Tooltip title="Export CSV" arrow>
            <span>
              <CSVLink data={filteredReports} headers={csvHeaders} filename="crime_reports.csv">
                <IconButton color="secondary" aria-label="Export CSV">
                  <ImportExportIcon />
                </IconButton>
              </CSVLink>
            </span>
          </Tooltip>

          {/* Print Records with Tooltip */}
          <Tooltip title="Print Records" arrow>
            <IconButton color="error" onClick={handlePrint} aria-label="Print Records">
              <PrintIcon />
            </IconButton>
          </Tooltip>

          {/* New Report Button */}
          <Button variant="contained" color="primary" style={{ height: '56px' }} onClick={handleNewReport}>
            + New Report
          </Button>
          <TextField
            style={{ width: '300px', marginRight: '40px' }}
            variant="outlined"
            placeholder="Search reports by location or description"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <TableContainer style={{ maxWidth: '95%', margin: '30px auto', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Report ID', 'Description', 'Location', 'Date', 'Officer In Charge', 'Suspect ID', 'Victim ID', 'Actions'].map((header) => (
                  <TableCell key={header} style={{ backgroundColor: '#0B8769', color: 'white', padding: '10px', textAlign: 'center' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
  {loading ? (
    <TableRow>
      <TableCell colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
        <CircularProgress />
      </TableCell>
    </TableRow>
  ) : Array.isArray(filteredReports) && filteredReports.length > 0 ? (
    filteredReports.map((report) => (
      <TableRow key={report.ReportID}>
        <TableCell style={{ padding: '10px', textAlign: 'center' }}>{report.ReportID}</TableCell>
        <TableCell style={{ padding: '10px', textAlign: 'center' }}>{report.Description}</TableCell>
        <TableCell style={{ padding: '10px', textAlign: 'center' }}>{report.Location}</TableCell>
        <TableCell style={{ padding: '10px', textAlign: 'center' }}>{report.Date}</TableCell>
        <TableCell style={{ padding: '10px', textAlign: 'center' }}>{report.OfficerInCharge}</TableCell>
        <TableCell style={{ padding: '10px', textAlign: 'center', cursor: 'pointer', color: '#0B8769' }} onClick={() => handleSuspectClick(report.SuspectID)}>
          {report.SuspectID}
        </TableCell>
        <TableCell style={{ padding: '10px', textAlign: 'center', cursor: 'pointer', color: '#0B8769' }} onClick={() => handleVictimClick(report.VictimID)}>
          {report.VictimID}
        </TableCell>
        <TableCell style={{ padding: '10px', textAlign: 'center' }}>
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
      <TableCell colSpan={8} style={{ textAlign: 'center', padding: '20px' }}>
        <Typography>No crime reports found.</Typography>
      </TableCell>
    </TableRow>
  )}
</TableBody>

          </Table>
        </TableContainer>

        {/* Modal for New Crime Report */}
        <CrimeReportModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onSubmit={handleCreateSubmit}
        />


        {/* Modal for Updating Crime Report */}
        <CrimeReportUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          onSave={handleUpdateSave}
          report={selectedReport}
        />

        {/* Modal for Victim View */}
        <VictimsViewModal
          isOpen={isVictimModalOpen}
          onClose={() => setVictimModalOpen(false)}
          victim={selectedVictim}
        />

        {/* Modal for Suspect View */}
        <SuspectViewModal
          isOpen={isSuspectModalOpen}
          onClose={() => setSuspectModalOpen(false)}
          suspect={selectedSuspect}
        />
      </div>
    </div>
  );
};

export default CrimeReports;
