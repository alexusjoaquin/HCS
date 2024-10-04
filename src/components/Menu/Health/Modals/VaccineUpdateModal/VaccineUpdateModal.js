import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
} from '@mui/material';

const VaccineUpdateModal = ({ isOpen, onClose, onSave, vaccine }) => {
  const [formData, setFormData] = React.useState({
    TransactionID: vaccine?.TransactionID || '',
    ResidentID: vaccine?.ResidentID || '',
    VaccineName: vaccine?.VaccineName || '',
  });

  React.useEffect(() => {
    if (vaccine) {
      setFormData({
        TransactionID: vaccine.TransactionID || '',
        ResidentID: vaccine.ResidentID || '',
        VaccineName: vaccine.VaccineName || '',
      });
    }
  }, [vaccine]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (typeof onSave === 'function') {
      onSave(formData);
    } else {
      console.error('onSave is not a function:', onSave);
    }
    onClose();
  };

  if (!isOpen || !vaccine) return null; // Ensure modal is only shown if open and vaccine data is provided

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
                  name="ResidentID"
                  label="Resident ID"
                  value={formData.ResidentID}
                  onChange={handleChange}
                  placeholder="Enter Resident ID"
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
    </Box>
  );
};

export default VaccineUpdateModal;
