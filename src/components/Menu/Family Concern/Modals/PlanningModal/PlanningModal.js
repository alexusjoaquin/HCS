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

const PlanningModal = ({ isOpen, onClose, onSubmit }) => {
  // Initial form state
  const [formData, setFormData] = React.useState({
    PlanningID: '', // Auto-generated Planning ID
    FamilyID: '',
    Counselor: '',
    PillsReceived: '',
    DateOfSession: '',
  });

  // Generate a unique Planning ID when the modal opens
  useEffect(() => {
    if (isOpen) {
      const generatedID = `PID-${Date.now()}`; // Example ID generation logic
      setFormData({
        PlanningID: generatedID,
        FamilyID: '',
        Counselor: '',
        PillsReceived: '',
        DateOfSession: '',
      });
    }
  }, [isOpen]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData); // Wait for submission to complete
    onClose(); // Close modal after successful submission
  };

  // Return null if the modal is not open
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
            New Family Planning Session
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="PlanningID"
                  label="Planning ID"
                  value={formData.PlanningID}
                  onChange={handleChange}
                  required
                  disabled // Auto-generated, so it is read-only
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
                  placeholder="Enter Pills Received"
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

export default PlanningModal;
