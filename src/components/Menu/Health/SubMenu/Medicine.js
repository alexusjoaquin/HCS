import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import MedicineModal from '../Modals/MedicineModal/MedicineModal';
import MedicineViewModal from '../Modals/MedicineViewModal/MedicineViewModal';
import MedicineUpdateModal from '../Modals/MedicineUpdateModal/MedicineUpdateModal';
import medicineService from '../../../services/medicineService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CircularProgress, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Tabs, Tab, Box, IconButton, Tooltip } from '@mui/material';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PrintIcon from '@mui/icons-material/Print';
import { CSVLink } from 'react-csv';

const MySwal = withReactContent(Swal);

const Medicine = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isMedicineModalOpen, setIsMedicineModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
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
      setLoading(true); // Set loading to true before fetching
      const data = await medicineService.getAllMedicines();
      if (Array.isArray(data)) {
        setTransactions(data);
      } else {
        console.warn('Fetched data is not an array:', data);
        setTransactions([]);
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      toast.error('Failed to fetch transactions.');
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleNewRecord = () => {
    setIsMedicineModalOpen(true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const { FullName, Address, MedicineName } = transaction;
    return (
      FullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      MedicineName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleCreateSubmit = async (data) => {
    try {
      const medicineData = {
        TransactionID: data.TransactionID,
        FullName: data.FullName,
        Address: data.Address,
        MedicineName: data.MedicineName,
      };

      await medicineService.createMedicine(medicineData);

      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Medicine record created successfully!',
        confirmButtonText: 'OK',
      });

      setIsMedicineModalOpen(false);
      fetchTransactions();
    } catch (error) {
      console.error('Error creating medicine record:', error);
      toast.error('Failed to create medicine record.');
    }
  };

  const handleView = (transaction) => {
    setSelectedTransaction(transaction);
    setIsViewModalOpen(true);
  };

  const handleUpdate = (transaction) => {
    setSelectedTransaction(transaction);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const medicineData = {
        TransactionID: data.TransactionID,
        FullName: data.FullName,
        Address: data.Address,
        MedicineName: data.MedicineName,
      };

      await medicineService.updateMedicine(medicineData);

      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Medicine record updated successfully!',
        confirmButtonText: 'OK',
      });

      setIsUpdateModalOpen(false);
      fetchTransactions();
    } catch (error) {
      console.error('Error updating medicine record:', error);
      toast.error('Failed to update medicine record.');
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
    });

    if (result.isConfirmed) {
      try {
        await medicineService.deleteMedicine(transactionID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Transaction has been deleted.',
          confirmButtonText: 'OK',
        });

        setTransactions((prevTransactions) =>
          prevTransactions.filter((transaction) => transaction.TransactionID !== transactionID)
        );
      } catch (error) {
        console.error('Error deleting transaction:', error);
        toast.error('Failed to delete transaction.');
      }
    }
  };

  // CSV headers for export
  const csvHeaders = [
    { label: "Transaction ID", key: "TransactionID" },
    { label: "Full Name", key: "FullName" },
    { label: "Address", key: "Address" },
    { label: "Medicine Name", key: "MedicineName" },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content" style={{ padding: '20px' }}>
        <Typography variant="h4" className="header" style={{ marginLeft: '40px', marginTop: '20px', marginBottom: '40px', fontWeight: '700' }}>
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

          <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <input
              accept=".csv"
              id="import-csv"
              type="file"
              style={{ display: 'none' }}
              onChange={() => {}}
            />
            <Tooltip title="Import CSV" arrow>
              <IconButton onClick={() => document.getElementById('import-csv').click()} color="primary" aria-label="Import CSV">
                <ImportExportIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Export CSV" arrow>
              <span>
                <CSVLink data={transactions} headers={csvHeaders} filename="medicine_data.csv">
                  <IconButton color="secondary" aria-label="Export CSV">
                    <ImportExportIcon />
                  </IconButton>
                </CSVLink>
              </span>
            </Tooltip>

            <Tooltip title="Print Records" arrow>
              <IconButton color="error" onClick={handlePrint} aria-label="Print Records">
                <PrintIcon />
              </IconButton>
            </Tooltip>

            <Button variant="contained" color="primary" style={{ height: '56px' }} onClick={handleNewRecord}>
              + New Record
            </Button>

            <TextField
              style={{ width: '300px', marginRight: '40px' }}
              variant="outlined"
              placeholder="Search transactions"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </Box>
        </Box>

        <TableContainer style={{ maxWidth: '95%', margin: '30px auto', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Transaction ID', 'Full Name', 'Address', 'Medicine Name', 'Actions'].map((header) => (
                  <TableCell key={header} style={{ backgroundColor: '#0B8769', color: 'white', padding: '10px', textAlign: 'center' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? ( // Check if loading is true
                <TableRow>
                  <TableCell colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.TransactionID}>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{transaction.TransactionID}</TableCell>
                    <TableCell
                      style={{ padding: '10px', textAlign: 'center', cursor: 'pointer', color: '#1976d2' }}
                      onClick={() => handleView(transaction)}
                    >
                      {transaction.FullName}
                    </TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{transaction.Address}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{transaction.MedicineName}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginRight: '10px' }}
                        onClick={() => handleUpdate(transaction)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(transaction.TransactionID)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                    No records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
        </TableContainer>

        {/* Modals for Add, View, Update */}
        {isMedicineModalOpen && (
          <MedicineModal
            isOpen={isMedicineModalOpen}
            onClose={() => setIsMedicineModalOpen(false)}
            onSubmit={handleCreateSubmit}
          />
        )}

        {isViewModalOpen && selectedTransaction && (
          <MedicineViewModal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            medicine={selectedTransaction}
          />
        )}

        {isUpdateModalOpen && selectedTransaction && (
          <MedicineUpdateModal
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            medicine={selectedTransaction}
            onSave={handleUpdateSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Medicine;
