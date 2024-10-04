// src/services/financialService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const financialService = {
  // Fetch all financial assistance records
  getAllFinancialAssistance: async () => {
    try {
      const response = await axios.get(apiconfig.financialservice.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the array of financial assistance records
      } else {
        throw new Error(response.data.message || 'Failed to fetch financial assistance records');
      }
    } catch (error) {
      console.error('Error fetching financial assistance records:', error);
      throw error;
    }
  },

  // Create a new financial assistance record
  createFinancialAssistance: async (financialAssistanceData) => {
    try {
      const response = await axios.post(apiconfig.financialservice.create, financialAssistanceData);
      if (response.status === 200) {
        return response.data; // Return the created financial assistance record
      } else {
        throw new Error(response.data.message || 'Failed to create financial assistance record');
      }
    } catch (error) {
      console.error('Error creating financial assistance record:', error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  },

  // Update an existing financial assistance record
  updateFinancialAssistance: async (financialAssistanceData) => {
    try {
      const response = await axios.put(apiconfig.financialservice.update, financialAssistanceData);
      if (response.status === 200) {
        return response.data; // Returns the updated financial assistance record
      } else {
        throw new Error(response.data.message || 'Failed to update financial assistance record');
      }
    } catch (error) {
      console.error('Error updating financial assistance record:', error.response?.data || error.message);
      throw error;
    }
  },

  // Delete a financial assistance record
  deleteFinancialAssistance: async (assistanceID) => {
    try {
      const response = await axios.delete(apiconfig.financialservice.delete, {
        data: { AssistanceID: assistanceID }, // Ensure this matches the expected key
      });
      if (response.status === 200) {
        return response.data.message; // Assuming response follows a successful pattern
      } else {
        throw new Error(response.data.message || 'Failed to delete financial assistance record');
      }
    } catch (error) {
      console.error('Error deleting financial assistance record:', error);
      throw error;
    }
  },

  // Fetch financial assistance record by ID
  getFinancialAssistanceById: async (id) => {
    try {
      const response = await axios.get(apiconfig.financialservice.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the financial assistance record object
      } else {
        throw new Error(response.data.message || 'Failed to fetch financial assistance record');
      }
    } catch (error) {
      console.error(`Error fetching financial assistance record with id ${id}:`, error);
      throw error;
    }
  },
};

export default financialService;
