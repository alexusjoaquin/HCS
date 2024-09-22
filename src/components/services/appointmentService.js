// src/services/appointmentService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const appointmentService = {
  // Fetch all appointments
  getAllAppointments: async () => {
    try {
      const response = await axios.get(apiconfig.appointments.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the array of appointments
      } else {
        throw new Error(response.data.message || 'Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },

  // Create a new appointment
  createAppointment: async (appointmentData) => {
    try {
      const response = await axios.post(apiconfig.appointments.create, appointmentData);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the created appointment
      } else {
        throw new Error(response.data.message || 'Failed to create appointment');
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  },

  // Update an existing appointment
  updateAppointment: async (appointmentData) => {
    try {
      const response = await axios.put(apiconfig.appointments.update, appointmentData);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the updated appointment
      } else {
        throw new Error(response.data.message || 'Failed to update appointment');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  },

  // Delete an appointment
  deleteAppointment: async (appointmentID) => {
    try {
      const response = await axios.delete(apiconfig.appointments.delete, {
        data: { AppointmentID: appointmentID },
      });
      if (response.data.status === 'success') {
        return response.data.message; // Confirmation message
      } else {
        throw new Error(response.data.message || 'Failed to delete appointment');
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  },

  // Fetch appointment by ID
  getAppointmentById: async (id) => {
    try {
      const response = await axios.get(apiconfig.appointments.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the appointment object
      } else {
        throw new Error(response.data.message || 'Failed to fetch appointment');
      }
    } catch (error) {
      console.error(`Error fetching appointment with id ${id}:`, error);
      throw error;
    }
  },
};

export default appointmentService;
