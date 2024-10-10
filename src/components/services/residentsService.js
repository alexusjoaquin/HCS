// src/services/residentsService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const residentsService = {
  // Fetch all residents
  getAllResidents: async () => {
    try {
      const response = await axios.get(apiconfig.residents.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the array of residents
      } else {
        throw new Error(response.data.message || 'Failed to fetch residents');
      }
    } catch (error) {
      console.error('Error fetching residents:', error);
      throw error;
    }
  },

  // Create a new resident
  createResident: async (residentData) => {
    try {
      const response = await axios.post(apiconfig.residents.create, residentData);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the created resident
      } else {
        throw new Error(response.data.message || 'Failed to create resident');
      }
    } catch (error) {
      console.error('Error creating resident:', error);
      throw error;
    }
  },

  // Update an existing resident
  updateResident: async (residentData) => {
    try {
      const response = await axios.put(apiconfig.residents.update, residentData);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the updated resident
      } else {
        throw new Error(response.data.message || 'Failed to update resident');
      }
    } catch (error) {
      console.error('Error updating resident:', error);
      throw error;
    }
  },

  // Delete a resident
  deleteResident: async (residentID) => {
    try {
      const response = await axios.delete(apiconfig.residents.delete, {
        data: { ResidentID: residentID },
      });
      if (response.data.status === 'success') {
        return response.data.message; // Confirmation message
      } else {
        throw new Error(response.data.message || 'Failed to delete resident');
      }
    } catch (error) {
      console.error('Error deleting resident:', error);
      throw error;
    }
  },

  // Fetch resident by ID
  getResidentById: async (id) => {
    try {
      const response = await axios.get(apiconfig.residents.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the resident object
      } else {
        throw new Error(response.data.message || 'Failed to fetch resident');
      }
    } catch (error) {
      console.error(`Error fetching resident with id ${id}:`, error);
      throw error;
    }
  },

  importResidentsCSV: async (csvString) => {
    try {
        const response = await axios.post(apiconfig.resident.importCSV, {
            csvFile: csvString,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.data.status === 'success') {
            return response.data.message;
        } else {
            throw new Error(response.data.message || 'Failed to import residents');
        }
    } catch (error) {
        console.error('Error importing residents CSV:', error);
        throw error;
    }
},

};



export default residentsService;
