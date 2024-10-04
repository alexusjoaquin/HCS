// src/services/educationService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const educationService = {
  // Fetch all education records
  getAllEducationRecords: async () => {
    try {
      const response = await axios.get(apiconfig.educationservice.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the array of education records
      } else {
        throw new Error(response.data.message || 'Failed to fetch education records');
      }
    } catch (error) {
      console.error('Error fetching education records:', error);
      throw error;
    }
  },

  // Create a new education record
  createEducationRecord: async (educationData) => {
    try {
      const response = await axios.post(apiconfig.educationservice.create, educationData);
      if (response.status === 200) {
        return response.data; // Return the created education record
      } else {
        throw new Error(response.data.message || 'Failed to create education record');
      }
    } catch (error) {
      console.error('Error creating education record:', error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  },

  // Update an existing education record
  updateEducationRecord: async (educationData) => {
    try {
      const response = await axios.put(apiconfig.educationservice.update, educationData);
      if (response.status === 200) {
        return response.data; // Returns the updated education record
      } else {
        throw new Error(response.data.message || 'Failed to update education record');
      }
    } catch (error) {
      console.error('Error updating education record:', error.response?.data || error.message);
      throw error;
    }
  },

  // Delete an education record
  deleteEducationRecord: async (studentID) => {
    try {
      const response = await axios.delete(apiconfig.educationservice.delete, {
        data: { StudentID: studentID }, // Ensure this matches the expected key
      });
      if (response.status === 200) {
        return response.data.message; // Assuming response follows a successful pattern
      } else {
        throw new Error(response.data.message || 'Failed to delete education record');
      }
    } catch (error) {
      console.error('Error deleting education record:', error);
      throw error;
    }
  },

  // Fetch education record by Student ID
  getEducationRecordById: async (id) => {
    try {
      const response = await axios.get(apiconfig.educationservice.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the education record object
      } else {
        throw new Error(response.data.message || 'Failed to fetch education record');
      }
    } catch (error) {
      console.error(`Error fetching education record with id ${id}:`, error);
      throw error;
    }
  },
};

export default educationService;
