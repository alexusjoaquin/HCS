import React, { useState, useEffect } from 'react';
import Sidebar from '../../../templates/Sidebar';
import FamilyProfilesModal from '../Modals/FamilyProfilesModal/FamilyProfilesModal';
import FamilyProfilesUpdateModal from '../Modals/FamilyProfilesUpdateModal/FamilyProfilesUpdateModal';
import FamilyProfilesViewModal from '../Modals/FamilyProfilesViewModal/FamilyProfilesViewModal';
import familyprofilesService from '../../../services/familyprofilesService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CircularProgress ,Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, IconButton, Tooltip } from '@mui/material';
import { CSVLink } from 'react-csv'; 
import ImportExportIcon from '@mui/icons-material/ImportExport'; 
import PrintIcon from '@mui/icons-material/Print'; 
const MySwal = withReactContent(Swal);

const FamilyProfiles = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [familyProfiles, setFamilyProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  const username = localStorage.getItem('username'); // Get username from localStorage
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
    fetchFamilyProfiles();
  }, []);

  useEffect(() => {
    const results = familyProfiles.filter(profile =>
      profile.FamilyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.Members.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.Address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.ContactNo.includes(searchTerm)
    );
    setFilteredProfiles(results);
  }, [searchTerm, familyProfiles]);

  const fetchFamilyProfiles = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await familyprofilesService.getAllFamilyProfiles();
      if (response && Array.isArray(response)) {
        // Filter family profiles by barangay
        const filteredProfiles = isAdmin ? response : response.filter(profile => profile.Address === barangay);
  
        setFamilyProfiles(filteredProfiles);
        setFilteredProfiles(filteredProfiles); // Initialize filtered profiles
      } else {
        console.warn('Fetched data is not an array:', response);
        setFamilyProfiles([]);
        setFilteredProfiles([]);
      }
    } catch (error) {
      console.error('Failed to fetch family profiles:', error);
      toast.error('Failed to fetch family profiles. ' + error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
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

    // CSV headers for export
    const csvHeaders = [
      { label: "Family ID", key: "FamilyID" },
      { label: "Family Name", key: "FamilyName" },
      { label: "Members", key: "Members" },
      { label: "Address", key: "Address" },
      { label: "Contact No", key: "ContactNo" },
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
        <Typography variant="h4" className="header" style={{ fontWeight: '700', marginLeft: '40px', marginTop: '20px' }}>FAMILY PROFILES</Typography>

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
              <CSVLink data={filteredProfiles} headers={csvHeaders} filename="crime_reports.csv">
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
          
          <Button variant="contained" color="primary" style={{ height: '56px' }} onClick={handleNewProfile}>
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
                {['Family ID', 'Family Name', 'Members', 'Address', 'Contact No.', 'Actions'].map((header) => (
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
              ) : Array.isArray(filteredProfiles) && filteredProfiles.length > 0 ? (
                filteredProfiles.map((profile) => (
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
          family={selectedProfile} // Change here
        />

    </div>
  );
};

export default FamilyProfiles;
