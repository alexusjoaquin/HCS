// src/services/seniorcitizenService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const seniorcitizenService = {
    // Fetch all senior citizens
    getAllSeniorCitizens: async () => {
      try {
        const response = await axios.get(apiconfig.seniorcitizens.getAll);
        // Always return the data if the response is successful
        return response.data.data; // Returns the array of senior citizens
      } catch (error) {
        console.error('Error fetching senior citizens:', error);
        throw error; // Rethrow the error to be handled in the component
      }
    },

  createSeniorCitizen: async (seniorCitizenData) => {
    try {
      await axios.post(apiconfig.seniorcitizens.create, seniorCitizenData);
      // Success without checking the response
      return { success: true };
    } catch (error) {
      console.error('Error creating senior citizen:', error);
      throw error;
    }
  },
  // Update an existing senior citizen
  updateSeniorCitizen: async (seniorCitizenData) => {
    try {
      const response = await axios.put(apiconfig.seniorcitizens.update, seniorCitizenData);
      if (response.status === 200) {
        return response.data; // Returns the updated senior citizen
      } else {
        throw new Error(response.data.message || 'Failed to update senior citizen');
      }
    } catch (error) {
      console.error('Error updating senior citizen:', error.response?.data || error.message);
      throw error;
    }
  },

  // Delete a senior citizen
deleteSeniorCitizen: async (seniorID) => {
  try {
    const response = await axios.delete(apiconfig.seniorcitizens.delete, {
      data: { SeniorID: seniorID }, // Make sure this matches 'SeniorID'
    });
    if (response.status === 200) {
      return response.data.message; // Return success message
    } else {
      throw new Error(response.data.message || 'Failed to delete senior citizen');
    }
  } catch (error) {
    console.error('Error deleting senior citizen:', error);
    throw error;
  }
},


  // Fetch senior citizen by ID
  getSeniorCitizenById: async (id) => {
    try {
      const response = await axios.get(apiconfig.seniorcitizens.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the senior citizen object
      } else {
        throw new Error(response.data.message || 'Failed to fetch senior citizen');
      }
    } catch (error) {
      console.error(`Error fetching senior citizen with id ${id}:`, error);
      throw error;
    }
  },
};

export default seniorcitizenService;
