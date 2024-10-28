import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import VaccineModal from '../Modals/VaccineModal/VaccineModal';
// import VaccineViewModal from '../Modals/VaccineViewModal/VaccineViewModal';
import VaccineUpdateModal from '../Modals/VaccineUpdateModal/VaccineUpdateModal';
import vaccineService from '../../../services/vaccineService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CircularProgress, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Tabs, Tab, Box, IconButton, Tooltip } from '@mui/material';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ResidentViewModal from '../../Residents/Modals/ResidentViewModal';
import apiconfig from '../../../../api/apiconfig';
import PrintIcon from '@mui/icons-material/Print';
import { CSVLink } from 'react-csv';
import AWS from 'aws-sdk';

const MySwal = withReactContent(Swal);

const Vaccine = () => {
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState(1); // Set Vaccine tab as active
  const [selectedTransaction, setSelectedTransaction] = useState(null); // For viewing and updating
  const [isVaccineModalOpen, setIsVaccineModalOpen] = useState(false);
  // const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [residents, setResidents] = useState([]); // Store residents data
  const [selectedResident, setSelectedResident] = useState(null); // Store selected resident
  const [isViewModalOpen, setViewModalOpen] = useState(false); // State for the resident view modal

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  const username = localStorage.getItem('username'); // Get username from localStorage
  const isAdmin = username && username.startsWith('admin'); // Check if the user is an admin

// Function to extract barangay name
const extractBarangay = (username) => {
if (isAdmin) return null; // If admin, return null

const parts = username.split('_');
return parts.slice(1).join(' ').replace(/_/g, ' '); // Join all parts after the first one to handle names with spaces
};

const barangay = extractBarangay(username); // Extract barangay

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 0) {
      navigate('/medicine');
    } else {
      navigate('/vaccine');
    }
  };

  useEffect(() => {
    fetchResidents();
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchResidents = async () => {
    try {
      const response = await fetch(apiconfig.residents.getAll);
      const data = await response.json();
      if (data.status === 'success' && Array.isArray(data.data)) {
        setResidents(data.data);
      } else {
        console.warn('Fetched resident data is not valid:', data);
        setResidents([]);
      }
    } catch (error) {
      console.error('Failed to fetch residents:', error);
      toast.error('Failed to fetch residents.');
    }
  };

  const handleFullNameClick = (fullName) => {
    const resident = residents.find(res => res.Name === fullName);
    if (resident) {
      setSelectedResident(resident);
      setViewModalOpen(true); // Open the resident view modal
    } else {
      MySwal.fire({
        icon: 'warning',
        title: 'Not Found',
        text: 'Resident not found.',
        confirmButtonText: 'OK',
      });
      console.warn('Resident not found:', fullName);
    }
  };
  
  

  const fetchTransactions = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const data = await vaccineService.getAllVaccines();
      if (Array.isArray(data)) {
        // Filter transactions by barangay
        const filteredTransactions = isAdmin ? data : data.filter(transaction => transaction.Address === barangay);
        setTransactions(filteredTransactions);
      } else {
        console.warn('Fetched data is not an array:', data);
        setTransactions([]); // Fallback to empty array
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      toast.error('Failed to fetch transactions.');
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };
  

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const { FullName, Address, VaccineName } = transaction;
    return (
      FullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      VaccineName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleNewRecord = () => {
    setIsVaccineModalOpen(true); // Open the add modal
  };

  const handleCreateSubmit = async (data) => {
    try {
      const vaccineData = {
        TransactionID: data.TransactionID,
        FullName: data.FullName,
        Address: data.Address,
        VaccineName: data.VaccineName,
      };

      await vaccineService.createVaccine(vaccineData);
      
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Vaccine record created successfully!',
        confirmButtonText: 'OK',
      });

      setIsVaccineModalOpen(false); // Close the modal
      fetchTransactions(); // Refresh the transaction list
    } catch (error) {
      console.error('Error creating vaccine record:', error);
      toast.error('Failed to create vaccine record.');
    }
  };

  // const handleView = (transaction) => {
  //   setSelectedTransaction(transaction);
  //   setViewModalOpen(true); // Open the view modal
  // };

  const handleUpdate = (transaction) => {
    setSelectedTransaction(transaction);
    setIsUpdateModalOpen(true); // Open the update modal
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const vaccineData = {
        TransactionID: data.TransactionID,
        FullName: data.FullName,
        Address: data.Address,
        VaccineName: data.VaccineName,
      };
  
      await vaccineService.updateVaccine(vaccineData);  // Call the update method
  
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Vaccine record updated successfully!',  // Correct success message for update
        confirmButtonText: 'OK',
      });
  
      setIsUpdateModalOpen(false); // Close the update modal
      fetchTransactions(); // Refresh the transaction list
    } catch (error) {
      console.error('Error updating vaccine record:', error);
      toast.error('Failed to update vaccine record.');
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
        await vaccineService.deleteVaccine(transactionID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Transaction has been deleted.',
          confirmButtonText: 'OK',
        });
  
        // Re-fetch transactions to get the latest data
        fetchTransactions();  // Call to refresh the data
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


const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const handleFileUpload = async (event) => {
  const file = event.target.files[0]; // Get the selected file

  if (!file) {
    toast.error("No file selected.");
    return;
  }

  try {
    // Step 1: Upload the CSV file to S3
    const s3Params = {
      Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
      Key: `vaccines/${file.name}`, // Store the file under the 'vaccines' folder
      Body: file,
      ContentType: file.type,
    };

    // Upload file to S3
    const uploadResult = await s3.upload(s3Params).promise();
    const s3FileUrl = uploadResult.Location; // URL of the uploaded file in S3
    toast.success("File uploaded to S3 successfully!");

    // Step 2: Fetch the file from S3
    const response = await fetch(s3FileUrl);
    const csvData = await response.text();

    // Step 3: Process the CSV data
    const rows = csvData.split('\n').map(row => row.split(','));

    // Check for all required columns
    const header = rows[0].map(col => col.trim()); // Trim whitespace in header
    const requiredColumns = ['TransactionID', 'FullName', 'Address', 'VaccineName'];

    const missingColumns = requiredColumns.filter(col => !header.includes(col));
    if (missingColumns.length > 0) {
      MySwal.fire({
        icon: 'error',
        title: 'Invalid File Format',
        text: `Missing columns: ${missingColumns.join(', ')}`,
        confirmButtonText: 'OK',
      });
      return;
    }

    // Proceed with importing the data
    const newTransactions = rows.slice(1).map(row => {
      const transactionData = {};
      header.forEach((col, index) => {
        transactionData[col] = row[index];
      });
      return transactionData;
    });

    // Step 5: Send new transactions to the backend
    for (const transaction of newTransactions) {
      await vaccineService.importVaccinesCSV(transaction); // Call the vaccine import service
    }

    // Success notification after importing data
    MySwal.fire({
      icon: 'success',
      title: 'Import Successful',
      text: 'All vaccine data imported successfully!',
      confirmButtonText: 'OK',
    });

    fetchTransactions(); // Refresh the table after import
  } catch (error) {
    console.error('Error during CSV upload or processing:', error);
    toast.error("Failed to import data.");
  }
};


const handlePrint = () => {
  window.print();
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

          <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <input
            accept=".csv"
            id="import-csv"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
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
              style={{ width: '300px', marginRight:'40px' }}
              variant="outlined"
              placeholder="Search transactions"
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Box>
        </Box>

        <TableContainer style={{ maxWidth: '95%', margin: '30px auto', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Transaction ID', 'Full Name', 'Address', 'Vaccine Name', 'Actions'].map((header) => (
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
                    <TableCell style={{ padding: '10px', textAlign: 'center', cursor: 'pointer', color: '#1976d2' }} onClick={() => handleFullNameClick(transaction.FullName)}>
                      {transaction.FullName}
                    </TableCell>

                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{transaction.Address}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{transaction.VaccineName}</TableCell>
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
        {isVaccineModalOpen && (
          <VaccineModal
            isOpen={isVaccineModalOpen}
            onClose={() => setIsVaccineModalOpen(false)}
            onSubmit={handleCreateSubmit} // Use handleCreateSubmit for saving new records
          />
        )}

        {/* {isViewModalOpen && selectedTransaction && (
          <VaccineViewModal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            transaction={selectedTransaction}
          />
        )} */}

          {isViewModalOpen && selectedResident && (
            <ResidentViewModal
              isOpen={isViewModalOpen}
              onClose={() => setViewModalOpen(false)}
              resident={selectedResident}
            />
          )}


        {isUpdateModalOpen && selectedTransaction && (
          <VaccineUpdateModal
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            transaction={selectedTransaction}
            onSave={handleUpdateSubmit}  // Correct update function
          />
        )}

      </div>
    </div>
  );
};

export default Vaccine;
