// src/api/axiosInstance.js
import axios from 'axios';
import apiconfig from './apiconfig';

const axiosInstance = axios.create({
  baseURL: apiconfig.patients.getAll.split('/all')[0], // Assuming all endpoints share the same base
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
