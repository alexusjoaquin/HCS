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

const SuspectModal = ({ isOpen, onClose, onSubmit }) => {
  // Ensure all initial values are defined
  const [formData, setFormData] = React.useState({
    SuspectID: '', // Add Suspect ID
    FullName: '',
    Alias: '',
    LastKnownAddress: '',
    Status: '',
  });

  // Generate a unique Suspect ID whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      const generatedID = `SUS${Date.now()}`; // Example ID generation logic
      setFormData({
        SuspectID: generatedID,
        FullName: '',
        Alias: '',
        LastKnownAddress: '',
        Status: '',
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData); // Wait for the submission to complete
    onClose(); // Close only after successful submission
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
            New Suspect Report
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="SuspectID"
                  label="Suspect ID"
                  value={formData.SuspectID}
                  onChange={handleChange}
                  required
                  disabled // Disable input for Suspect ID
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

export default SuspectModal;
