import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';

const MedicineUpdateModal = ({ isOpen, onClose, onSave, medicine }) => {
  const [formData, setFormData] = useState({
    TransactionID: medicine?.TransactionID || '',
    FullName: medicine?.FullName || '',
    Address: medicine?.Address || '',
    MedicineName: medicine?.MedicineName || '',
  });

  const [error, setError] = useState(''); // State to track validation errors
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for snackbar notification

  useEffect(() => {
    if (medicine) {
      setFormData({
        TransactionID: medicine.TransactionID || '',
        FullName: medicine.FullName || '',
        Address: medicine.Address || '',
        MedicineName: medicine.MedicineName || '',
      });
    }
  }, [medicine]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validation for MedicineName: Only allow letters
    if (name === 'MedicineName') {
      const isValid = /^[A-Za-z\s-]*$/.test(value);
      if (!isValid) {
        setError('Medicine name should only contain alphabetical characters.');
      } else {
        setError('');
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (error) {
      // If there's a validation error, show the snackbar notification
      setSnackbarOpen(true);
      return;
    }

    if (typeof onSave === 'function') {
      onSave(formData); // Call the onSave function passed as a prop
    } else {
      console.error('onSave is not a function:', onSave);
    }
    onClose();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (!isOpen || !medicine) return null; // Ensure both conditions are met

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
            Update Medicine Information
          </Typography>
          <form onSubmit={handleSave}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="TransactionID"
                  value={formData.TransactionID}
                  label="Transaction ID"
                  readOnly
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="FullName"
                  label="Full Name"
                  value={formData.FullName}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  required
                  InputProps={{ readOnly: true }} // Make this field read-only
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
                  InputProps={{ readOnly: true }} // Make this field read-only
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="MedicineName"
                  label="Medicine Name"
                  value={formData.MedicineName}
                  onChange={handleChange}
                  placeholder="Enter Medicine Name"
                  required
                  error={Boolean(error)} // Set error state based on validation
                  helperText={error} // Display error message
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button type="submit" variant="contained" color="primary" sx={{ width: '48%' }}>
                  Save
                </Button>
                <Button
                  type="button"
                  onClick={onClose}
                  variant="contained"
                  color="secondary"
                  sx={{ width: '48%' }}
                >
                  Cancel
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

export default MedicineUpdateModal;
