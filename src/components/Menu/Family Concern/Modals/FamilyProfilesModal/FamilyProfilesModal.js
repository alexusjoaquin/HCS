import React, { useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const FamilyProfilesModal = ({ isOpen, onClose, onSubmit }) => {
  // Ensure all initial values are defined
  const [formData, setFormData] = React.useState({
    FamilyID: '', // Family ID will be generated
    FamilyName: '',
    Members: '',
    Address: '',
    ContactNo: '',
  });

  const [errors, setErrors] = React.useState({
    FamilyName: '',
    ContactNo: '',
  });

  // Generate a unique Family ID whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      const generatedID = `FAM${Date.now()}`; // Example ID generation logic
      setFormData({
        FamilyID: generatedID,
        FamilyName: '',
        Members: '',
        Address: '',
        ContactNo: '',
      });
      setErrors({ FamilyName: '', ContactNo: '' }); // Reset errors
    }
  }, [isOpen]);

  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]*$/; // Accepts only letters and spaces
    return regex.test(name);
  };

  const validateContactNo = (contactNo) => {
    const regex = /^[0-9-]*$/; // Accepts only numbers and hyphens
    return regex.test(contactNo);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'FamilyName') {
      if (!validateName(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          FamilyName: 'Family Name can only contain letters and spaces.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          FamilyName: '',
        }));
      }
    }

    if (name === 'ContactNo') {
      if (!validateContactNo(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ContactNo: 'Contact Number can only contain numbers and hyphens.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ContactNo: '',
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check for errors before submitting
    if (errors.FamilyName || errors.ContactNo) {
      return; // Prevent submission if there are errors
    }
    await onSubmit(formData); // Wait for the submission to complete
    onClose(); // Close only after successful submission
  };

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
                  InputProps={{ readOnly: true }} // Disable input for Family ID
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
                  error={!!errors.FamilyName}
                  helperText={errors.FamilyName} // Display error message
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="Members"
                  label="Members"
                  type="number" // Set type to number
                  value={formData.Members}
                  onChange={handleChange}
                  placeholder="Enter Number of Members"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="address-label">Address</InputLabel>
                  <Select
                    labelId="address-label"
                    name="Address"
                    value={formData.Address}
                    onChange={handleChange}
                    label="Address"
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
                  error={!!errors.ContactNo}
                  helperText={errors.ContactNo} // Display error message
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
