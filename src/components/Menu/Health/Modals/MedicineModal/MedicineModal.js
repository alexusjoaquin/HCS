import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  Autocomplete,
} from '@mui/material';
import apiconfig from '../../../../../api/apiconfig';

const MedicineModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    TransactionID: '',
    FullName: '',
    Address: '',
    MedicineName: '',
  });

  const [residents, setResidents] = useState([]); // State for residents
  const [medicineError, setMedicineError] = useState(''); // Error state for MedicineName

  // Generate a unique Transaction ID whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      const generatedID = `TX-${Date.now()}`; // Example ID generation logic
      setFormData((prevState) => ({
        ...prevState,
        TransactionID: generatedID,
      }));

      // Fetch residents data when modal opens
      fetchResidents();
    }
  }, [isOpen]);

  const fetchResidents = async () => {
    try {
      const response = await fetch(apiconfig.residents.getAll);
      const result = await response.json();
      if (result.status === 'success') {
        setResidents(result.data); // Set the resident data
      } else {
        console.error('Failed to fetch residents:', result.message);
      }
    } catch (error) {
      console.error('Error fetching residents:', error);
    }
  };

  const handleResidentChange = (event, value) => {
    const resident = residents.find((r) => r.Name === value);

    if (resident) {
      setFormData((prevState) => ({
        ...prevState,
        FullName: resident.Name,
        Address: resident.Address,
      }));
    } else {
      // Clear fields if no resident is selected
      setFormData((prevState) => ({
        ...prevState,
        FullName: '',
        Address: '',
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate MedicineName to accept only letters (alphabetic characters)
    if (name === 'MedicineName') {
      const regex = /^[A-Za-z\s-]*$/; // Allow letters, spaces, and hyphens
      if (!regex.test(value)) {
        setMedicineError('Medicine Name can only contain letters.');
      } else {
        setMedicineError(''); // Clear error if valid
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent submission if there is an error in the MedicineName field
    if (medicineError) return;

    onSubmit(formData);

    // Reset form after submission
    setFormData({
      TransactionID: '',
      FullName: '',
      Address: '',
      MedicineName: '',
    });
    onClose();
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
            New Medicine Record
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="TransactionID"
                  label="Transaction ID"
                  value={formData.TransactionID}
                  onChange={handleChange}
                  required
                  disabled // Disable input for TransactionID
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  options={residents.map((resident) => resident.Name)}
                  onChange={handleResidentChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Full Name" required />
                  )}
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
                  disabled // Disable input for Address
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="MedicineName"
                  label="Medicine Name"
                  value={formData.MedicineName}
                  onChange={handleChange}
                  placeholder="Enter Medicine Name"
                  required
                  error={!!medicineError} // Highlight the field in red if there's an error
                  helperText={medicineError} // Display the error message below the field
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

export default MedicineModal;
