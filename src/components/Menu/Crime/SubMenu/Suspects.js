import React, { useState, useEffect } from 'react';
import Sidebar from '../../../templates/Sidebar';
import suspectService from '../../../services/suspectService'; // Adjust the path if necessary
import SuspectModal from '../Modals/SuspectModal/SuspectModal';
import SuspectViewModal from '../Modals/SuspectViewModal/SuspectViewModal';
import SuspectUpdateModal from '../Modals/SuspectUpdateModal/SuspectUpdateModal';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';

const MySwal = withReactContent(Swal);

const Suspects = () => {
  const [suspects, setSuspects] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedSuspect, setSelectedSuspect] = useState(null);

  useEffect(() => {
    fetchSuspects();
  }, []);

  const fetchSuspects = async () => {
    try {
      const response = await suspectService.getAllSuspects();
      if (response && Array.isArray(response)) {
        setSuspects(response);
      } else {
        console.warn('Fetched data is not an array:', response);
        setSuspects([]);
      }
    } catch (error) {
      console.error('Failed to fetch suspects:', error);
      toast.error('Failed to fetch suspects. ' + error.message);
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
        SuspectID: `SUS-${Math.floor(Date.now() / 1000)}`, // Generate Suspect ID based on timestamp
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

  return (
    <div className="container">
      <Sidebar />
      <div className="content" style={{ padding: '20px' }}>
        <Typography variant="h4" className="header" style={{ fontWeight: '700', marginLeft: '40px', marginTop: '20px' }}>SUSPECTS</Typography>

        <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', gap: '30px' }}>
          <Button variant="contained" color="primary" style={{ height: '56px' }} onClick={handleNewSuspect}>
            + New Suspect
          </Button>
          <TextField
            style={{ width: '300px', marginRight: '40px' }}
            variant="outlined"
            placeholder="Search suspects"
            className="search-input"
          />
        </div>

        <TableContainer style={{ maxWidth: '95%', margin: '30px auto', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Suspect ID', 'Full Name', 'Alias', 'Last Known Address', 'Status', 'Actions'].map((header) => (
                  <TableCell key={header} style={{ backgroundColor: '#0B8769', color: 'white', padding: '10px', textAlign: 'center' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(suspects) && suspects.length > 0 ? (
                suspects.map((suspect) => (
                  <TableRow key={suspect.SuspectID}>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{suspect.SuspectID}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{suspect.FullName}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{suspect.Alias}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{suspect.LastKnownAddress}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{suspect.Status}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>
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
                  <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                    No suspects found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

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
  );
};

export default Suspects;
