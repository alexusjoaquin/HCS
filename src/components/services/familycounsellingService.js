// src/services/familycounsellingService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const familycounsellingService = {
  // Fetch all family counselling records
  getAllFamilyCounselling: async () => {
    try {
      const response = await axios.get(apiconfig.familycounselling.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the array of family counselling records
      } else {
        throw new Error(response.data.message || 'Failed to fetch family counselling records');
      }
    } catch (error) {
      console.error('Error fetching family counselling records:', error);
      throw error;
    }
  },

  // Create a new family counselling record
  createFamilyCounselling: async (counsellingData) => {
    try {
      const response = await axios.post(apiconfig.familycounselling.create, counsellingData);
      if (response.status === 200) {
        return response.data; // Return the created family counselling record
      } else {
        throw new Error(response.data.message || 'Failed to create family counselling record');
      }
    } catch (error) {
      console.error('Error creating family counselling record:', error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  },

  // Update an existing family counselling record
  updateFamilyCounselling: async (counsellingData) => {
    try {
      const response = await axios.put(apiconfig.familycounselling.update, counsellingData);
      if (response.status === 200) {
        return response.data; // Returns the updated family counselling record
      } else {
        throw new Error(response.data.message || 'Failed to update family counselling record');
      }
    } catch (error) {
      console.error('Error updating family counselling record:', error.response?.data || error.message);
      throw error;
    }
  },

  // Delete a family counselling record
  deleteFamilyCounselling: async (counsellingID) => {
    try {
      const response = await axios.delete(apiconfig.familycounselling.delete, {
        data: { ServiceID: counsellingID }, // Ensure this matches the expected key
      });
      if (response.status === 200) {
        return response.data.message; // Assuming response follows a successful pattern
      } else {
        throw new Error(response.data.message || 'Failed to delete family counselling record');
      }
    } catch (error) {
      console.error('Error deleting family counselling record:', error);
      throw error;
    }
  },

  // Fetch family counselling record by ID
  getFamilyCounsellingById: async (id) => {
    try {
      const response = await axios.get(apiconfig.familycounselling.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the family counselling record object
      } else {
        throw new Error(response.data.message || 'Failed to fetch family counselling record');
      }
    } catch (error) {
      console.error(`Error fetching family counselling record with id ${id}:`, error);
      throw error;
    }
  },
};

export default familycounsellingService;
