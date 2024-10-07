import React, { useState, useEffect } from 'react';
import Sidebar from '../../templates/Sidebar';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import residentsService from '../../services/residentsService';
import { toast } from 'react-toastify';
import ResidentCreateModal from './Modals/ResidentCreateModal';
import ResidentViewModal from './Modals/ResidentViewModal';
import ResidentUpdateModal from './Modals/ResidentUpdateModal';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import '../Health/CssFiles/Appointment.css';

const MySwal = withReactContent(Swal);

const Residents = () => {
  const [residents, setResidents] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    try {
      const response = await residentsService.getAllResidents(); // Fetch residents data
      if (response && Array.isArray(response)) {
        setResidents(response);
      } else {
        console.warn('Fetched data is not an array:', response);
        setResidents([]);
      }
    } catch (error) {
      console.error('Failed to fetch residents:', error);
      toast.error('Failed to fetch residents. ' + error.message);
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
        ...selectedResident, // Keep the existing resident details
        ...data, // Overwrite with the new form data
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

  return (
    <div className="container">
      <Sidebar />
      <div className="content" style={{ padding: '20px'}}>
        <Typography variant="h4" className="header" style={{fontWeight: '700', marginLeft: '40px', marginTop: '20PX'}}>RESIDENTS</Typography>

        <div className="button-container" style={{ display:'flex',justifyContent: 'flex-end', gap: '30px'}}>
          <Button variant="contained" color="primary" style={{height: '56px'}} onClick={handleNewResident}>
            + New Resident
          </Button>
          <TextField
            style={{ width: '300px', marginRight: '40px'}}
            variant="outlined"
            placeholder="Search residents"
            className="search-input"
            // Implement search functionality if desired
          />
        </div>

        <TableContainer style={{ maxWidth: '95%', margin: '30px auto', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor: '#0B8769', color: 'white' }}>RESIDENT ID</TableCell>
                <TableCell style={{ backgroundColor: '#0B8769', color: 'white' }}>NAME</TableCell>
                <TableCell style={{ backgroundColor: '#0B8769', color: 'white' }}>AGE</TableCell>
                <TableCell style={{ backgroundColor: '#0B8769', color: 'white' }}>BIRTHDATE</TableCell>
                <TableCell style={{ backgroundColor: '#0B8769', color: 'white' }}>GENDER</TableCell>
                <TableCell style={{ backgroundColor: '#0B8769', color: 'white' }}>ADDRESS</TableCell>
                <TableCell style={{ backgroundColor: '#0B8769', color: 'white' }}>IF SENIOR</TableCell>
                <TableCell style={{ backgroundColor: '#0B8769', color: 'white' }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(residents) && residents.length > 0 ? (
                residents.map((resident) => (
                  <TableRow key={resident.id}>
                    <TableCell>{resident.ResidentID}</TableCell> {/* Display ResidentID */}
                    <TableCell>{resident.Name}</TableCell>
                    <TableCell>{resident.Age}</TableCell>
                    <TableCell>{resident.Birthday}</TableCell>
                    <TableCell>{resident.Gender}</TableCell>
                    <TableCell>{resident.Address}</TableCell>
                    <TableCell>{resident.is_senior ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => handleView(resident)}>
                        View
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => handleUpdate(resident)}>
                        Update
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleDelete(resident.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} style={{ textAlign: 'center' }}>
                    No residents found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

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
        resident={selectedResident}
        onSubmit={handleUpdateSubmit}
      />
    </div>
  );
};

export default Residents;
