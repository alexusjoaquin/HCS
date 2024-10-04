import React, { useState, useEffect } from 'react';
import Sidebar from '../../../templates/Sidebar';
import familyPlanningService from '../../../services/familyPlanningService'; // Make sure this service is implemented
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const FamilyPlanning = () => {
  const [familyPlanningRecords, setFamilyPlanningRecords] = useState([]);

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

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">FAMILY PLANNING</h2>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Planning ID</th>
                <th>Family ID</th>
                <th>Counselor</th>
                <th>Pills Received</th>
                <th>Date of Session</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(familyPlanningRecords) && familyPlanningRecords.length > 0 ? (
                familyPlanningRecords.map((record) => (
                  <tr key={record.PlanningID}>
                    <td>{record.PlanningID}</td>
                    <td>{record.FamilyID}</td>
                    <td>{record.Counselor}</td>
                    <td>{record.PillsReceived}</td>
                    <td>{record.DateOfSession}</td>
                    <td className="actions">
                      <button className="update-button" onClick={() => console.log('Update', record)}>
                        Update
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(record.PlanningID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No family planning records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FamilyPlanning;
