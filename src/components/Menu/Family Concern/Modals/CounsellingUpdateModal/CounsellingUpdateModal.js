import React from 'react';
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

const CounsellingUpdateModal = ({ isOpen, onClose, onSave, counselling }) => {
  const [formData, setFormData] = React.useState({
    ServiceID: '',
    ClientName: '',
    Counselor: '',
    DateOfSession: '',
    Location: '',
  });

  React.useEffect(() => {
    if (counselling) {
      setFormData({
        ServiceID: counselling.ServiceID || '',
        ClientName: counselling.ClientName || '',
        Counselor: counselling.Counselor || '',
        DateOfSession: counselling.DateOfSession || '',
        Location: counselling.Location || '',
      });
    }
  }, [counselling]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (formData.ClientName && formData.Counselor && formData.DateOfSession && formData.Location) {
      onSave(formData);
      onClose(); // Close the modal after saving
    } else {
      alert('Please fill in all fields.');
    }
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
            Update Counselling Record
          </Typography>
          <form onSubmit={handleSave}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="ServiceID"
                  value={formData.ServiceID}
                  readOnly
                  label="Service ID"
                  sx={{ width: '100%' }}
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
                  type="date"
                  name="DateOfSession"
                  label="Date of Session"
                  value={formData.DateOfSession}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required sx={{ mb: 2 }}>
                  <InputLabel id="location-label">Location</InputLabel>
                  <Select
                    labelId="Location"
                    name="Location"
                    value={formData.Location}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>Select Location</em>
                    </MenuItem>
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

export default CounsellingUpdateModal;
