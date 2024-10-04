// src/services/patientService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const patientService = {
  // Fetch all patients
  getAllPatients: async () => {
    try {
      const response = await axios.get(apiconfig.patients.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the array of patients
      } else {
        throw new Error(response.data.message || 'Failed to fetch patients');
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  },

  // Create a new patient
  createPatient: async (patientData) => {
    try {
      const response = await axios.post(apiconfig.patients.create, patientData);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the created patient
      } else {
        throw new Error(response.data.message || 'Failed to create patient');
      }
    } catch (error) {
      console.error('Error creating patient:', error);
      throw error;
    }
  },

  // Update an existing patient
  updatePatient: async (patientData) => {
    try {
      const response = await axios.put(apiconfig.patients.update, patientData);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the updated patient
      } else {
        throw new Error(response.data.message || 'Failed to update patient');
      }
    } catch (error) {
      console.error('Error updating patient:', error);
      throw error;
    }
  },

  // Delete a patient
  deletePatient: async (patientID) => {
    try {
      const response = await axios.delete(apiconfig.patients.delete, {
        data: { PatientID: patientID },
      });
      if (response.data.status === 'success') {
        return response.data.message; // Confirmation message
      } else {
        throw new Error(response.data.message || 'Failed to delete patient');
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw error;
    }
  },

  // Fetch patient by ID
  getPatientById: async (id) => {
    try {
      const response = await axios.get(apiconfig.patients.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the patient object
      } else {
        throw new Error(response.data.message || 'Failed to fetch patient');
      }
    } catch (error) {
      console.error(`Error fetching patient with id ${id}:`, error);
      throw error;
    }
  },
};

export default patientService;
