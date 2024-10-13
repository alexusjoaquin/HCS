import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  Autocomplete,
  Snackbar,
  Alert,
} from '@mui/material';
import apiconfig from '../../../../../api/apiconfig';

const VaccineModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    TransactionID: '',
    FullName: '',
    Address: '',
    VaccineName: '',
  });

  const [residents, setResidents] = useState([]); // State for residents
  const [error, setError] = useState(''); // State to track validation errors
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for snackbar notification

  // Generate a unique Transaction ID whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      const generatedID = `TX-${Date.now()}`; // Example ID generation logic
      setFormData((prevState) => ({
        ...prevState,
        TransactionID: generatedID,
      }));

      // Fetch residents data when modal opens
      fetchResidents();
    }
  }, [isOpen]);

  const fetchResidents = async () => {
    try {
      const response = await fetch(apiconfig.residents.getAll);
      const result = await response.json();
      if (result.status === 'success') {
        setResidents(result.data); // Set the resident data
      } else {
        console.error('Failed to fetch residents:', result.message);
      }
    } catch (error) {
      console.error('Error fetching residents:', error);
    }
  };

  const handleResidentChange = (event, value) => {
    const resident = residents.find((r) => r.Name === value);
    if (resident) {
      setFormData((prevState) => ({
        ...prevState,
        FullName: resident.Name,
        Address: resident.Address,
      }));
    } else {
      // Clear fields if no resident is selected
      setFormData((prevState) => ({
        ...prevState,
        FullName: '',
        Address: '',
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validation for VaccineName: Only allow letters, spaces, and hyphens
    if (name === 'VaccineName') {
      const isValid = /^[A-Za-z0-9\s-]+$/.test(value); // Allow letters, spaces, and hyphens
      if (!isValid) {
        setError('Vaccine name should only contain letters, spaces, or hyphens.');
      } else {
        setError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (error) {
      // If there's a validation error, show the snackbar notification
      setSnackbarOpen(true);
      return;
    }

    onSubmit(formData);
    // Reset form after submission
    setFormData({
      TransactionID: '',
      FullName: '',
      Address: '',
      VaccineName: '',
    });
    onClose();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (!isOpen) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={10} sx={{ padding: 4, borderRadius: '16px' }}>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            New Vaccine Record
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="TransactionID"
                  label="Transaction ID"
                  value={formData.TransactionID}
                  onChange={handleChange}
                  required
                  disabled // Disable input for TransactionID
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  options={residents.map((resident) => resident.Name)}
                  onChange={handleResidentChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Full Name" required />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="Address"
                  label="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  placeholder="Enter Address"
                  required
                  disabled // Disable input for Address
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="VaccineName"
                  label="Vaccine Name"
                  value={formData.VaccineName}
                  onChange={handleChange}
                  placeholder="Enter Vaccine Name"
                  required
                  error={Boolean(error)} // Set error state based on validation
                  helperText={error} // Display error message
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button type="submit" variant="contained" color="primary" sx={{ width: '48%' }}>
                  Submit
                </Button>
                <Button
                  type="button"
                  onClick={onClose}
                  variant="contained"
                  color="secondary"
                  sx={{ width: '48%' }}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>

      {/* Snackbar for validation notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VaccineModal;
