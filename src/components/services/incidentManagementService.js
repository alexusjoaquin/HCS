// src/services/incidentManagementService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const incidentManagementService = {
  // Fetch all incidents
  getAllIncidents: async () => {
    try {
      const response = await axios.get(apiconfig.incident.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the array of incidents
      } else {
        throw new Error(response.data.message || 'Failed to fetch incidents');
      }
    } catch (error) {
      console.error('Error fetching incidents:', error);
      throw error;
    }
  },

  // Create a new incident
  createIncident: async (incidentData) => {
    try {
        const response = await axios.post(apiconfig.incident.create, incidentData);
        // Check if the response status is 200 (success)
        if (response.status === 200) {
            return response.data; // Return the created incident
        } else {
            throw new Error(response.data.message || 'Failed to create incident');
        }
    } catch (error) {
        console.error('Error creating incident:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
},


// Update an existing incident
updateIncident: async (incidentData) => {
  try {
    const response = await axios.put(apiconfig.incident.update, incidentData);
    // Check for the correct status and handle response properly
    if (response.status === 200) {
      return response.data; // Returns the updated incident
    } else {
      throw new Error(response.data.message || 'Failed to update incident');
    }
  } catch (error) {
    console.error('Error updating incident:', error.response?.data || error.message);
    throw error;
  }
},


  // Delete an incident
  deleteIncident: async (incidentID) => {
    try {
      const response = await axios.delete(apiconfig.incident.delete, {
        data: { IncidentID: incidentID }, // Ensure this matches the expected key
      });
      if (response.status === 200) {
        return response.data.message; // Assuming response follows a successful pattern
      } else {
        throw new Error(response.data.message || 'Failed to delete incident');
      }
    } catch (error) {
      console.error('Error deleting incident:', error);
      throw error;
    }
  },

  // Fetch incident by ID
  getIncidentById: async (id) => {
    try {
      const response = await axios.get(apiconfig.incident.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the incident object
      } else {
        throw new Error(response.data.message || 'Failed to fetch incident');
      }
    } catch (error) {
      console.error(`Error fetching incident with id ${id}:`, error);
      throw error;
    }
  },
};

export default incidentManagementService;
