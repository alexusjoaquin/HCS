// src/services/medicineService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const medicineService = {
  // Fetch all medicines
  getAllMedicines: async () => {
    try {
      const response = await axios.get(apiconfig.medicines.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the array of medicines
      } else {
        throw new Error(response.data.message || 'Failed to fetch medicines');
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
      throw error;
    }
  },

  // Create a new medicine record
  createMedicine: async (medicineData) => {
    try {
      const response = await axios.post(apiconfig.medicines.create, medicineData);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the created medicine
      } else {
        throw new Error(response.data.message || 'Failed to create medicine');
      }
    } catch (error) {
      console.error('Error creating medicine:', error);
      throw error;
    }
  },

  // Update an existing medicine record
  updateMedicine: async (medicineData) => {
    try {
      const response = await axios.put(apiconfig.medicines.update, medicineData);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the updated medicine
      } else {
        throw new Error(response.data.message || 'Failed to update medicine');
      }
    } catch (error) {
      console.error('Error updating medicine:', error);
      throw error;
    }
  },

  // Delete a medicine record
  deleteMedicine: async (transactionID) => {
    try {
      const response = await axios.delete(apiconfig.medicines.delete, {
        data: { TransactionID: transactionID },
      });
      if (response.data.status === 'success') {
        return response.data.message; // Confirmation message
      } else {
        throw new Error(response.data.message || 'Failed to delete medicine');
      }
    } catch (error) {
      console.error('Error deleting medicine:', error);
      throw error;
    }
  },

  // Fetch medicine by Transaction ID
  getMedicineById: async (id) => {
    try {
      const response = await axios.get(apiconfig.medicines.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the medicine object
      } else {
        throw new Error(response.data.message || 'Failed to fetch medicine');
      }
    } catch (error) {
      console.error(`Error fetching medicine with id ${id}:`, error);
      throw error;
    }
  },
};

export default medicineService;
