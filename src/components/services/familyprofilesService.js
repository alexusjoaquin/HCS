// src/services/familyprofilesService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const familyprofilesService = {
  // Fetch all family profiles
  getAllFamilyProfiles: async () => {
    try {
      const response = await axios.get(apiconfig.familyprofiles.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the array of family profiles
      } else {
        throw new Error(response.data.message || 'Failed to fetch family profiles');
      }
    } catch (error) {
      console.error('Error fetching family profiles:', error);
      throw error;
    }
  },

  // Create a new family profile
  createFamilyProfile: async (familyProfileData) => {
    try {
      const response = await axios.post(apiconfig.familyprofiles.create, familyProfileData);
      if (response.status === 200) {
        return response.data; // Return the created family profile
      } else {
        throw new Error(response.data.message || 'Failed to create family profile');
      }
    } catch (error) {
      console.error('Error creating family profile:', error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  },

  // Update an existing family profile
  updateFamilyProfile: async (familyProfileData) => {
    try {
      const response = await axios.put(apiconfig.familyprofiles.update, familyProfileData);
      if (response.status === 200) {
        return response.data; // Returns the updated family profile
      } else {
        throw new Error(response.data.message || 'Failed to update family profile');
      }
    } catch (error) {
      console.error('Error updating family profile:', error.response?.data || error.message);
      throw error;
    }
  },

  // Delete a family profile
  deleteFamilyProfile: async (familyID) => {
    try {
      const response = await axios.delete(apiconfig.familyprofiles.delete, {
        data: { FamilyID: familyID }, // Ensure this matches the expected key
      });
      if (response.status === 200) {
        return response.data.message; // Assuming response follows a successful pattern
      } else {
        throw new Error(response.data.message || 'Failed to delete family profile');
      }
    } catch (error) {
      console.error('Error deleting family profile:', error);
      throw error;
    }
  },

  // Fetch family profile by ID
  getFamilyProfileById: async (id) => {
    try {
      const response = await axios.get(apiconfig.familyprofiles.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the family profile object
      } else {
        throw new Error(response.data.message || 'Failed to fetch family profile');
      }
    } catch (error) {
      console.error(`Error fetching family profile with id ${id}:`, error);
      throw error;
    }
  },
};

export default familyprofilesService;
