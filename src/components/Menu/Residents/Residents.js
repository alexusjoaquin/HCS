import React, { useState, useEffect } from 'react';
import Sidebar from '../../templates/Sidebar';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import residentsService from '../../services/residentsService';
import { toast } from 'react-toastify';
import ResidentCreateModal from './Modals/ResidentCreateModal';
import ResidentViewModal from './Modals/ResidentViewModal';
import ResidentUpdateModal from './Modals/ResidentUpdateModal';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, IconButton, Tooltip, CircularProgress } from '@mui/material';
import { CSVLink } from 'react-csv'; 
import ImportExportIcon from '@mui/icons-material/ImportExport'; 
import PrintIcon from '@mui/icons-material/Print'; 
import '../Health/CssFiles/Appointment.css';

const MySwal = withReactContent(Swal);

const Residents = () => {
  const [residents, setResidents] = useState([]);
  const [filteredResidents, setFilteredResidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    fetchResidents();
  }, []);

  useEffect(() => {
    const results = residents.filter(resident =>
      resident.ResidentID.toString().includes(searchTerm) ||
      resident.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.Address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResidents(results);
  }, [searchTerm, residents]);

  const fetchResidents = async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const response = await residentsService.getAllResidents();
      if (response && Array.isArray(response)) {
        setResidents(response);
        setFilteredResidents(response);
      } else {
        console.warn('Fetched data is not an array:', response);
        setResidents([]);
        setFilteredResidents([]);
      }
    } catch (error) {
      console.error('Failed to fetch residents:', error);
      toast.error('Failed to fetch residents. ' + error.message);
    } finally {
      setLoading(false); // Set loading to false when fetching ends
    }
  };

  const handleNewResident = () => {
    setSelectedResident(null);
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateSubmit = async (data) => {
    try {
      const residentData = {
        Name: data.Name,
        Age: data.Age,
        Birthday: data.Birthday,
        Address: data.Address,
        Gender: data.Gender,
        Status: data.Status,
        BMI: data.BMI,
        Height: data.Height,
        Weight: data.Weight,
        BloodType: data.BloodType,
        is_senior: data.is_senior
      };

      await residentsService.createResident(residentData);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Resident created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false);
      fetchResidents();
    } catch (error) {
      console.error('Error creating resident:', error);
      toast.error('Failed to create resident: ' + error.message);
    }
  };

  const handleView = (resident) => {
    setSelectedResident(resident);
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedResident(null);
  };

  const handleUpdate = (resident) => {
    setSelectedResident(resident);
    setUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedResident(null);
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const updatedResident = {
        ...selectedResident,
        ...data,
      };

      await residentsService.updateResident(updatedResident);
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Resident updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false);
      fetchResidents();
    } catch (error) {
      console.error('Error updating resident:', error);
      toast.error('Failed to update resident: ' + error.message);
    }
  };

  const handleDelete = async (residentID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this resident?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await residentsService.deleteResident(residentID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Resident has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchResidents();
      } catch (error) {
        console.error('Error deleting resident:', error);
        toast.error('Failed to delete resident: ' + error.message);
      }
    }
  };

  // CSV headers for export
  const csvHeaders = [
    { label: "Resident ID", key: "ResidentID" },
    { label: "Name", key: "Name" },
    { label: "Age", key: "Age" },
    { label: "Birthdate", key: "Birthday" },
    { label: "Gender", key: "Gender" },
    { label: "Address", key: "Address" },
    { label: "If Senior", key: "is_senior" },
  ];

  // Handle File Upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const csvData = e.target.result;
      const base64String = btoa(unescape(encodeURIComponent(csvData))); // Base64 encoding

      try {
        await residentsService.importResidentsCSV(base64String); // Send base64 string
        toast.success("CSV data imported and saved successfully!");
        fetchResidents(); // Refresh the resident data
      } catch (error) {
        console.error('Error importing residents:', error);
        toast.error('Failed to import residents: ' + error.message);
      }
    };

    if (file) reader.readAsText(file);
  };

  // Handle Print Records
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content" style={{ padding: '20px' }}>
        <Typography variant="h4" className="header" style={{ fontWeight: '700', marginLeft: '40px', marginTop: '20px' }}>RESIDENTS</Typography>

        <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', gap: '30px', alignItems: 'center' }}>
          {/* Import CSV as Icon Button */}
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

          {/* Export CSV as Icon Button */}
          <Tooltip title="Export CSV" arrow>
            <span>
              <CSVLink data={residents} headers={csvHeaders} filename="residents_data.csv">
                <IconButton color="secondary" aria-label="Export CSV">
                  <ImportExportIcon />
                </IconButton>
              </CSVLink>
            </span>
          </Tooltip>

          {/* Print Records as Icon Button */}
          <Tooltip title="Print Records" arrow>
            <IconButton color="error" onClick={handlePrint} aria-label="Print Records">
              <PrintIcon />
            </IconButton>
          </Tooltip>

          {/* New Resident Button */}
          <Button variant="contained" color="primary" style={{ height: '56px'}} onClick={handleNewResident}>
            + New Resident
          </Button>
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
                {['Resident ID', 'Name', 'Age', 'Birthdate', 'Gender', 'Address', 'If Senior', 'Actions'].map((header) => (
                  <TableCell key={header} style={{ backgroundColor: '#0B8769', color: 'white', padding: '10px', textAlign: 'center' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? ( // Check loading state
                <TableRow>
                  <TableCell colSpan={8} style={{ textAlign: 'center', padding: '20px' }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                Array.isArray(filteredResidents) && filteredResidents.length > 0 ? (
                  filteredResidents.map((resident) => (
                    <TableRow key={resident.ResidentID}>
                      <TableCell style={{ padding: '10px', textAlign: 'center' }}>{resident.ResidentID}</TableCell>
                      <TableCell style={{ padding: '10px', textAlign: 'center' }}>{resident.Name}</TableCell>
                      <TableCell style={{ padding: '10px', textAlign: 'center' }}>{resident.Age}</TableCell>
                      <TableCell style={{ padding: '10px', textAlign: 'center' }}>{resident.Birthday}</TableCell>
                      <TableCell style={{ padding: '10px', textAlign: 'center' }}>{resident.Gender}</TableCell>
                      <TableCell style={{ padding: '10px', textAlign: 'center' }}>{resident.Address}</TableCell>
                      <TableCell style={{ padding: '10px', textAlign: 'center' }}>{resident.is_senior ? 'Yes' : 'No'}</TableCell>
                      <TableCell style={{ padding: '10px', textAlign: 'center' }}>
                        <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={() => handleView(resident)}>View</Button>
                        <Button variant="contained" color="secondary" style={{ marginRight: '10px' }} onClick={() => handleUpdate(resident)}>Update</Button>
                        <Button variant="contained" color="error" onClick={() => handleDelete(resident.ResidentID)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} style={{ textAlign: 'center', padding: '20px' }}>
                      No residents found.
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal for New Resident */}
        <ResidentCreateModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onSubmit={handleCreateSubmit}
        />

        {/* Modal for Viewing Resident */}
        <ResidentViewModal
          isOpen={isViewModalOpen}
          onClose={handleViewModalClose}
          resident={selectedResident}
        />

        {/* Modal for Updating Resident */}
        <ResidentUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          onSave={handleUpdateSubmit}
          resident={selectedResident}
        />
      </div>
    </div>
  );
};

export default Residents;
