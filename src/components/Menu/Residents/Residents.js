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
  const [filteredResidents, setFilteredResidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);

  useEffect(() => {
    fetchResidents();
  }, []);

  useEffect(() => {
    // Filter residents based on search term
    const results = residents.filter(resident =>
      resident.ResidentID.toString().includes(searchTerm) ||
      resident.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResidents(results);
  }, [searchTerm, residents]);

  const fetchResidents = async () => {
    try {
      const response = await residentsService.getAllResidents();
      if (response && Array.isArray(response)) {
        setResidents(response);
        setFilteredResidents(response); // Initialize filtered residents
      } else {
        console.warn('Fetched data is not an array:', response);
        setResidents([]);
        setFilteredResidents([]);
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

  return (
    <div className="container">
      <Sidebar />
      <div className="content" style={{ padding: '20px' }}>
        <Typography variant="h4" className="header" style={{ fontWeight: '700', marginLeft: '40px', marginTop: '20px' }}>RESIDENTS</Typography>

        <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', gap: '30px' }}>
          <Button variant="contained" color="primary" style={{ height: '56px' }} onClick={handleNewResident}>
            + New Resident
          </Button>
          <TextField
            style={{ width: '300px', marginRight: '40px' }}
            variant="outlined"
            placeholder="Search residents"
            className="search-input"
            value={searchTerm} // Bind search input to state
            onChange={(e) => setSearchTerm(e.target.value)} // Update state on change
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
              {Array.isArray(filteredResidents) && filteredResidents.length > 0 ? (
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
                      <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={() => handleView(resident)}>
                        View
                      </Button>
                      <Button variant="contained" color="secondary" style={{ marginRight: '10px' }} onClick={() => handleUpdate(resident)}>
                        Update
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleDelete(resident.ResidentID)}>
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
