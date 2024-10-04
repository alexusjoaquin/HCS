import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import MedicineModal from '../Modals/MedicineModal/MedicineModal';
import MedicineViewModal from '../Modals/MedicineViewModal/MedicineViewModal';
import MedicineUpdateModal from '../Modals/MedicineUpdateModal/MedicineUpdateModal';
import medicineService from '../../../services/medicineService'; // Service to handle fetching data
import { toast } from 'react-toastify'; // For notifications
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Tabs, Tab, Box } from '@mui/material';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy'; // Icon for Medicine tab
import VaccinesIcon from '@mui/icons-material/Vaccines'; // Icon for Vaccine tab

const MySwal = withReactContent(Swal);

const Medicine = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState(0); // For tab management
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    // Navigate to the respective route when the tab is clicked
    if (newValue === 0) {
      navigate('/medicine');
    } else {
      navigate('/vaccine');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const data = await medicineService.getAllTransactions();
      if (Array.isArray(data)) {
        setTransactions(data);
      } else {
        console.warn('Fetched data is not an array:', data);
        setTransactions([]); // Fallback to empty array
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      toast.error('Failed to fetch transactions.');
    }
  };

  const handleNewRecord = () => {
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateSubmit = async (data) => {
    // Add logic for creating a new transaction
    console.log('Create transaction data:', data);
    // Fetch transactions again after creating a new one
    fetchTransactions();
  };

  const handleView = (transaction) => {
    setSelectedTransaction(transaction);
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleUpdate = (transaction) => {
    setSelectedTransaction(transaction);
    setUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleUpdateSave = async (data) => {
    try {
      const updatedTransaction = {
        ...data,
      };
      await medicineService.updateTransaction(data.TransactionID, updatedTransaction);
      MySwal.fire('Updated!', 'Transaction has been updated.', 'success');
      fetchTransactions(); // Refresh the list after update
    } catch (error) {
      console.error('Error updating transaction:', error);
      toast.error('Failed to update transaction.');
    }
  };

  const handleDelete = async (transactionID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this transaction?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await medicineService.deleteTransaction(transactionID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Transaction has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchTransactions(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting transaction:', error);
        toast.error('Failed to delete transaction.');
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content" style={{ padding: '20px' }}>
      <Typography 
          variant="h4" 
          className="header" 
          style={{ 
            marginLeft: '40px', 
            marginTop: '20px', 
            marginBottom: '40px', 
            fontWeight: '700' // Make the text bolder
          }}
        >
          MEDICINE MANAGEMENT
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', marginLeft: '40px' }}>
          <Tabs 
            value={activeTab}
            onChange={handleTabChange}
            aria-label="medicine tabs"
            indicatorColor="primary"
            textColor="primary"
            sx={{
              '.MuiTab-root': {
                minWidth: '150px',
                fontWeight: 'bold',
                '&:hover': {
                  borderBottom: '3px solid #0B8769', // Hover effect to show underline
                },
              },
              '.Mui-selected': {
                borderBottom: '3px solid #0B8769', // Underline for the selected tab
                color: '#0B8769', // Color for selected tab
              },
            }}
          >
            <Tab icon={<LocalPharmacyIcon />} label="Medicine" />
            <Tab icon={<VaccinesIcon />} label="Vaccine" />
          </Tabs>

          {/* Keep New Record Button and Search Bar in their current position */}
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Button variant="contained" color="primary" style={{ height: '56px' }} onClick={handleNewRecord}>
              + New Record
            </Button>

            <TextField
              style={{ width: '300px', marginRight:'40px' }}
              variant="outlined"
              placeholder="Search transactions"
              className="search-input"
            />
          </Box>
        </Box>


        <TableContainer style={{ maxWidth: '95%', margin: '30px auto', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Transaction ID', 'Resident ID', 'Medicine Name', 'Actions'].map((header) => (
                  <TableCell key={header} style={{ backgroundColor: '#0B8769', color: 'white', padding: '10px', textAlign: 'center' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(transactions) && transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow key={transaction.TransactionID}>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{transaction.TransactionID}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{transaction.ResidentID}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{transaction.VaccineName}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>
                      <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={() => handleView(transaction)}>
                        View
                      </Button>
                      <Button variant="contained" color="secondary" style={{ marginRight: '10px' }} onClick={() => handleUpdate(transaction)}>
                        Update
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleDelete(transaction.TransactionID)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Modal for New Medicine Record */}
      <MedicineModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        onSubmit={handleCreateSubmit}
      />

      {/* Modal for Viewing Medicine Transaction */}
      <MedicineViewModal
        isOpen={isViewModalOpen}
        onClose={handleViewModalClose}
        transaction={selectedTransaction}
      />

      {/* Modal for Updating Medicine Transaction */}
      <MedicineUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        transaction={selectedTransaction}
        onSave={handleUpdateSave}
      />
    </div>
  );
};

export default Medicine;
