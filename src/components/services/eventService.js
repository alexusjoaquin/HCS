// src/services/eventService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const eventService = {
  // Fetch all events
  getAllEvents: async () => {
    try {
      const response = await axios.get(apiconfig.event.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the array of events
      } else {
        throw new Error(response.data.message || 'Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  // Create a new event
  createEvent: async (eventData) => {
    try {
      const response = await axios.post(apiconfig.event.create, eventData);
      if (response.status === 200) {
        return response.data; // Return the created event
      } else {
        throw new Error(response.data.message || 'Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  },

  updateEvent: async (eventData) => {
    try {
        const response = await axios.put(apiconfig.event.update, eventData);
        if (response.status === 200) {
            return response.data; // Returns the updated event
        } else {
            throw new Error(response.data.message || 'Failed to update event');
        }
    } catch (error) {
        console.error('Error updating event:', error.response?.data || error.message);
        throw error; // Ensure the error is propagated
    }
},

  

  // Delete an event
  deleteEvent: async (eventID) => {
    try {
      const response = await axios.delete(apiconfig.event.delete, {
        data: { EventID: eventID }, // Ensure this matches the expected key
      });
      if (response.status === 200) {
        return response.data.message; // Assuming response follows a successful pattern
      } else {
        throw new Error(response.data.message || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },

  // Fetch event by ID
  getEventById: async (id) => {
    try {
      const response = await axios.get(apiconfig.event.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the event object
      } else {
        throw new Error(response.data.message || 'Failed to fetch event');
      }
    } catch (error) {
      console.error(`Error fetching event with id ${id}:`, error);
      throw error;
    }
  },
};

export default eventService;
