import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
} from '@mui/material';

const CounsellingModal = ({ isOpen, onClose, onSubmit }) => {
  // Generate an auto-incremented ServiceID based on timestamp
  const generateServiceID = () => `SERV-${Date.now()}`;

  const [formData, setFormData] = useState({
    ServiceID: generateServiceID(), // Auto-generated
    ClientName: '',
    Counselor: '',
    DateOfSession: '',
    Location: '',
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        ServiceID: generateServiceID(),
        ClientName: '',
        Counselor: '',
        DateOfSession: '',
        Location: '',
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData); // Wait for submission to complete
    // Reset form with a new ServiceID after successful submission
    setFormData({
      ServiceID: generateServiceID(),
      ClientName: '',
      Counselor: '',
      DateOfSession: '',
      Location: '',
    });
    onClose(); // Close after successful submission
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
            New Counselling Session
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="ServiceID"
                  label="Service ID"
                  value={formData.ServiceID}
                  disabled // Auto-generated, so it's read-only
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="ClientName"
                  label="Client Name"
                  value={formData.ClientName}
                  onChange={handleChange}
                  placeholder="Enter Client Name"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="Counselor"
                  label="Counselor"
                  value={formData.Counselor}
                  onChange={handleChange}
                  placeholder="Enter Counselor Name"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  name="DateOfSession"
                  value={formData.DateOfSession}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="Location"
                  label="Location"
                  value={formData.Location}
                  onChange={handleChange}
                  placeholder="Enter Location"
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

export default CounsellingModal;
