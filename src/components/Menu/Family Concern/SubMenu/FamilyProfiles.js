import React, { useState, useEffect } from 'react';
import Sidebar from '../../../templates/Sidebar';
import FamilyProfilesModal from '../Modals/FamilyProfilesModal/FamilyProfilesModal';
import FamilyProfilesUpdateModal from '../Modals/FamilyProfilesUpdateModal/FamilyProfilesUpdateModal';
import FamilyProfilesViewModal from '../Modals/FamilyProfilesViewModal/FamilyProfilesViewModal';
import familyprofilesService from '../../../services/familyprofilesService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';

const MySwal = withReactContent(Swal);

const FamilyProfiles = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [familyProfiles, setFamilyProfiles] = useState([]);


  useEffect(() => {
    fetchFamilyProfiles();
  }, []);

  const fetchFamilyProfiles = async () => {
    try {
      const response = await familyprofilesService.getAllFamilyProfiles();
      if (response && Array.isArray(response)) {
        setFamilyProfiles(response);
      } else {
        console.warn('Fetched data is not an array:', response);
        setFamilyProfiles([]);
      }
    } catch (error) {
      console.error('Failed to fetch family profiles:', error);
      toast.error('Failed to fetch family profiles. ' + error.message);
    }
  };

  const handleNewProfile = () => {
    setSelectedProfile(null);
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateSubmit = async (data) => {
    try {
      const familyProfileData = {
        FamilyID: `FAM-${Math.floor(Date.now() / 1000)}`,
        FamilyName: data.FamilyName,
        Members: data.Members,
        Address: data.Address,
        ContactNo: data.ContactNo,
      };

      await familyprofilesService.createFamilyProfile(familyProfileData);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Family profile created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false);
      fetchFamilyProfiles();
    } catch (error) {
      console.error('Error creating family profile:', error);
      toast.error('Failed to create family profile: ' + error.message);
    }
  };

  const handleView = (profile) => {
    setSelectedProfile(profile);
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedProfile(null);
  };

  const handleUpdate = (profile) => {
    if (profile) {
      setSelectedProfile(profile);
      setUpdateModalOpen(true);
    }
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedProfile(null);
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const updatedProfile = {
        FamilyID: selectedProfile.FamilyID,
        FamilyName: data.FamilyName,
        Members: data.Members,
        Address: data.Address,
        ContactNo: data.ContactNo,
      };

      await familyprofilesService.updateFamilyProfile(updatedProfile);
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Family profile updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false);
      fetchFamilyProfiles();
    } catch (error) {
      console.error('Error updating family profile:', error);
      toast.error('Failed to update family profile: ' + error.message);
    }
  };

  const handleDelete = async (familyID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this family profile?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await familyprofilesService.deleteFamilyProfile(familyID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Family profile has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchFamilyProfiles();
      } catch (error) {
        console.error('Error deleting family profile:', error);
        toast.error('Failed to delete family profile: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content" style={{ padding: '20px' }}>
        <Typography variant="h4" className="header" style={{ fontWeight: '700', marginLeft: '40px', marginTop: '20px' }}>FAMILY PROFILES</Typography>

        <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', gap: '30px' }}>
          <Button variant="contained" color="primary" style={{ height: '56px' }} onClick={handleNewProfile}>
            + New Record
          </Button>
          <TextField
            style={{ width: '300px', marginRight: '40px' }}
            variant="outlined"
            placeholder="Search records"
            className="search-input"
          />
        </div>

        <TableContainer style={{ maxWidth: '95%', margin: '30px auto', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Family ID', 'Family Name', 'Members', 'Address', 'Contact No.', 'Actions'].map((header) => (
                  <TableCell key={header} style={{ backgroundColor: '#0B8769', color: 'white', padding: '10px', textAlign: 'center' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(familyProfiles) && familyProfiles.length > 0 ? (
                familyProfiles.map((profile) => (
                  <TableRow key={profile.FamilyID}>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{profile.FamilyID}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{profile.FamilyName}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{profile.Members}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{profile.Address}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{profile.ContactNo}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>
                      <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={() => handleView(profile)}>
                        View
                      </Button>
                      <Button variant="contained" color="secondary" style={{ marginRight: '10px' }} onClick={() => handleUpdate(profile)}>
                        Update
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleDelete(profile.FamilyID)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                    No family profiles found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Modal for New Family Profile */}
      <FamilyProfilesModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        onSubmit={handleCreateSubmit}
      />

      {/* Modal for Viewing Family Profile */}
      <FamilyProfilesViewModal
        isOpen={isViewModalOpen}
        onClose={handleViewModalClose}
        familyProfile={selectedProfile}
      />

      {/* Modal for Updating Family Profile */}
      <FamilyProfilesUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        onSave={handleUpdateSubmit}
        profile={selectedProfile}
      />
    </div>
  );
};

export default FamilyProfiles;
