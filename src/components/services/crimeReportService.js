// src/services/crimeReportService.js
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const crimeReportService = {
  // Fetch all crime reports
  getAllCrimeReports: async () => {
    try {
      const response = await axios.get(apiconfig.crime.getAll);
      if (response.data.status === 'success') {
        return response.data.data; // Returns the array of crime reports
      } else {
        throw new Error(response.data.message || 'Failed to fetch crime reports');
      }
    } catch (error) {
      console.error('Error fetching crime reports:', error);
      throw error;
    }
  },

// Create a new crime report
createCrimeReport: async (crimeReportData) => {
  try {
    const response = await axios.post(apiconfig.crime.create, crimeReportData);
    // Check if the response status is 200 (success)
    if (response.status === 200) {
      return response.data; // Return the created crime report
    } else {
      throw new Error(response.data.message || 'Failed to create crime report');
    }
  } catch (error) {
    console.error('Error creating crime report:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
},


// Update an existing crime report
updateCrimeReport: async (crimeReportData) => {
  try {
    const response = await axios.put(apiconfig.crime.update, crimeReportData);
    
    // Check for the correct status and handle response properly
    if (response.status === 200) {
      return response.data; // Returns the updated crime report
    } else {
      throw new Error(response.data.message || 'Failed to update crime report');
    }
  } catch (error) {
    console.error('Error updating crime report:', error.response?.data || error.message);
    throw error;
  }
},


  // Delete a crime report
deleteCrimeReport: async (reportID) => {
  try {
    const response = await axios.delete(apiconfig.crime.delete, {
      data: { ReportID: reportID }, // Ensure this matches the expected key
    });
    if (response.status === 200) {
      return response.data.message; // Assuming response follows a successful pattern
    } else {
      throw new Error(response.data.message || 'Failed to delete crime report');
    }
  } catch (error) {
    console.error('Error deleting crime report:', error);
    throw error;
  }
},

  // Fetch crime report by ID
  getCrimeReportById: async (id) => {
    try {
      const response = await axios.get(apiconfig.crime.getById(id));
      if (response.data.status === 'success') {
        return response.data.data; // Returns the crime report object
      } else {
        throw new Error(response.data.message || 'Failed to fetch crime report');
      }
    } catch (error) {
      console.error(`Error fetching crime report with id ${id}:`, error);
      throw error;
    }
  },
};

export default crimeReportService;
