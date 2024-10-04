// src/components/Patients/Patients.js
import React, { useState, useEffect } from 'react';
import Sidebar from '../../../templates/Sidebar';
import PatientModal from '../Modals/PatientModal/PatientModal';
import PatientViewModal from '../Modals/PatientViewModal/PatientViewModal';
import PatientUpdateModal from '../Modals/PatientUpdateModal/PatientUpdateModal';
import patientService from '../../../services/patientService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';

const MySwal = withReactContent(Swal);

const Patients = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await patientService.getAllPatients();
      console.log('Fetched patients:', data);
      if (Array.isArray(data)) {
        setPatients(data);
      } else {
        console.warn('Fetched data is not an array:', data);
        setPatients([]);
      }
    } catch (error) {
      console.error('Failed to fetch patients:', error);
      toast.error('Failed to fetch patients.');
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
        PatientID: `P${Math.floor(Date.now() / 1000)}`, // Simple unique ID
        FirstName: data.FirstName,
        LastName: data.LastName,
        DateOfBirth: data.DateOfBirth,
        ContactInfo: data.ContactInfo,
        Gender: data.Gender,
        MedicalHistory: data.MedicalHistory,
      };
      const response = await patientService.createPatient(patientData);
      console.log('Patient created:', response);
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

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedPatient(null);
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
        FirstName: data.FirstName,
        LastName: data.LastName,
        DateOfBirth: data.DateOfBirth,
        ContactInfo: data.ContactNo, // Make sure this matches the state
        Gender: data.Gender,
        MedicalHistory: data.MedicalHistory,
      };
      const response = await patientService.updatePatient(patientData);
      console.log('Patient updated:', response);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
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
      reverseButtons: true,
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

  return (
    <div className="container">
      <Sidebar />
      <div className="content" style={{ padding: '20px' }}>
        <Typography variant="h4" className="header" style={{fontWeight: '700', marginLeft: '40px', marginTop: '20px' }}>PATIENTS</Typography>

        <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', gap: '30px' }}>
          <Button variant="contained" color="primary" style={{ height: '56px' }} onClick={handleNewRecord}>
            + New Record
          </Button>
          <TextField
            style={{ width: '300px', marginRight: '40px' }}
            variant="outlined"
            placeholder="Search records"
            className="search-input"
            // Implement search functionality if desired
          />
        </div>

        <TableContainer style={{ maxWidth: '95%', margin: '30px auto', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Patient ID', 'First Name', 'Last Name', 'Date of Birth', 'Contact Info', 'Gender', 'Medical History', 'Actions'].map((header) => (
                  <TableCell key={header} style={{ backgroundColor: '#0B8769', color: 'white', padding: '10px', textAlign: 'center' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(patients) && patients.length > 0 ? (
                patients.map((patient) => (
                  <TableRow key={patient.PatientID}>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{patient.PatientID}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{patient.FirstName}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{patient.LastName}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{patient.DateOfBirth}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{patient.ContactNo}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{patient.Gender}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{patient.MedicalHistory}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>
                      <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={() => handleView(patient)}>
                        View
                      </Button>
                      <Button variant="contained" color="secondary" style={{ marginRight: '10px' }} onClick={() => handleUpdate(patient)}>
                        Update
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleDelete(patient.PatientID)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} style={{ textAlign: 'center' }}>
                    No patients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Modal for New Patient */}
      <PatientModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        onSubmit={handleCreateSubmit}
      />

      {/* Modal for Viewing Patient */}
      <PatientViewModal
        isOpen={isViewModalOpen}
        onClose={handleViewModalClose}
        patient={selectedPatient}
      />

      {/* Modal for Updating Patient */}
      <PatientUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        onSave={handleUpdateSave} // Make sure onSave is set to the correct function
        patient={selectedPatient}
        />
    </div>
  );
};

export default Patients;