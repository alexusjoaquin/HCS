// src/services/pensionBenefitsService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const pensionBenefitsService = {
  // Fetch all pension benefits
  getAllPensionBenefits: async () => {
    try {
      const response = await axios.get(apiconfig.pensionbenifits.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the array of pension benefits
      } else {
        throw new Error(response.data.message || 'Failed to fetch pension benefits');
      }
    } catch (error) {
      console.error('Error fetching pension benefits:', error);
      throw error;
    }
  },

  // Create a new pension benefit
  createPensionBenefit: async (pensionBenefitData) => {
    try {
      const response = await axios.post(apiconfig.pensionbenifits.create, pensionBenefitData);
      if (response.status === 200) {
        return response.data; // Return the created pension benefit
      } else {
        throw new Error(response.data.message || 'Failed to create pension benefit');
      }
    } catch (error) {
      console.error('Error creating pension benefit:', error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  },

  // Update an existing pension benefit
  updatePensionBenefit: async (pensionBenefitData) => {
    try {
      const response = await axios.put(apiconfig.pensionbenifits.update, pensionBenefitData);
      if (response.status === 200) {
        return response.data; // Returns the updated pension benefit
      } else {
        throw new Error(response.data.message || 'Failed to update pension benefit');
      }
    } catch (error) {
      console.error('Error updating pension benefit:', error.response?.data || error.message);
      throw error;
    }
  },

  // Delete a pension benefit
deletePensionBenefit: async (pensionBenefitID) => {
  try {
    const response = await axios.delete(apiconfig.pensionbenifits.delete, {
      data: { BenefitID: pensionBenefitID }, // Updated key name
    });
    if (response.status === 200) {
      return response.data.message; // Assuming response follows a successful pattern
    } else {
      throw new Error(response.data.message || 'Failed to delete pension benefit');
    }
  } catch (error) {
    console.error('Error deleting pension benefit:', error);
    throw error;
  }
},


  // Fetch pension benefit by ID
  getPensionBenefitById: async (id) => {
    try {
      const response = await axios.get(apiconfig.pensionBenefits.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the pension benefit object
      } else {
        throw new Error(response.data.message || 'Failed to fetch pension benefit');
      }
    } catch (error) {
      console.error(`Error fetching pension benefit with id ${id}:`, error);
      throw error;
    }
  },
};

export default pensionBenefitsService;
