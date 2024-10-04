// src/services/familyeventService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const familyeventService = {
  // Fetch all family events
  getAllFamilyEvents: async () => {
    try {
      const response = await axios.get(apiconfig.familyevents.getAll);
      if (response.data.status === 'success') {
        return response.data.data.eventActivities; // Access the 'eventActivities' array
      } else {
        throw new Error(response.data.message || 'Failed to fetch family events');
      }
    } catch (error) {
      console.error('Error fetching family events:', error);
      throw error;
    }
  },


  // Create a new family event
  createFamilyEvent: async (familyEventData) => {
    try {
      const response = await axios.post(apiconfig.familyevents.create, familyEventData);
      if (response.status === 200) {
        return response.data; // Return the created family event
      } else {
        throw new Error(response.data.message || 'Failed to create family event');
      }
    } catch (error) {
      console.error('Error creating family event:', error);
      throw error;
    }
  },

  // Update an existing family event
  updateFamilyEvent: async (familyEventData) => {
    try {
      const response = await axios.put(apiconfig.familyevents.update, familyEventData);
      if (response.status === 200) {
        return response.data; // Returns the updated family event
      } else {
        throw new Error(response.data.message || 'Failed to update family event');
      }
    } catch (error) {
      console.error('Error updating family event:', error.response?.data || error.message);
      throw error;
    }
  },

  // Delete a family event
  deleteFamilyEvent: async (eventID) => {
    try {
      const response = await axios.delete(apiconfig.familyevents.delete, {
        data: { EventID: eventID }, // Ensure this matches the expected key
      });
      if (response.status === 200) {
        return response.data.message; // Assuming response follows a successful pattern
      } else {
        throw new Error(response.data.message || 'Failed to delete family event');
      }
    } catch (error) {
      console.error('Error deleting family event:', error);
      throw error;
    }
  },

  // Fetch family event by ID
  getFamilyEventById: async (id) => {
    try {
      const response = await axios.get(apiconfig.familyevents.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the family event object
      } else {
        throw new Error(response.data.message || 'Failed to fetch family event');
      }
    } catch (error) {
      console.error(`Error fetching family event with id ${id}:`, error);
      throw error;
    }
  },
};

export default familyeventService;
