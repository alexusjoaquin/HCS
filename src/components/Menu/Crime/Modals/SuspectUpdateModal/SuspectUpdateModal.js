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

const SuspectUpdateModal = ({ isOpen, onClose, onSave, suspect }) => {
  // Initialize the form data state based on the suspect prop
  const [formData, setFormData] = React.useState({
    SuspectID: '',
    FullName: '',
    Alias: '',
    LastKnownAddress: '',
    Status: '',
  });

  // Update the form data state when the suspect prop changes
  React.useEffect(() => {
    if (suspect) {
      setFormData({
        SuspectID: suspect.SuspectID || '',
        FullName: suspect.FullName || '',
        Alias: suspect.Alias || '',
        LastKnownAddress: suspect.LastKnownAddress || '',
        Status: suspect.Status || '',
      });
    }
  }, [suspect]);

  // Handle changes to form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData); // Call the onSave prop function with the form data
    onClose(); // Close the modal after saving
  };

  // Prevent rendering if the modal is not open or suspect is null
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
                <TextField
                  fullWidth
                  name="Status"
                  label="Status"
                  value={formData.Status}
                  onChange={handleChange}
                  placeholder="Enter Status"
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

export default SuspectUpdateModal;
