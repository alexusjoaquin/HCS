import React, { useState, useEffect } from 'react';
import Sidebar from '../../../templates/Sidebar';
import SeniorCitizenModal from '../Modals/SeniorCitizenModal/SeniorCitizenModal';
import SeniorCitizenViewModal from '../Modals/SeniorCitizenViewModal/SeniorCitizenViewModal';
import SeniorCitizenUpdateModal from '../Modals/SeniorCitizenUpdateModal/SeniorCitizenUpdateModal';
import residentsService from '../../../services/residentsService'; // Update to import residentsService
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CircularProgress, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, IconButton, Tooltip } from '@mui/material';
import { CSVLink } from 'react-csv';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PrintIcon from '@mui/icons-material/Print';

const MySwal = withReactContent(Swal);

const SeniorCitizenData = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedSeniorCitizen, setSelectedSeniorCitizen] = useState(null);
  const [residents, setResidents] = useState([]); // Change state to hold residents
  const [filteredResidents, setFilteredResidents] = useState([]); // Change to filtered residents
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedResident, setSelectedResident] = useState(null);

  const username = localStorage.getItem('username'); // Get username from localStorage
const isAdmin = username && username.startsWith('admin'); // Check if the user is an admin

// Function to extract barangay name
const extractBarangay = (username) => {
  if (isAdmin) return null; // If admin, return null
  
  const parts = username.split('_');
  // Join all parts after the first one to handle names with spaces
  return parts.slice(1).join(' ').replace(/_/g, ' '); // Replace underscores with spaces
};

const barangay = extractBarangay(username); // Extract barangay

  

  

  // Fetch residents data when component loads
  useEffect(() => {
    fetchResidents();
  }, []);

  useEffect(() => {
    const results = residents.filter(resident =>
      resident.Name.toLowerCase().includes(searchTerm.toLowerCase()) || // Adjust based on your resident object
      resident.Address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.Gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.Birthday.includes(searchTerm) // You may want to adjust this depending on your data structure
    );
    setFilteredResidents(results);
  }, [searchTerm, residents]);

  const fetchResidents = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await residentsService.getAllResidents(); // Fetch all residents
  
      // Filter residents by barangay
      const filteredResidents = isAdmin 
        ? response // If admin, get all residents
        : response.filter(resident => resident.Address === barangay); // Filter by barangay
  
      const seniorResidents = filteredResidents.filter(resident => {
        const currentYear = new Date().getFullYear();
        const birthYear = new Date(resident.Birthday).getFullYear(); // Assuming Birthday is a date string
        return (currentYear - birthYear) >= 60; // Check if age is 60 or above
      });
  
      setResidents(seniorResidents);
      setFilteredResidents(seniorResidents); // Initialize filtered residents
    } catch (error) {
      console.error('Failed to fetch residents:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };
  

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleView = (resident) => {
    setSelectedResident(resident); // Use setSelectedResident to update the state
    setViewModalOpen(true);
  };
  

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedResident(null); // Use setSelectedResident to reset the state
  };
  

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    selectedResident(null);
  };

  const handleUpdateSubmit = async (data) => {
    // Handle the update logic as needed
  };

  // CSV headers for export
  const csvHeaders = [
    { label: "Resident ID", key: "ResidentID" },
    { label: "Name", key: "Name" },
    { label: "Address", key: "Address" },
    { label: "Birthday", key: "Birthday" },
    { label: "Gender", key: "Gender" },
    { label: "Status", key: "Status" }, // Add other necessary fields
  ];

  // Handle Print Records
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content" style={{ padding: '20px' }}>
        <Typography variant="h4" className="header" style={{ fontWeight: '700', marginLeft: '40px', marginTop: '20px' }}>
          SENIOR CITIZEN DATA
        </Typography>

        <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', gap: '30px' }}>
          {/* Import CSV with Tooltip */}
          <input
            accept=".csv"
            id="import-csv"
            type="file"
            style={{ display: 'none' }}
            // Handle file upload logic here
          />
          <Tooltip title="Import CSV" arrow>
            <IconButton onClick={() => document.getElementById('import-csv').click()} color="primary" aria-label="Import CSV">
              <ImportExportIcon />
            </IconButton>
          </Tooltip>

          {/* Export CSV with Tooltip */}
          <Tooltip title="Export CSV" arrow>
            <span>
              <CSVLink data={residents} headers={csvHeaders} filename="senior_citizens.csv">
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

          <TextField
            style={{ width: '300px', marginRight: '40px' }}
            variant="outlined"
            placeholder="Search residents"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <TableContainer style={{ maxWidth: '95%', margin: '30px auto', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Resident ID', 'Name', 'Address', 'Birthday', 'Gender', 'Actions'].map((header) => (
                  <TableCell key={header} style={{ backgroundColor: '#0B8769', color: 'white', padding: '10px', textAlign: 'center' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? ( // Check if loading is true
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : Array.isArray(filteredResidents) && filteredResidents.length > 0 ? (
                filteredResidents.map((resident) => (
                  <TableRow key={resident.ResidentID}>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{resident.ResidentID}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{resident.Name}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{resident.Address}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{resident.Birthday}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{resident.Gender}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>
                      <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={() => handleView(resident)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                    No senior citizens found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Modal for New Senior Citizen Record */}
      <SeniorCitizenModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        // onSubmit={handleCreateSubmit} // Add if create functionality needed
      />

      {/* Modal for Viewing Senior Citizen Record */}
      <SeniorCitizenViewModal
        isOpen={isViewModalOpen}
        onClose={handleViewModalClose}
        resident={selectedResident}
      />

      {/* Modal for Updating Senior Citizen Record */}
      <SeniorCitizenUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        // onSave={handleUpdateSubmit} // Add if update functionality needed
        seniorCitizen={selectedResident}
      />
    </div>
  );
};

export default SeniorCitizenData;
