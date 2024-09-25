// src/services/investigationService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const investigationService = {
  // Fetch all investigations
  getAllInvestigations: async () => {
    try {
      const response = await axios.get(apiconfig.investigation.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the array of investigations
      } else {
        throw new Error(response.data.message || 'Failed to fetch investigations');
      }
    } catch (error) {
      console.error('Error fetching investigations:', error);
      throw error;
    }
  },

  // Create a new investigation
  createInvestigation: async (investigationData) => {
    try {
      const response = await axios.post(apiconfig.investigation.create, investigationData);
      if (response.status === 200) {
        return response.data; // Return the created investigation
      } else {
        throw new Error(response.data.message || 'Failed to create investigation');
      }
    } catch (error) {
      console.error('Error creating investigation:', error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  },

  // Update an existing investigation
  updateInvestigation: async (investigationData) => {
    try {
      const response = await axios.put(apiconfig.investigation.update, investigationData);
      if (response.status === 200) {
        return response.data; // Returns the updated investigation
      } else {
        throw new Error(response.data.message || 'Failed to update investigation');
      }
    } catch (error) {
      console.error('Error updating investigation:', error.response?.data || error.message);
      throw error;
    }
  },

  // Delete an investigation
  deleteInvestigation: async (investigationID) => {
    try {
      const response = await axios.delete(apiconfig.investigation.delete, {
        data: { InvestigationID: investigationID }, // Ensure this matches the expected key
      });
      if (response.status === 200) {
        return response.data.message; // Assuming response follows a successful pattern
      } else {
        throw new Error(response.data.message || 'Failed to delete investigation');
      }
    } catch (error) {
      console.error('Error deleting investigation:', error);
      throw error;
    }
  },

  // Fetch investigation by ID
  getInvestigationById: async (id) => {
    try {
      const response = await axios.get(apiconfig.investigation.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the investigation object
      } else {
        throw new Error(response.data.message || 'Failed to fetch investigation');
      }
    } catch (error) {
      console.error(`Error fetching investigation with id ${id}:`, error);
      throw error;
    }
  },
};

export default investigationService;
