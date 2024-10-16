import React, { useState, useEffect } from 'react';
import Sidebar from '../../../templates/Sidebar';
import PatientModal from '../Modals/PatientModal/PatientModal';
import ResidentViewModal from '../../Residents/Modals/ResidentViewModal';
import PatientUpdateModal from '../Modals/PatientUpdateModal/PatientUpdateModal';
import patientService from '../../../services/patientService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import apiconfig from '../../../../api/apiconfig';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, IconButton, Tooltip, CircularProgress } from '@mui/material';
import { CSVLink } from 'react-csv'; 
import ImportExportIcon from '@mui/icons-material/ImportExport'; 
import PrintIcon from '@mui/icons-material/Print';

const MySwal = withReactContent(Swal);

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [residents, setResidents] = useState([]);
  const [selectedResident, setSelectedResident] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

 // Get username from localStorage
const username = localStorage.getItem('username'); 
const isAdmin = username && username.startsWith('admin'); // Check if the user is an admin

// Function to extract barangay name
const extractBarangay = (username) => {
  if (isAdmin) return null; // If admin, return null

  const parts = username.split('_');
  // Join all parts after the first one to handle names with spaces
  return parts.slice(1).join(' ').replace(/_/g, ' '); // Replace underscores with spaces
};

const barangay = extractBarangay(username); // Extract barangay

useEffect(() => {
  fetchPatients(); // Fetch patients when the component mounts
}, []);

useEffect(() => {
  const results = patients.filter(patient =>
    patient.PatientID.toString().includes(searchTerm) ||
    patient.Fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.Address.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredPatients(results);
}, [searchTerm, patients]);

const fetchPatients = async () => {
  setLoading(true); // Set loading to true when fetching starts
  try {
    const response = await patientService.getAllPatients();
    if (response && Array.isArray(response)) {
      const patients = response;

      // Filter patients by barangay
      const filteredPatients = isAdmin ? patients : patients.filter(patient => patient.Address === barangay);

      setPatients(filteredPatients);
      setFilteredPatients(filteredPatients);
    } else {
      console.warn('Fetched data is not an array:', response);
      setPatients([]);
      setFilteredPatients([]);
    }
  } catch (error) {
    console.error('Failed to fetch patients:', error);
    toast.error('Failed to fetch patients. ' + error.message);
  } finally {
    setLoading(false); // Set loading to false when fetching ends
  }
};


  const fetchResidents = async () => {
    try {
      const response = await fetch(apiconfig.residents.getAll);
      const data = await response.json();
      if (data.status === 'success' && Array.isArray(data.data)) {
        setResidents(data.data);
      } else {
        console.warn('Fetched resident data is not valid:', data);
        setResidents([]);
      }
    } catch (error) {
      console.error('Failed to fetch residents:', error);
      toast.error('Failed to fetch residents.');
    }
  };

  const handleNewRecord = () => {
    setSelectedPatient(null);
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateSubmit = async (data) => {
    try {
      const patientData = {
        PatientID: `P${Math.floor(Date.now() / 1000)}`,
        Fullname: data.Fullname,
        Address: data.Address,
        DateOfBirth: data.DateOfBirth,
        ContactNo: data.ContactNo,
        Gender: data.Gender,
        MedicalHistory: data.MedicalHistory,
      };
      await patientService.createPatient(patientData);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Patient created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false);
      fetchPatients();
    } catch (error) {
      console.error('Error creating patient:', error);
      toast.error('Failed to create patient.');
    }
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedResident(null);
  };

  const handleUpdate = (patient) => {
    setSelectedPatient(patient);
    setUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedPatient(null);
  };

  const handleUpdateSave = async (data) => {
    try {
      const patientData = {
        PatientID: data.PatientID,
        Fullname: data.Fullname,
        Address: data.Address,
        DateOfBirth: data.DateOfBirth,
        ContactNo: data.ContactNo,
        Gender: data.Gender,
        MedicalHistory: data.MedicalHistory,
      };
      await patientService.updatePatient(patientData);
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Patient updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false);
      fetchPatients();
    } catch (error) {
      console.error('Error updating patient:', error);
      toast.error('Failed to update patient.');
    }
  };

  const handleDelete = async (patientID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this patient?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await patientService.deletePatient(patientID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Patient has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchPatients();
      } catch (error) {
        console.error('Error deleting patient:', error);
        toast.error('Failed to delete patient.');
      }
    }
  };

  const handleFullNameClick = (fullName) => {
    const resident = residents.find(res => res.Name === fullName);
    if (resident) {
      setSelectedResident(resident);
      setViewModalOpen(true);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const csvData = e.target.result;
      try {
        await patientService.importPatientsCSV(csvData);
        toast.success("CSV data imported successfully!");
        fetchPatients();
      } catch (error) {
        console.error('Error importing patients:', error);
        toast.error('Failed to import patients.');
      }
    };

    if (file) reader.readAsText(file);
  };

  const handlePrint = () => {
    window.print();
  };

  const csvHeaders = [
    { label: "Patient ID", key: "PatientID" },
    { label: "Full Name", key: "Fullname" },
    { label: "Date of Birth", key: "DateOfBirth" },
    { label: "Gender", key: "Gender" },
    { label: "Address", key: "Address" },
    { label: "Medical History", key: "MedicalHistory" },
  ];

  return (
    <div className="container">
      <Sidebar />
      <div className="content" style={{ padding: '20px' }}>
        <Typography variant="h4" className="header" style={{ fontWeight: '700', marginLeft: '40px', marginTop: '20px' }}>PATIENTS</Typography>
        <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', gap: '30px', alignItems: 'center' }}>
          <input accept=".csv" id="import-csv" type="file" style={{ display: 'none' }} onChange={handleFileUpload} />
          <Tooltip title="Import CSV" arrow>
            <IconButton onClick={() => document.getElementById('import-csv').click()} color="primary" aria-label="Import CSV">
              <ImportExportIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export CSV" arrow>
            <span>
              <CSVLink data={patients} headers={csvHeaders} filename="patients_data.csv">
                <IconButton color="secondary" aria-label="Export CSV">
                  <ImportExportIcon />
                </IconButton>
              </CSVLink>
            </span>
          </Tooltip>
          <Tooltip title="Print Records" arrow>
            <IconButton color="error" onClick={handlePrint} aria-label="Print Records">
              <PrintIcon />
            </IconButton>
          </Tooltip>
          <Button variant="contained" color="primary" style={{ height: '56px' }} onClick={handleNewRecord}>
            + New Patient
          </Button>
          <TextField style={{ width: '300px', marginRight: '40px' }} variant="outlined" placeholder="Search patients" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <TableContainer style={{ maxWidth: '95%', margin: '30px auto', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Patient ID', 'Full Name', 'Date of Birth', 'Gender', 'Address', 'Medical History', 'Actions'].map((header) => (
                  <TableCell key={header} style={{ backgroundColor: '#0B8769', color: 'white', padding: '10px', textAlign: 'center' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? ( // Check if loading is true
                <TableRow>
                  <TableCell colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : Array.isArray(filteredPatients) && filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.PatientID}>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{patient.PatientID}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center', cursor: 'pointer', color: '#1976d2' }} onClick={() => handleFullNameClick(patient.Fullname)}>
                      {patient.Fullname}
                    </TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{patient.DateOfBirth}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{patient.Gender}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{patient.Address}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{patient.MedicalHistory}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>
                      <Button variant="contained" color="secondary" style={{ marginRight: '10px' }} onClick={() => handleUpdate(patient)}>Update</Button>
                      <Button variant="contained" color="error" onClick={() => handleDelete(patient.PatientID)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
                    No patients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <PatientModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onSubmit={handleCreateSubmit}
        />

        <ResidentViewModal
          isOpen={isViewModalOpen}
          onClose={handleViewModalClose}
          resident={selectedResident}
        />

        <PatientUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          onSave={handleUpdateSave}
          patient={selectedPatient}
        />
      </div>
    </div>
  );
};

export default Patients;
