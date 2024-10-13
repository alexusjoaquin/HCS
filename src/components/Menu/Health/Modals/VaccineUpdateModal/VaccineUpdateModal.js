import React from 'react';
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

const VaccineUpdateModal = ({ isOpen, onClose, onSave, transaction }) => {
  const [formData, setFormData] = React.useState({
    TransactionID: transaction?.TransactionID || '',
    FullName: transaction?.FullName || '',
    Address: transaction?.Address || '',
    VaccineName: transaction?.VaccineName || '',
  });

  const [error, setError] = React.useState(''); // State to track validation errors
  const [snackbarOpen, setSnackbarOpen] = React.useState(false); // State for snackbar notification

  React.useEffect(() => {
    if (transaction) {
      setFormData({
        TransactionID: transaction.TransactionID || '',
        FullName: transaction.FullName || '',
        Address: transaction.Address || '',
        VaccineName: transaction.VaccineName || '',
      });
    }
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for VaccineName: Allow letters, numbers, spaces, and hyphens
    if (name === 'VaccineName') {
      const isValid = /^[A-Za-z0-9\s-]+$/.test(value); // Allow letters, numbers, spaces, and hyphens
      if (!isValid) {
        setError('Vaccine name should only contain letters, numbers, spaces, or hyphens.');
        setSnackbarOpen(true);
      } else {
        setError('');
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    // Check if there is an error before saving
    if (error) {
      setSnackbarOpen(true);
      return;
    }

    if (typeof onSave === 'function') {
      onSave(formData);
    } else {
      console.error('onSave is not a function:', onSave);
    }
    onClose();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (!isOpen || !transaction) return null;

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
            Update Vaccine Information
          </Typography>
          <form onSubmit={handleSave}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="TransactionID"
                  value={formData.TransactionID}
                  readOnly
                  label="Transaction ID"
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
        </Paper>
      </Container>
    </Box>
  );
};

export default VaccineUpdateModal;
