// src/services/nopensionBenefitsService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const nopensionBenefitsService = {
  // Fetch all benefits without a pension
  getAllBenefits: async () => {
    try {
      const response = await axios.get(apiconfig.nopensionbenifits.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the array of benefits
      } else {
        throw new Error(response.data.message || 'Failed to fetch benefits');
      }
    } catch (error) {
      console.error('Error fetching benefits:', error);
      throw error;
    }
  },

  // Create a new benefit without a pension
  createBenefit: async (benefitData) => {
    try {
      const response = await axios.post(apiconfig.nopensionbenifits.create, benefitData);
      if (response.status === 200) {
        return response.data; // Return the created benefit
      } else {
        throw new Error(response.data.message || 'Failed to create benefit');
      }
    } catch (error) {
      console.error('Error creating benefit:', error);
      throw error;
    }
  },

  // Update an existing benefit without a pension
  updateBenefit: async (benefitData) => {
    try {
      const response = await axios.put(apiconfig.nopensionbenifits.update, benefitData);
      if (response.status === 200) {
        return response.data; // Returns the updated benefit
      } else {
        throw new Error(response.data.message || 'Failed to update benefit');
      }
    } catch (error) {
      console.error('Error updating benefit:', error.response?.data || error.message);
      throw error;
    }
  },

  // Delete a benefit without a pension
  deleteBenefit: async (benefitID) => {
    try {
      const response = await axios.delete(apiconfig.nopensionbenifits.delete, {
        data: { BenefitID: benefitID }, // Ensure this matches the expected key
      });
      if (response.status === 200) {
        return response.data.message; // Assuming response follows a successful pattern
      } else {
        throw new Error(response.data.message || 'Failed to delete benefit');
      }
    } catch (error) {
      console.error('Error deleting benefit:', error);
      throw error;
    }
  },

  // Fetch a benefit by ID
  getBenefitById: async (id) => {
    try {
      const response = await axios.get(apiconfig.nopensionbenifits.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the benefit object
      } else {
        throw new Error(response.data.message || 'Failed to fetch benefit');
      }
    } catch (error) {
      console.error(`Error fetching benefit with id ${id}:`, error);
      throw error;
    }
  },
};

export default nopensionBenefitsService;
