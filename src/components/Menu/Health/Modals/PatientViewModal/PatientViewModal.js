// src/components/Modals/PatientViewModal/PatientViewModal.js
import React from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  TextField,
} from '@mui/material';

const PatientViewModal = ({ isOpen, onClose, patient }) => {
  if (!isOpen || !patient) return null;

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
        <Paper elevation={10} sx={{ padding: 4, borderRadius: '16px', position: 'relative' }}>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Patient Details
          </Typography>
          <span
            style={{
              cursor: 'pointer',
              position: 'absolute',
              top: '10px',
              right: '20px',
              fontSize: '1.5em',
            }}
            onClick={onClose}
          >
            &times;
          </span>
          <Grid container spacing={2} sx={{ marginTop: '10px' }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient ID"
                value={patient.PatientID}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={patient.Fullname}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={patient.Address}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date of Birth"
                value={patient.DateOfBirth}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact No."
                value={patient.ContactNo}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Gender"
                value={patient.Gender}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Medical History"
                value={patient.MedicalHistory}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={onClose}
            sx={{ marginTop: '20px', width: '100%' }}
          >
            Close
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default PatientViewModal;
