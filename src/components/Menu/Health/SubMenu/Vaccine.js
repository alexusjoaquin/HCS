import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import VaccineModal from '../Modals/VaccineModal/VaccineModal'; // For adding new records
import VaccineViewModal from '../Modals/VaccineViewModal/VaccineViewModal'; // For viewing records
import VaccineUpdateModal from '../Modals/VaccineUpdateModal/VaccineUpdateModal'; // For updating records
import vaccineService from '../../../services/vaccineService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Tabs, Tab, Box } from '@mui/material';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import VaccinesIcon from '@mui/icons-material/Vaccines';

const MySwal = withReactContent(Swal);

const Vaccine = () => {
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState(1); // Set Vaccine tab as active
  const [selectedTransaction, setSelectedTransaction] = useState(null); // For viewing and updating
  const [isVaccineModalOpen, setIsVaccineModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
      const data = await vaccineService.getAllTransactions();
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
    setIsVaccineModalOpen(true); // Open the add modal
  };

  const handleView = (transaction) => {
    setSelectedTransaction(transaction);
    setIsViewModalOpen(true); // Open the view modal
  };

  const handleUpdate = (transaction) => {
    setSelectedTransaction(transaction);
    setIsUpdateModalOpen(true); // Open the update modal
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
        await vaccineService.deleteTransaction(transactionID);
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
            fontWeight: '700'
          }}
        >
          VACCINE MANAGEMENT
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', marginLeft: '40px' }}>
          <Tabs 
            value={activeTab}
            onChange={handleTabChange}
            aria-label="vaccine tabs"
            indicatorColor="primary"
            textColor="primary"
            sx={{
              '.MuiTab-root': {
                minWidth: '150px',
                fontWeight: 'bold',
                '&:hover': {
                  borderBottom: '3px solid #0B8769',
                },
              },
              '.Mui-selected': {
                borderBottom: '3px solid #0B8769',
                color: '#0B8769',
              },
            }}
          >
            <Tab icon={<LocalPharmacyIcon />} label="Medicine" />
            <Tab icon={<VaccinesIcon />} label="Vaccine" />
          </Tabs>

          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Button variant="contained" color="primary" style={{ height: '56px' }} onClick={handleNewRecord}>
              + New Record
            </Button>

            <TextField
              style={{ width: '300px', marginRight: '40px' }}
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
                {['Transaction ID', 'Resident ID', 'Vaccine Name', 'Actions'].map((header) => (
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
                      <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={() => handleUpdate(transaction)}>
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
        
        {/* Modals for Add, View, Update */}
        {isVaccineModalOpen && (
          <VaccineModal
            isOpen={isVaccineModalOpen}
            onClose={() => setIsVaccineModalOpen(false)}
            onSave={fetchTransactions} // Fetch transactions after save
          />
        )}

        {isViewModalOpen && selectedTransaction && (
          <VaccineViewModal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            transaction={selectedTransaction}
          />
        )}

        {isUpdateModalOpen && selectedTransaction && (
          <VaccineUpdateModal
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            transaction={selectedTransaction}
            onSave={fetchTransactions} // Fetch transactions after update
          />
        )}
      </div>
    </div>
  );
};

export default Vaccine;
