import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import FamilyProfilesModal from '../Modals/FamilyProfilesModal/FamilyProfilesModal';
import FamilyProfilesUpdateModal from '../Modals/FamilyProfilesUpdateModal/FamilyProfilesUpdateModal';
import FamilyProfilesViewModal from '../Modals/FamilyProfilesViewModal/FamilyProfilesViewModal';
import familyprofilesService from '../../../services/familyprofilesService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const FamilyProfiles = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [familyProfiles, setFamilyProfiles] = useState([]);
  const navigate = useNavigate();

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

  const handleTabClick = (path) => {
    navigate(path);
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
        Members: data.Members, // Ensure this matches the expected structure in the backend
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
            FamilyID: selectedProfile.FamilyID,  // Ensure selectedProfile is valid
            FamilyName: data.FamilyName,
            Members: data.Members,  // Make sure this is sent correctly
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
      <div className="content">
        <h2 className="header">FAMILY PROFILES</h2>

        <div className="tabs">
          <ul className="tab-list">
            {[
            ].map((tab, index) => (
              <li key={index} onClick={() => handleTabClick(tab.path)} className="tab">
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="button-container">
          <button className="new-record-button" onClick={handleNewProfile}>
            + New Record
          </button>
          <input
            type="text"
            placeholder="Search records"
            className="search-input"
          />
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Family ID</th>
                <th>Family Name</th>
                <th>Members</th>
                <th>Address</th>
                <th>Contact No.</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(familyProfiles) && familyProfiles.length > 0 ? (
                familyProfiles.map((profile) => (
                  <tr key={profile.FamilyID}>
                    <td>{profile.FamilyID}</td>
                    <td>{profile.FamilyName}</td>
                    <td>{profile.Members}</td>
                    <td>{profile.Address}</td>
                    <td>{profile.ContactNo}</td>
                    <td className="actions">
                      <button className="view-button" onClick={() => handleView(profile)}>
                        View
                      </button>
                      <button className="update-button" onClick={() => handleUpdate(profile)}>
                        Update
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(profile.FamilyID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No family profiles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for New Family Profile */}
      {isCreateModalOpen && (
        <FamilyProfilesModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onSubmit={handleCreateSubmit}
        />
      )}

      {/* Modal for Viewing Family Profile */}
      {isViewModalOpen && (
        <FamilyProfilesViewModal
          isOpen={isViewModalOpen}
          onClose={handleViewModalClose}
          profile={selectedProfile}
        />
      )}

      {/* Modal for Updating Family Profile */}
      {isUpdateModalOpen && (
        <FamilyProfilesUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          onSave={handleUpdateSubmit}
          family={selectedProfile}
        />
      )}
    </div>
  );
};

export default FamilyProfiles;
