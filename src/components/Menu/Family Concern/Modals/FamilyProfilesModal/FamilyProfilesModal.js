import React, { useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

const FamilyProfilesModal = ({ isOpen, onClose, onSubmit }) => {
  const generateFamilyID = () => `FAM-${Date.now()}`;

  const [formData, setFormData] = React.useState({
    FamilyID: generateFamilyID(),
    FamilyName: '',
    Members: '',
    Address: '', // Updated to match selection
    ContactNo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({
      FamilyID: generateFamilyID(),
      FamilyName: '',
      Members: '',
      Address: '',
      ContactNo: '',
    });
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({
        FamilyID: generateFamilyID(),
        FamilyName: '',
        Members: '',
        Address: '',
        ContactNo: '',
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const addressOptions = [
    'Baloc', 'Buasao', 'Burgos', 'Cabugao', 'Casulucan', 'Comitang',
    'Concepcion', 'Dolores', 'General Luna', 'Hulo', 'Mabini', 'Malasin',
    'Malayantoc', 'Mambarao', 'Poblacion', 'Malaya (Pook Malaya)',
    'Pulong Buli', 'Sagaba', 'San Agustin', 'San Fabian', 'San Francisco',
    'San Pascual', 'Santa Rita', 'Santo Rosario'
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
            New Family Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="FamilyID"
                  label="Family ID"
                  value={formData.FamilyID}
                  InputProps={{ readOnly: true }}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="FamilyName"
                  label="Family Name"
                  value={formData.FamilyName}
                  onChange={handleChange}
                  placeholder="Enter Family Name"
                  required
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="Members"
                  label="Members"
                  value={formData.Members}
                  onChange={handleChange}
                  placeholder="Enter Number of Members"
                  required
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="address-label">Address</InputLabel>
                  <Select
                    labelId="address-label"
                    name="Address"
                    value={formData.Address}
                    onChange={handleChange}
                    required
                  >
                    {addressOptions.map((address) => (
                      <MenuItem key={address} value={address}>
                        {address}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="ContactNo"
                  label="Contact No."
                  value={formData.ContactNo}
                  onChange={handleChange}
                  placeholder="Enter Contact Number"
                  required
                  sx={{ mb: 2 }}
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

export default FamilyProfilesModal;
