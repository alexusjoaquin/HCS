// src/components/FamilyPlanning/FamilyPlanning.js
import React, { useState, useEffect } from 'react';
import Sidebar from '../../../templates/Sidebar';
import PlanningModal from '../Modals/PlanningModal/PlanningModal';
import PlanningViewModal from '../Modals/PlanningViewModal/PlanningViewModal';
import PlanningUpdateModal from '../Modals/PlanningUpdateModal/PlanningUpdateModal';
import familyPlanningService from '../../../services/familyPlanningService'; // Make sure this service is implemented
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';

const MySwal = withReactContent(Swal);

const FamilyPlanning = () => {
  const [familyPlanningRecords, setFamilyPlanningRecords] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFamilyPlanningRecords();
  }, []);

  const fetchFamilyPlanningRecords = async () => {
    try {
      const response = await familyPlanningService.getAllFamilyPlanningRecords();
      if (response && Array.isArray(response)) {
        setFamilyPlanningRecords(response);
      } else {
        console.warn('Fetched data is not an array:', response);
        setFamilyPlanningRecords([]);
      }
    } catch (error) {
      console.error('Failed to fetch family planning records:', error);
      toast.error('Failed to fetch family planning records. ' + error.message);
    }
  };

  const handleNewRecord = () => {
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedRecord(null);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedRecord(null);
  };

  const handleDelete = async (planningID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this family planning record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await familyPlanningService.deleteFamilyPlanningRecord(planningID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Family planning record has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchFamilyPlanningRecords();
      } catch (error) {
        console.error('Error deleting family planning record:', error);
        toast.error('Failed to delete family planning record: ' + error.message);
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRecords = familyPlanningRecords.filter(record =>
    record.FamilyID.includes(searchQuery) || record.Counselor.includes(searchQuery)
  );

  return (
    <div className="container">
      <Sidebar />
      <div className="content" style={{ padding: '20px' }}>
        <Typography variant="h4" className="header" style={{ fontWeight: '700', marginLeft: '40px', marginTop: '20px' }}>
          FAMILY PLANNING
        </Typography>

        <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', gap: '30px' }}>
          <Button variant="contained" color="primary" style={{ height: '56px' }} onClick={handleNewRecord}>
            + New Record
          </Button>
          <TextField
            style={{ width: '300px', marginRight: '40px' }}
            variant="outlined"
            placeholder="Search records"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <TableContainer style={{ maxWidth: '95%', margin: '30px auto', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Planning ID', 'Family ID', 'Counselor', 'Pills Received', 'Date of Session', 'Actions'].map((header) => (
                  <TableCell key={header} style={{ backgroundColor: '#0B8769', color: 'white', padding: '10px', textAlign: 'center' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <TableRow key={record.PlanningID}>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{record.PlanningID}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{record.FamilyID}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{record.Counselor}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{record.PillsReceived}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>{record.DateOfSession}</TableCell>
                    <TableCell style={{ padding: '10px', textAlign: 'center' }}>
                      <Button variant="contained" color="secondary" style={{ marginRight: '10px' }} onClick={() => console.log('Update', record)}>
                        Update
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleDelete(record.PlanningID)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                    No family planning records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Modal for New Planning Record */}
      <PlanningModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        onSubmit={fetchFamilyPlanningRecords} // Assuming you want to refetch records after creation
      />

      {/* Modal for Viewing Planning Record */}
      <PlanningViewModal
        isOpen={isViewModalOpen}
        onClose={handleViewModalClose}
        planningRecord={selectedRecord}
      />

      {/* Modal for Updating Planning Record */}
      <PlanningUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        onSave={fetchFamilyPlanningRecords} // Assuming you want to refetch records after update
        record={selectedRecord}
      />
    </div>
  );
};

export default FamilyPlanning;
