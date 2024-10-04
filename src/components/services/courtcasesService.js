// src/services/courtcasesService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const courtcasesService = {
  // Fetch all court cases
  getAllCourtCases: async () => {
    try {
      const response = await axios.get(apiconfig.courtcases.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the array of court cases
      } else {
        throw new Error(response.data.message || 'Failed to fetch court cases');
      }
    } catch (error) {
      console.error('Error fetching court cases:', error);
      throw error;
    }
  },

  // Create a new court case
  createCourtCase: async (courtCaseData) => {
    try {
      const response = await axios.post(apiconfig.courtcases.create, courtCaseData);
      if (response.status === 200) {
        return response.data; // Return the created court case
      } else {
        throw new Error(response.data.message || 'Failed to create court case');
      }
    } catch (error) {
      console.error('Error creating court case:', error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  },

  // Update an existing court case
  updateCourtCase: async (courtCaseData) => {
    try {
      const response = await axios.put(apiconfig.courtcases.update, courtCaseData);
      if (response.status === 200) {
        return response.data; // Returns the updated court case
      } else {
        throw new Error(response.data.message || 'Failed to update court case');
      }
    } catch (error) {
      console.error('Error updating court case:', error.response?.data || error.message);
      throw error;
    }
  },

  // Delete a court case
  deleteCourtCase: async (caseID) => {
    try {
      const response = await axios.delete(apiconfig.courtcases.delete, {
        data: { CaseID: caseID }, // Ensure this matches the expected key
      });
      if (response.status === 200) {
        return response.data.message; // Assuming response follows a successful pattern
      } else {
        throw new Error(response.data.message || 'Failed to delete court case');
      }
    } catch (error) {
      console.error('Error deleting court case:', error);
      throw error;
    }
  },

  // Fetch court case by ID
  getCourtCaseById: async (id) => {
    try {
      const response = await axios.get(apiconfig.courtcases.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the court case object
      } else {
        throw new Error(response.data.message || 'Failed to fetch court case');
      }
    } catch (error) {
      console.error(`Error fetching court case with id ${id}:`, error);
      throw error;
    }
  },
};

export default courtcasesService;
