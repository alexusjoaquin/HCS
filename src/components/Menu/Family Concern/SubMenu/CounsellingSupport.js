import React, { useState, useEffect } from 'react';
import Sidebar from '../../../templates/Sidebar';
import CounsellingModal from '../Modals/CounsellingModal/CounsellingModal';
import CounsellingViewModal from '../Modals/CounsellingViewModal/CounsellingViewModal';
import CounsellingUpdateModal from '../Modals/CounsellingUpdateModal/CounsellingUpdateModal';
import familycounsellingService from '../../../services/familycounsellingService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, IconButton, Tooltip } from '@mui/material';
import { CSVLink } from 'react-csv'; 
import ImportExportIcon from '@mui/icons-material/ImportExport'; 
import PrintIcon from '@mui/icons-material/Print'; 

const MySwal = withReactContent(Swal);

const CounsellingSupport = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedCounselling, setSelectedCounselling] = useState(null);
  const [counsellingRecords, setCounsellingRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCounsellingRecords();
  }, []);

  useEffect(() => {
    const results = counsellingRecords.filter(record =>
      record.ClientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.Counselor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.Location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.DateOfSession.includes(searchTerm)
    );
    setFilteredRecords(results);
  }, [searchTerm, counsellingRecords]);

  const fetchCounsellingRecords = async () => {
    try {
      const response = await familycounsellingService.getAllFamilyCounselling();
      if (response && Array.isArray(response.counselingRecords)) {
        setCounsellingRecords(response.counselingRecords);
        setFilteredRecords(response.counselingRecords); // Initialize filtered records
      } else {
        console.warn('Fetched data is not an array:', response);
        setCounsellingRecords([]);
        setFilteredRecords([]);
      }
    } catch (error) {
      console.error('Failed to fetch counselling records:', error);
      toast.error('Failed to fetch counselling records.');
    }
  };

  const handleNewRecord = () => {
    setSelectedCounselling(null);
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateSubmit = async (data) => {
    try {
      const counsellingData = {
        ServiceID: `S-${Math.floor(Date.now() / 1000)}`,
        ClientName: data.ClientName,
        Counselor: data.Counselor,
        DateOfSession: data.DateOfSession,
        Location: data.Location,
      };

      await familycounsellingService.createFamilyCounselling(counsellingData);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Counselling record created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false);
      fetchCounsellingRecords();
    } catch (error) {
      console.error('Error creating counselling record:', error);
      toast.error('Failed to create counselling record.');
    }
  };

  const handleView = (record) => {
    setSelectedCounselling(record);
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedCounselling(null);
  };

  const handleUpdate = (record) => {
    setSelectedCounselling(record);
    setUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedCounselling(null);
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const updatedRecord = {
        ServiceID: selectedCounselling.ServiceID,
        ClientName: data.ClientName,
        Counselor: data.Counselor,
        DateOfSession: data.DateOfSession,
        Location: data.Location,
      };

      await familycounsellingService.updateFamilyCounselling(updatedRecord);
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Counselling record updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false);
      fetchCounsellingRecords();
    } catch (error) {
      console.error('Error updating counselling record:', error);
      toast.error('Failed to update counselling record.');
    }
  };

  const handleDelete = async (serviceID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this counselling record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await familycounsellingService.deleteFamilyCounselling(serviceID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Counselling record has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchCounsellingRecords();
      } catch (error) {
        console.error('Error deleting counselling record:', error);
        toast.error('Failed to delete counselling record.');
      }
    }
  };

  // CSV headers for export
  const csvHeaders = [
    { label: "Service ID", key: "ServiceID" },
    { label: "Client Name", key: "ClientName" },
    { label: "Counselor", key: "Counselor" },
    { label: "Date Of Session", key: "DateOfSession" },
    { label: "Location", key: "Location" },
  ];

  const handleFileUpload = () => {
    // Handle file upload logic here
  }

  // Handle Print Records
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content" style={{ padding: '20px' }}>
        <Typography variant="h4" className="header" style={{ fontWeight: '700', marginLeft: '40px', marginTop: '20px' }}>
          COUNSELLING AND SUPPORT
        </Typography>

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
              <CSVLink data={counsellingRecords} headers={csvHeaders} filename="counselling_records.csv">
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
          
          <Button variant="contained" color="primary" style={{ height: '56px' }} onClick={handleNewRecord}>
            + New Record
          </Button>
          <TextField
            style={{ width: '300px', marginRight: '40px' }}
            variant="outlined"
            placeholder="Search records"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <TableContainer style={{ maxWidth: '95%', margin: '30px auto', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Service ID', 'Client Name', 'Counselor', 'Date of Session', 'Location', 'Actions'].map((header) => (
                  <TableCell key={header} style={{ backgroundColor: '#0B8769', color: 'white', padding: '10px', textAlign: 'center' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <TableRow key={record.ServiceID}>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{record.ServiceID}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{record.ClientName}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{record.Counselor}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{record.DateOfSession}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{record.Location}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>
                      <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={() => handleView(record)}>
                        View
                      </Button>
                      <Button variant="contained" color="secondary" style={{ marginRight: '10px' }} onClick={() => handleUpdate(record)}>
                        Update
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleDelete(record.ServiceID)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                    No counselling records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Modals */}
      <CounsellingModal isOpen={isCreateModalOpen} onClose={handleCreateModalClose} onSubmit={handleCreateSubmit} />
      <CounsellingViewModal
        isOpen={isViewModalOpen}
        onClose={handleViewModalClose}
        counsellingData={selectedCounselling}
      />
      <CounsellingUpdateModal isOpen={isUpdateModalOpen} onClose={handleUpdateModalClose} onSave={handleUpdateSubmit} counselling={selectedCounselling} />
    </div>
  );
};

export default CounsellingSupport;
