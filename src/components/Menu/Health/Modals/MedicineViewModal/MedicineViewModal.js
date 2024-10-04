// src/components/Modals/MedicineViewModal/MedicineViewModal.js
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

const MedicineViewModal = ({ isOpen, onClose, medicine }) => {
  if (!isOpen || !medicine) return null;

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
            Medicine Details
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
                label="Transaction ID"
                value={medicine.TransactionID}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Resident ID"
                value={medicine.ResidentID}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Medicine Name"
                value={medicine.MedicineName}
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

export default MedicineViewModal;
