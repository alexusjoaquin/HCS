import React from 'react';
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
  FormHelperText,
} from '@mui/material';

const SuspectUpdateModal = ({ isOpen, onClose, onSave, suspect }) => {
  const [formData, setFormData] = React.useState({
    SuspectID: '',
    FullName: '',
    Alias: '',
    LastKnownAddress: '',
    Status: '',
  });

  const [errors, setErrors] = React.useState({
    FullName: '',
    Alias: '',
  });

  React.useEffect(() => {
    if (suspect) {
      setFormData({
        SuspectID: suspect.SuspectID || '',
        FullName: suspect.FullName || '',
        Alias: suspect.Alias || '',
        LastKnownAddress: suspect.LastKnownAddress || '',
        Status: suspect.Status || '',
      });
      setErrors({ FullName: '', Alias: '' }); // Reset errors when suspect changes
    }
  }, [suspect]);

  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]*$/; // Accepts only letters and spaces
    return regex.test(name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'FullName') {
      if (!validateName(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          FullName: 'Full Name can only contain letters and spaces.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          FullName: '',
        }));
      }
    }

    if (name === 'Alias') {
      if (!validateName(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          Alias: 'Alias can only contain letters and spaces.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          Alias: '',
        }));
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Check for errors before saving
    if (errors.FullName || errors.Alias) {
      return; // Prevent saving if there are errors
    }
    onSave(formData); // Call the onSave prop function with the form data
    onClose(); // Close the modal after saving
  };

  if (!isOpen || !suspect) return null;

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
            Update Suspect
          </Typography>
          <form onSubmit={handleSave}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="SuspectID"
                  value={formData.SuspectID}
                  readOnly
                  label="Suspect ID"
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
                  error={!!errors.FullName}
                  helperText={errors.FullName} // Display error message
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="Alias"
                  label="Alias"
                  value={formData.Alias}
                  onChange={handleChange}
                  placeholder="Enter Alias"
                  required
                  error={!!errors.Alias}
                  helperText={errors.Alias} // Display error message
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="LastKnownAddress"
                  label="Last Known Address"
                  value={formData.LastKnownAddress}
                  onChange={handleChange}
                  placeholder="Enter Last Known Address"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={!formData.Status}>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    name="Status"
                    value={formData.Status}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="Wanted">Wanted</MenuItem>
                    <MenuItem value="Captured">Captured</MenuItem>
                    <MenuItem value="Arrested">Arrested</MenuItem>
                    <MenuItem value="Charged">Charged</MenuItem>
                    <MenuItem value="Cleared">Cleared</MenuItem>
                    <MenuItem value="In Custody">In Custody</MenuItem>
                    <MenuItem value="Released">Released</MenuItem>
                    <MenuItem value="Pending Investigation">Pending Investigation</MenuItem>
                  </Select>
                  {!formData.Status && (
                    <FormHelperText>Status is required</FormHelperText>
                  )}
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

export default SuspectUpdateModal;
