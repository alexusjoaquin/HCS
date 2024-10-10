import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const CounsellingModal = ({ isOpen, onClose, onSubmit }) => {
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

  const locationOptions = [
    'Baloc',
    'Buasao',
    'Burgos',
    'Cabugao',
    'Casulucan',
    'Comitang',
    'Concepcion',
    'Dolores',
    'General Luna',
    'Hulo',
    'Mabini',
    'Malasin',
    'Malayantoc',
    'Mambarao',
    'Poblacion',
    'Malaya (Pook Malaya)',
    'Pulong Buli',
    'Sagaba',
    'San Agustin',
    'San Fabian',
    'San Francisco',
    'San Pascual',
    'Santa Rita',
    'Santo Rosario',
  ];

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
                <FormControl fullWidth required sx={{ mb: 2 }}>
                  <InputLabel id="location-label">Location</InputLabel>
                  <Select
                    labelId="location-label"
                    name="Location"
                    value={formData.Location}
                    onChange={handleChange}
                  >
                    {locationOptions.map((location) => (
                      <MenuItem key={location} value={location}>
                        {location}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
