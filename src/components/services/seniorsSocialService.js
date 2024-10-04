// src/services/seniorsSocialService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const seniorsSocialService = {
  // Fetch all social services for seniors
  getAllSocialServices: async () => {
    try {
      const response = await axios.get(apiconfig.seniorsocial.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the array of social services
      } else {
        throw new Error(response.data.message || 'Failed to fetch social services');
      }
    } catch (error) {
      console.error('Error fetching social services:', error);
      throw error;
    }
  },

   // Create a new social service
   createSocialService: async (serviceData) => {
    try {
      console.log('Creating service with data:', serviceData);
      console.log('API Config:', apiconfig); // Check the API config
      const response = await axios.post(apiconfig.seniorsocial.create, serviceData);
      if (response.status === 200) {
        return response.data; // Return the created social service
      } else {
        throw new Error(response.data.message || 'Failed to create social service');
      }
    } catch (error) {
      console.error('Error creating social service:', error);
      throw error;
    }
  },
  // Update an existing social service
  updateSocialService: async (serviceData) => {
    try {
      const response = await axios.put(apiconfig.seniorsocial.update, serviceData);
      if (response.status === 200) {
        return response.data; // Returns the updated social service
      } else {
        throw new Error(response.data.message || 'Failed to update social service');
      }
    } catch (error) {
      console.error('Error updating social service:', error.response?.data || error.message);
      throw error;
    }
  },

  // Delete a social service
  deleteSocialService: async (serviceID) => {
    try {
      const response = await axios.delete(apiconfig.seniorsocial.delete, {
        data: { ServiceID: serviceID },
      });
      if (response.status === 200) {
        return response.data.message; // Assuming response follows a successful pattern
      } else {
        throw new Error(response.data.message || 'Failed to delete social service');
      }
    } catch (error) {
      console.error('Error deleting social service:', error);
      throw error;
    }
  },

  // Fetch social service by ID
  getSocialServiceById: async (id) => {
    try {
      const response = await axios.get(apiconfig.seniorsocial.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the social service object
      } else {
        throw new Error(response.data.message || 'Failed to fetch social service');
      }
    } catch (error) {
      console.error(`Error fetching social service with id ${id}:`, error);
      throw error;
    }
  },
};

export default seniorsSocialService;
