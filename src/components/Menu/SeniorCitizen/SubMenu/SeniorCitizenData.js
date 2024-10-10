import React, { useState, useEffect } from 'react';
import Sidebar from '../../../templates/Sidebar';
import SeniorCitizenModal from '../Modals/SeniorCitizenModal/SeniorCitizenModal';
import SeniorCitizenViewModal from '../Modals/SeniorCitizenViewModal/SeniorCitizenViewModal';
import SeniorCitizenUpdateModal from '../Modals/SeniorCitizenUpdateModal/SeniorCitizenUpdateModal';
import seniorcitizenService from '../../../services/seniorcitizenService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, IconButton, Tooltip } from '@mui/material';
import { CSVLink } from 'react-csv'; 
import ImportExportIcon from '@mui/icons-material/ImportExport'; 
import PrintIcon from '@mui/icons-material/Print'; 

const MySwal = withReactContent(Swal);

const SeniorCitizenData = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedSeniorCitizen, setSelectedSeniorCitizen] = useState(null);
  const [seniorCitizens, setSeniorCitizens] = useState([]);
  const [filteredCitizens, setFilteredCitizens] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch senior citizens data when component loads
  useEffect(() => {
    fetchSeniorCitizens();
  }, []);

  useEffect(() => {
    const results = seniorCitizens.filter(citizen =>
      citizen.FullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      citizen.Address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      citizen.ContactInfo?.Phone.includes(searchTerm) ||
      citizen.Gender.toLowerCase().includes(searchTerm) ||
      citizen.MedicalHistory.toLowerCase().includes(searchTerm)
    );
    setFilteredCitizens(results);
  }, [searchTerm, seniorCitizens]);

  const fetchSeniorCitizens = async () => {
    try {
      const response = await seniorcitizenService.getAllSeniorCitizens();
      console.log('Fetched senior citizens:', response);
      setSeniorCitizens(response);
      setFilteredCitizens(response); // Initialize filtered citizens
    } catch (error) {
      console.error('Failed to fetch senior citizens:', error);
    }
  };



  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateSubmit = async (data) => {
    try {
      const seniorCitizenData = {
        SeniorID: `S-${Math.floor(Date.now() / 1000)}`,
        FullName: data.FullName,
        Address: data.Address,
        DateOfBirth: data.DateOfBirth,
        ContactInfo: data.ContactInfo,
        Gender: data.Gender,
        MedicalHistory: data.MedicalHistory,
      };
  
      await seniorcitizenService.createSeniorCitizen(seniorCitizenData);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Senior Citizen record created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false);
      fetchSeniorCitizens();
    } catch (error) {
      console.error('Error creating record:', error);
    }
  };

  const handleView = (seniorCitizen) => {
    setSelectedSeniorCitizen(seniorCitizen);
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedSeniorCitizen(null);
  };

  
  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedSeniorCitizen(null);
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const updatedSeniorCitizen = {
        SeniorID: selectedSeniorCitizen.SeniorID,
        FullName: data.FullName,
        Address: data.Address,
        DateOfBirth: data.DateOfBirth,
        ContactInfo: { Phone: data.ContactInfo.Phone },
        Gender: data.Gender,
        MedicalHistory: data.MedicalHistory,
      };

      await seniorcitizenService.updateSeniorCitizen(updatedSeniorCitizen);
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Senior Citizen record updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false);
      fetchSeniorCitizens();
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  
  // CSV headers for export
  const csvHeaders = [
    { label: "Senior ID", key: "SeniorID" },
    { label: "Full Name", key: "FullName" },
    { label: "Address", key: "Address" },
    { label: "Date Of Birth", key: "DateOfBirth" },
    { label: "Contact Info", key: "ContactInfo" },
    { label: "Gender", key: "Gender" },
    { label: "Medical History", key: "MedicalHistory" }
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
          SENIOR CITIZEN DATA
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
              <CSVLink data={seniorCitizens} headers={csvHeaders} filename="senior_citizens.csv">
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
            placeholder="Search senior citizens"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <TableContainer style={{ maxWidth: '95%', margin: '30px auto', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Senior ID', 'Full Name', 'Address', 'Date of Birth', 'Contact Info', 'Gender', 'Medical History', 'Actions'].map((header) => (
                  <TableCell key={header} style={{ backgroundColor: '#0B8769', color: 'white', padding: '10px', textAlign: 'center' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(filteredCitizens) && filteredCitizens.length > 0 ? (
                filteredCitizens.map((citizen) => (
                  <TableRow key={citizen.SeniorID}>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{citizen.SeniorID}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{citizen.FullName}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{citizen.Address}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{citizen.DateOfBirth}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{citizen.ContactInfo?.Phone}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{citizen.Gender}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{citizen.MedicalHistory}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>
                      <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={() => handleView(citizen)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} style={{ textAlign: 'center' }}>
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
        onSubmit={handleCreateSubmit}
      />

      {/* Modal for Viewing Senior Citizen Record */}
      <SeniorCitizenViewModal
        isOpen={isViewModalOpen}
        onClose={handleViewModalClose}
        seniorCitizen={selectedSeniorCitizen}
      />

      {/* Modal for Updating Senior Citizen Record */}
      <SeniorCitizenUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        onSave={handleUpdateSubmit}
        seniorCitizen={selectedSeniorCitizen}
      />
    </div>
  );
};

export default SeniorCitizenData;
