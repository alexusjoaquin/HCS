// src/services/healthManagementService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const healthManagementService = {
  // Fetch all health management records
  getAllRecords: async () => {
    try {
      const response = await axios.get(apiconfig.healthmanagement.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the array of health management records
      } else {
        throw new Error(response.data.message || 'Failed to fetch health management records');
      }
    } catch (error) {
      console.error('Error fetching health management records:', error);
      throw error;
    }
  },

  // Create a new health management record
  createRecord: async (recordData) => {
    try {
      const response = await axios.post(apiconfig.healthmanagement.create, recordData);
      if (response.status === 200) {
        return response.data; // Return the created record
      } else {
        throw new Error(response.data.message || 'Failed to create health management record');
      }
    } catch (error) {
      console.error('Error creating health management record:', error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  },

  // Update an existing health management record
  updateRecord: async (recordData) => {
    try {
      const response = await axios.put(apiconfig.healthmanagement.update, recordData);
      if (response.status === 200) {
        return response.data; // Returns the updated record
      } else {
        throw new Error(response.data.message || 'Failed to update health management record');
      }
    } catch (error) {
      console.error('Error updating health management record:', error.response?.data || error.message);
      throw error;
    }
  },

// Delete a health management record
deleteRecord: async (recordID) => {
    try {
      const response = await axios.delete(apiconfig.healthmanagement.delete, {
        data: { RecordID: recordID }, // Ensure 'RecordID' is used
      });
      if (response.status === 200) {
        return response.data.message;
      } else {
        throw new Error(response.data.message || 'Failed to delete health management record');
      }
    } catch (error) {
      console.error('Error deleting health management record:', error);
      throw error; // This will be caught in the calling function
    }
  }
  ,
  

  // Fetch health management record by ID
  getRecordById: async (id) => {
    try {
      const response = await axios.get(apiconfig.healthmanagement.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the health management record object
      } else {
        throw new Error(response.data.message || 'Failed to fetch health management record');
      }
    } catch (error) {
      console.error(`Error fetching health management record with id ${id}:`, error);
      throw error;
    }
  },
};

export default healthManagementService;
