import React, { useState, useEffect } from 'react';
import Sidebar from '../../../templates/Sidebar';
import VictimsModal from '../Modals/VictimsModal/VictimsModal'; 
import VictimsViewModal from '../Modals/VictimsViewModal/VictimsViewModal'; 
import VictimsUpdateModal from '../Modals/VictimsUpdateModal/VictimsUpdateModal'; 
import victimsService from '../../../services/victimsService'; 
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CircularProgress , Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, IconButton, Tooltip } from '@mui/material';
import { CSVLink } from 'react-csv'; 
import ImportExportIcon from '@mui/icons-material/ImportExport'; 
import PrintIcon from '@mui/icons-material/Print'; 

const MySwal = withReactContent(Swal);

const Victims = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedVictim, setSelectedVictim] = useState(null);
  const [victims, setVictims] = useState([]);
  const [filteredVictims, setFilteredVictims] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  const username = localStorage.getItem('username'); // Get username from localStorage
const isAdmin = username && username.startsWith('admin'); // Check if the user is an admin

// Function to extract barangay name
const extractBarangay = (username) => {
  if (isAdmin) return null; // If admin, return null
  
  const parts = username.split('_');
  return parts.slice(1).join(' ').replace(/_/g, ' '); // Join parts after the first one and replace underscores
};

const barangay = extractBarangay(username); // Extract barangay

  useEffect(() => {
    fetchVictims();
  }, []);

  useEffect(() => {
    const results = victims.filter(victim =>
      victim.FullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      victim.LastKnownAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      victim.IncidentDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      victim.CaseStatus.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVictims(results);
  }, [searchTerm, victims]);

  const fetchVictims = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await victimsService.getAllVictims();
      if (response && Array.isArray(response)) {
        // Filter victims by barangay
        const filteredVictims = isAdmin ? response : response.filter(victim => victim.LastKnownAddress === barangay);
        setVictims(filteredVictims);
        setFilteredVictims(filteredVictims); // Initialize filtered victims
      } else {
        console.warn('Fetched data is not an array:', response);
        setVictims([]);
        setFilteredVictims([]);
      }
    } catch (error) {
      console.error('Failed to fetch victims:', error);
      toast.error('Failed to fetch victims.');
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleNewVictim = () => {
    setSelectedVictim(null);
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateSubmit = async (data) => {
    try {
      const victimData = {
        VictimID: `V-${Math.floor(Date.now() / 1000)}`,
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
      setCreateModalOpen(false);
      fetchVictims();
    } catch (error) {
      console.error('Error creating victim:', error);
      toast.error('Failed to create victim.');
    }
  };

  const handleView = (victim) => {
    setSelectedVictim(victim);
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedVictim(null);
  };

  const handleUpdate = (victim) => {
    setSelectedVictim(victim);
    setUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedVictim(null);
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const updatedVictim = {
        VictimID: selectedVictim.VictimID,
        FullName: data.FullName,
        LastKnownAddress: data.LastKnownAddress,
        IncidentDate: data.IncidentDate,
        CaseStatus: data.CaseStatus,
      };

      await victimsService.updateVictim(updatedVictim);
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Victim updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false);
      fetchVictims();
    } catch (error) {
      console.error('Error updating victim:', error);
      toast.error('Failed to update victim.');
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
      reverseButtons: true,
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
        fetchVictims();
      } catch (error) {
        console.error('Error deleting victim:', error);
        toast.error('Failed to delete victim.');
      }
    }
  };

  // CSV headers for export
  const csvHeaders = [
    { label: "Victim ID", key: "VictimID" },
    { label: "Full Name", key: "FullName" },
    { label: "Last Known Address", key: "LastKnownAddress" },
    { label: "Incident Date", key: "IncidentDate" },
    { label: "Case Status", key: "CaseStatus" },
  ];

  const handleFileUpload = () => {
    // Handle file upload logic here
  };

  // Handle Print Records
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content" style={{ padding: '20px' }}>
        <Typography variant="h4" className="header" style={{ fontWeight: '700', marginLeft: '40px', marginTop: '20px' }}>VICTIMS</Typography>

        <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', gap: '30px' }}>
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
              <CSVLink data={filteredVictims} headers={csvHeaders} filename="victims.csv">
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

          <Button variant="contained" color="primary" style={{ height: '56px' }} onClick={handleNewVictim}>
            + New Victim
          </Button>
          <TextField
            style={{ width: '300px', marginRight: '40px' }}
            variant="outlined"
            placeholder="Search victims by Full Name, Address, Incident Date, or Status"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <TableContainer style={{ maxWidth: '95%', margin: '30px auto', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Victim ID', 'Full Name', 'Last Known Address', 'Incident Date', 'Case Status', 'Actions'].map((header) => (
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
              ) : Array.isArray(filteredVictims) && filteredVictims.length > 0 ? (
                filteredVictims.map((victim) => (
                  <TableRow key={victim.VictimID}>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{victim.VictimID}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{victim.FullName}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{victim.LastKnownAddress}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{victim.IncidentDate}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{victim.CaseStatus}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>
                      <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={() => handleView(victim)}>
                        View
                      </Button>
                      <Button variant="contained" color="secondary" style={{ marginRight: '10px' }} onClick={() => handleUpdate(victim)}>
                        Update
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleDelete(victim.VictimID)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                    No victims found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
        </TableContainer>
      </div>

      {/* Modal for New Victim */}
      <VictimsModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        onSubmit={handleCreateSubmit}
      />

      {/* Modal for Viewing Victim */}
      <VictimsViewModal
        isOpen={isViewModalOpen}
        onClose={handleViewModalClose}
        victim={selectedVictim}
      />

      {/* Modal for Updating Victim */}
      <VictimsUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        onSave={handleUpdateSubmit}
        victim={selectedVictim}
      />
    </div>
  );
};

export default Victims;
