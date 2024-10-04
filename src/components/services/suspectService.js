import axios from 'axios';
import apiconfig from '../../api/apiconfig';


const suspectService = {
    getAllSuspects: async () => {
      try {
        const response = await axios.get(apiconfig.suspect.getAll);
        if (response.data.status === 'success') {
          return response.data.data.suspects; // Ensure this is an array
        } else {
          throw new Error(response.data.message || 'Failed to fetch suspects');
        }
      } catch (error) {
        console.error('Error fetching suspects:', error);
        throw new Error('Failed to fetch suspects: ' + (error.response ? error.response.data.message : error.message));
      }
    },
  

    createSuspect: async (suspectData) => {
        try {
            const response = await axios.post(apiconfig.suspect.create, suspectData);
            if (response.data.status === 'success') {
                return response.data.data; // Returns the created suspect
            } else {
                throw new Error(response.data.message || 'Failed to create suspect');
            }
        } catch (error) {
            console.error('Error creating suspect:', error);
            // Explicitly throw the error message instead of the entire error object
            throw new Error(error.response?.data?.message || error.message);
        }
    },
    

  // Update an existing suspect
  updateSuspect: async (suspectData) => {
    try {
      const response = await axios.put(apiconfig.suspect.update, suspectData);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the updated suspect
      } else {
        throw new Error(response.data.message || 'Failed to update suspect');
      }
    } catch (error) {
      console.error('Error updating suspect:', error);
      throw error;
    }
  },

// Delete a suspect
deleteSuspect: async (suspectID) => {
    try {
        const response = await axios.delete(apiconfig.suspect.delete, {
            data: { SuspectID: suspectID }, // Ensure this matches the expected key
        });
        if (response.status === 200) {
            return response.data.message;  // Return the success message
        } else {
            throw new Error(response.data.message || 'Failed to delete suspect');
        }
    } catch (error) {
        console.error('Error deleting suspect:', error);
        throw new Error(error.response?.data?.message || error.message);
    }
},




  // Fetch suspect by ID
  getSuspectById: async (id) => {
    try {
      const response = await axios.get(apiconfig.suspect.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the suspect object
      } else {
        throw new Error(response.data.message || 'Failed to fetch suspect');
      }
    } catch (error) {
      console.error(`Error fetching suspect with id ${id}:`, error);
      throw error;
    }
  },
};

export default suspectService;
