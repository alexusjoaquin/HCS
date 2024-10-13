import React, { useState, useEffect } from 'react';
import Sidebar from '../../../templates/Sidebar';
import suspectService from '../../../services/suspectService'; // Adjust the path if necessary
import SuspectModal from '../Modals/SuspectModal/SuspectModal';
import SuspectViewModal from '../Modals/SuspectViewModal/SuspectViewModal';
import SuspectUpdateModal from '../Modals/SuspectUpdateModal/SuspectUpdateModal';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CircularProgress ,Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, IconButton, Tooltip } from '@mui/material';
import { CSVLink } from 'react-csv'; 
import ImportExportIcon from '@mui/icons-material/ImportExport'; 
import PrintIcon from '@mui/icons-material/Print'; 

const MySwal = withReactContent(Swal);

const Suspects = () => {
  const [suspects, setSuspects] = useState([]);
  const [filteredSuspects, setFilteredSuspects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchSuspects();
  }, []);

  useEffect(() => {
    const results = suspects.filter(suspect =>
      suspect.FullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suspect.Alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suspect.LastKnownAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suspect.Status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSuspects(results);
  }, [searchTerm, suspects]);

  const fetchSuspects = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await suspectService.getAllSuspects();
      if (response && Array.isArray(response)) {
        setSuspects(response);
        setFilteredSuspects(response); // Initialize filtered suspects
      } else {
        console.warn('Fetched data is not an array:', response);
        setSuspects([]);
        setFilteredSuspects([]);
      }
    } catch (error) {
      console.error('Failed to fetch suspects:', error);
      toast.error('Failed to fetch suspects. ' + error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleNewSuspect = () => {
    setSelectedSuspect(null);
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateSubmit = async (data) => {
    try {
      const suspectData = {
        SuspectID: `SUS-${Math.floor(Date.now() / 1000)}`,
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
      setCreateModalOpen(false);
      fetchSuspects();
    } catch (error) {
      console.error('Error creating suspect:', error);
      toast.error('Failed to create suspect: ' + error.message);
    }
  };

  const handleView = (suspect) => {
    setSelectedSuspect(suspect);
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedSuspect(null);
  };

  const handleUpdate = (suspect) => {
    setSelectedSuspect(suspect);
    setUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedSuspect(null);
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const updatedSuspect = {
        SuspectID: selectedSuspect.SuspectID,
        FullName: data.FullName,
        Alias: data.Alias,
        LastKnownAddress: data.LastKnownAddress,
        Status: data.Status,
      };

      await suspectService.updateSuspect(updatedSuspect);
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Suspect updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false);
      fetchSuspects();
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
        fetchSuspects();
      } catch (error) {
        console.error('Error deleting suspect:', error);
        toast.error('Failed to delete suspect: ' + error.message);
      }
    }
  };

  // CSV headers for export
  const csvHeaders = [
    { label: "Suspect ID", key: "SuspectID" },
    { label: "Full Name", key: "FullName" },
    { label: "Alias", key: "Alias" },
    { label: "Last Known Address", key: "LastKnownAddress" },
    { label: "Status", key: "Status" },
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
        <Typography variant="h4" className="header" style={{ fontWeight: '700', marginLeft: '40px', marginTop: '20px' }}>SUSPECTS</Typography>

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
              <CSVLink data={filteredSuspects} headers={csvHeaders} filename="suspects.csv">
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

          <Button variant="contained" color="primary" style={{ height: '56px' }} onClick={handleNewSuspect}>
            + New Suspect
          </Button>
          <TextField
            style={{ width: '300px', marginRight: '40px' }}
            variant="outlined"
            placeholder="Search suspects by Full Name, Alias, or Address"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <TableContainer style={{ maxWidth: '95%', margin: '30px auto', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Suspect ID', 'Full Name', 'Alias', 'Address', 'Status', 'Actions'].map((header) => (
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
              ) : Array.isArray(filteredSuspects) && filteredSuspects.length > 0 ? (
                filteredSuspects.map((suspect) => (
                  <TableRow key={suspect.SuspectID}>
                    <TableCell align="center">{suspect.SuspectID}</TableCell>
                    <TableCell align="center">{suspect.FullName}</TableCell>
                    <TableCell align="center">{suspect.Alias}</TableCell>
                    <TableCell align="center">{suspect.LastKnownAddress}</TableCell>
                    <TableCell align="center">{suspect.Status}</TableCell>
                    <TableCell align="center" style={{ padding: '10px' }}>
                      <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={() => handleView(suspect)}>
                        View
                      </Button>
                      <Button variant="contained" color="secondary" style={{ marginRight: '10px' }} onClick={() => handleUpdate(suspect)}>
                        Update
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleDelete(suspect.SuspectID)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No suspects found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
        </TableContainer>

       {/* Modal for New Suspect */}
      <SuspectModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        onSubmit={handleCreateSubmit}
      />

      {/* Modal for Viewing Suspect */}
      <SuspectViewModal
        isOpen={isViewModalOpen}
        onClose={handleViewModalClose}
        suspect={selectedSuspect}
      />

      {/* Modal for Updating Suspect */}
      <SuspectUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        onSave={handleUpdateSubmit}
        suspect={selectedSuspect}
      />
      </div>
    </div>
  );
};

export default Suspects;
