// src/services/victimsService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const victimsService = {
  // Fetch all victims
  getAllVictims: async () => {
    try {
      const response = await axios.get(apiconfig.victims.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the array of victims
      } else {
        throw new Error(response.data.message || 'Failed to fetch victims');
      }
    } catch (error) {
      console.error('Error fetching victims:', error);
      throw error;
    }
  },

  // Create a new victim
  createVictim: async (victimData) => {
    try {
      const response = await axios.post(apiconfig.victims.create, victimData);
      if (response.status === 200) {
        return response.data; // Return the created victim
      } else {
        throw new Error(response.data.message || 'Failed to create victim');
      }
    } catch (error) {
      console.error('Error creating victim:', error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  },

  // Update an existing victim
  updateVictim: async (victimData) => {
    try {
      const response = await axios.put(apiconfig.victims.update, victimData);
      if (response.status === 200) {
        return response.data; // Returns the updated victim
      } else {
        throw new Error(response.data.message || 'Failed to update victim');
      }
    } catch (error) {
      console.error('Error updating victim:', error.response?.data || error.message);
      throw error;
    }
  },

  // Delete a victim
  deleteVictim: async (victimID) => {
    try {
      const response = await axios.delete(apiconfig.victims.delete, {
        data: { VictimID: victimID }, // Ensure this matches the expected key
      });
      if (response.status === 200) {
        return response.data.message; // Assuming response follows a successful pattern
      } else {
        throw new Error(response.data.message || 'Failed to delete victim');
      }
    } catch (error) {
      console.error('Error deleting victim:', error);
      throw error;
    }
  },

  // Fetch victim by ID
  getVictimById: async (id) => {
    try {
      const response = await axios.get(apiconfig.victims.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the victim object
      } else {
        throw new Error(response.data.message || 'Failed to fetch victim');
      }
    } catch (error) {
      console.error(`Error fetching victim with id ${id}:`, error);
      throw error;
    }
  },
};

export default victimsService;
