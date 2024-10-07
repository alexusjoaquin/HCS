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

const PlanningUpdateModal = ({ isOpen, onClose, onSave, planning }) => {
  // Initialize the form data state based on the planning prop
  const [formData, setFormData] = React.useState({
    PlanningID: '',
    FamilyID: '',
    Counselor: '',
    PillsReceived: '',
    DateOfSession: '',
  });

  // Update the form data state when the planning prop changes
  React.useEffect(() => {
    if (planning) {
      setFormData({
        PlanningID: planning.PlanningID || '',
        FamilyID: planning.FamilyID || '',
        Counselor: planning.Counselor || '',
        PillsReceived: planning.PillsReceived || '',
        DateOfSession: planning.DateOfSession || '',
      });
    }
  }, [planning]);

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

  // Prevent rendering if the modal is not open or planning is null
  if (!isOpen || !planning) return null;

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
            Update Family Planning
          </Typography>
          <form onSubmit={handleSave}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="PlanningID"
                  value={formData.PlanningID}
                  readOnly
                  label="Planning ID"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="FamilyID"
                  label="Family ID"
                  value={formData.FamilyID}
                  onChange={handleChange}
                  placeholder="Enter Family ID"
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
                  name="PillsReceived"
                  label="Pills Received"
                  value={formData.PillsReceived}
                  onChange={handleChange}
                  placeholder="Enter Number of Pills Received"
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
                  InputLabelProps={{ shrink: true }} // Ensure label stays visible
                  sx={{ width: '100%' }} // Ensure the field takes the full width
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

export default PlanningUpdateModal;
