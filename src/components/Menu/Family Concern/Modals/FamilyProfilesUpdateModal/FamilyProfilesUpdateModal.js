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

const FamilyProfilesUpdateModal = ({ isOpen, onClose, onSave, family }) => {
  const [formData, setFormData] = React.useState({
    FamilyID: '',
    FamilyName: '',
    Members: '',
    Address: '',
    ContactNo: '',
  });

  React.useEffect(() => {
    if (family) {
      setFormData({
        FamilyID: family.FamilyID || '',
        FamilyName: family.FamilyName || '',
        Members: family.Members || '',
        Address: family.Address || '',
        ContactNo: family.ContactNo || '',
      });
    }
  }, [family]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Ensure Members is a number before saving
    if (!isNaN(formData.Members) && formData.Members > 0) {
      onSave(formData);
    } else {
      alert("Please enter a valid number for Members.");
    }
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
            Update Family Profile
          </Typography>
          <form onSubmit={handleSave}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="FamilyID"
                  value={formData.FamilyID}
                  readOnly
                  label="Family ID"
                  sx={{ width: '100%' }}
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  name="Members"
                  value={formData.Members}
                  onChange={handleChange}
                  label="Members"
                  placeholder="Enter Number of Members"
                  required
                  InputProps={{ inputProps: { min: 1 } }} // Ensure minimum number is 1
                  sx={{ width: '100%' }}
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="tel"
                  name="ContactNo"
                  label="Contact No"
                  value={formData.ContactNo}
                  onChange={handleChange}
                  placeholder="Enter Contact No"
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

export default FamilyProfilesUpdateModal;
