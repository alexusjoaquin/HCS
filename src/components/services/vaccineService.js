// src/services/vaccineService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const vaccineService = {
  // Fetch all vaccines
  getAllVaccines: async () => {
    try {
      const response = await axios.get(apiconfig.vaccines.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the array of vaccines
      } else {
        throw new Error(response.data.message || 'Failed to fetch vaccines');
      }
    } catch (error) {
      console.error('Error fetching vaccines:', error);
      throw error;
    }
  },

  // Create a new vaccine record
  createVaccine: async (vaccineData) => {
    try {
      const response = await axios.post(apiconfig.vaccines.create, vaccineData);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the created vaccine
      } else {
        throw new Error(response.data.message || 'Failed to create vaccine');
      }
    } catch (error) {
      console.error('Error creating vaccine:', error);
      throw error;
    }
  },

  // Update an existing vaccine record
  updateVaccine: async (vaccineData) => {
    try {
      const response = await axios.put(apiconfig.vaccines.update, vaccineData);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the updated vaccine
      } else {
        throw new Error(response.data.message || 'Failed to update vaccine');
      }
    } catch (error) {
      console.error('Error updating vaccine:', error);
      throw error;
    }
  },

  // Delete a vaccine record
  deleteVaccine: async (transactionID) => {
    try {
      const response = await axios.delete(apiconfig.vaccines.delete, {
        data: { TransactionID: transactionID },
      });
      if (response.data.status === 'success') {
        return response.data.message; // Confirmation message
      } else {
        throw new Error(response.data.message || 'Failed to delete vaccine');
      }
    } catch (error) {
      console.error('Error deleting vaccine:', error);
      throw error;
    }
  },

  // Fetch vaccine by Transaction ID
  getVaccineById: async (id) => {
    try {
      const response = await axios.get(apiconfig.vaccines.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the vaccine object
      } else {
        throw new Error(response.data.message || 'Failed to fetch vaccine');
      }
    } catch (error) {
      console.error(`Error fetching vaccine with id ${id}:`, error);
      throw error;
    }
  },
};

export default vaccineService;
