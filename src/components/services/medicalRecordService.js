// src/services/medicalRecordService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const medicalRecordService = {
  // Fetch all medical records
  getAllMedicalRecords: async () => {
    try {
      const response = await axios.get(apiconfig.medical.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns an array of medical records
      } else {
        throw new Error(response.data.message || 'Failed to fetch medical records');
      }
    } catch (error) {
      console.error('Error fetching medical records:', error);
      throw error;
    }
  },

  // Create a new medical record
  createMedicalRecord: async (recordData) => {
    try {
      const response = await axios.post(apiconfig.medical.create, recordData);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the created medical record
      } else {
        throw new Error(response.data.message || 'Failed to create medical record');
      }
    } catch (error) {
      console.error('Error creating medical record:', error);
      throw error;
    }
  },

  // Update an existing medical record
  updateMedicalRecord: async (recordData) => {
    try {
      const response = await axios.put(apiconfig.medical.update, recordData);
      if (response.data.status === 'success') {
        return response.data.updatedAttributes; // Returns the updated attributes
      } else {
        throw new Error(response.data.message || 'Failed to update medical record');
      }
    } catch (error) {
      console.error('Error updating medical record:', error);
      throw error;
    }
  },

  // Delete a medical record
  deleteMedicalRecord: async (recordID) => {
    try {
      const response = await axios.delete(apiconfig.medical.delete, {
        data: { RecordID: recordID },
      });
      if (response.data.status === 'success') {
        return response.data.message; // Confirmation message
      } else {
        throw new Error(response.data.message || 'Failed to delete medical record');
      }
    } catch (error) {
      console.error('Error deleting medical record:', error);
      throw error;
    }
  },

  // Fetch a medical record by ID
  getMedicalRecordById: async (id) => {
    try {
      const response = await axios.get(apiconfig.medical.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the medical record object
      } else {
        throw new Error(response.data.message || 'Failed to fetch medical record');
      }
    } catch (error) {
      console.error(`Error fetching medical record with ID ${id}:`, error);
      throw error;
    }
  },
};

export default medicalRecordService;
