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

const FamilyProfilesModal = ({ isOpen, onClose, onSubmit }) => {
  // Generate an auto-incremented FamilyID based on timestamp
  const generateFamilyID = () => `FAM-${Date.now()}`; // Fixed string interpolation

  const [formData, setFormData] = React.useState({
    FamilyID: generateFamilyID(), // Auto-generated
    FamilyName: '',
    Members: '', // Ensure this matches in handleCreateSubmit
    Address: '',
    ContactNo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData); // Wait for the submission to complete
    // Reset form with a new FamilyID after successful submission
    setFormData({
      FamilyID: generateFamilyID(),
      FamilyName: '',
      Members: '',
      Address: '',
      ContactNo: '',
    });
    onClose(); // Close only after successful submission
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
                  InputProps={{ readOnly: true }} // Auto-generated, so it's read-only
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
                <TextField
                  fullWidth
                  name="Address"
                  label="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  placeholder="Enter Address"
                  required
                  sx={{ mb: 2 }}
                />
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
