import React, { useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
} from '@mui/material';

const VaccineModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    TransactionID: '',
    ResidentID: '',
    VaccineName: '',
  });

  // Generate a unique Transaction ID whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      const generatedID = `TX-${Date.now()}`; // Example ID generation logic
      setFormData((prevState) => ({
        ...prevState,
        TransactionID: generatedID,
      }));
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form after submission
    setFormData({
      TransactionID: '',
      ResidentID: '',
      VaccineName: '',
    });
    onClose();
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
                  placeholder="Enter Transaction ID"
                  required
                  disabled // Disable input for TransactionID
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
    </Box>
  );
};

export default VaccineModal;
