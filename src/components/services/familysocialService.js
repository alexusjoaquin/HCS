// src/services/familysocialService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const familysocialService = {
  // Fetch all family social records
  getAllFamilySocialRecords: async () => {
    try {
      const response = await axios.get(apiconfig.familysocialservice.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the array of family social records
      } else {
        throw new Error(response.data.message || 'Failed to fetch family social records');
      }
    } catch (error) {
      console.error('Error fetching family social records:', error);
      throw error;
    }
  },

  // Create a new family social record
  createFamilySocialRecord: async (familySocialData) => {
    try {
      const response = await axios.post(apiconfig.familysocialservice.create, familySocialData);
      if (response.status === 200) {
        return response.data; // Return the created family social record
      } else {
        throw new Error(response.data.message || 'Failed to create family social record');
      }
    } catch (error) {
      console.error('Error creating family social record:', error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  },

  // Update an existing family social record
  updateFamilySocialRecord: async (familySocialData) => {
    try {
      const response = await axios.put(apiconfig.familysocialservice.update, familySocialData);
      if (response.status === 200) {
        return response.data; // Returns the updated family social record
      } else {
        throw new Error(response.data.message || 'Failed to update family social record');
      }
    } catch (error) {
      console.error('Error updating family social record:', error.response?.data || error.message);
      throw error;
    }
  },

  // Delete a family social record
  deleteFamilySocialRecord: async (serviceID) => {
    try {
        const response = await axios.delete(`${apiconfig.familysocialservice.delete}?ServiceID=${serviceID}`);
        if (response.status === 200) {
            return response.data.message;
        } else {
            throw new Error(response.data.message || 'Failed to delete family social record');
        }
    } catch (error) {
        console.error('Error deleting family social record:', error);
        throw error;
    }
},

  // Fetch family social record by ID
  getFamilySocialRecordById: async (id) => {
    try {
      const response = await axios.get(apiconfig.familysocialservice.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the family social record object
      } else {
        throw new Error(response.data.message || 'Failed to fetch family social record');
      }
    } catch (error) {
      console.error(`Error fetching family social record with id ${id}:`, error);
      throw error;
    }
  },
};

export default familysocialService;
