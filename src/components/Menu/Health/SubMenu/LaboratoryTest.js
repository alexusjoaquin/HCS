// LaboratoryTest.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import LaboratoryTestModal from '../Modals/LaboratoryTestModal/LaboratoryTestModal';
import LaboratoryTestViewModal from '../Modals/LaboratoryTestViewModal/LaboratoryTestViewModal';
import LaboratoryTestUpdateModal from '../Modals/LaboratoryTestUpdateModal/LaboratoryTestUpdateModal';
import apiconfig from '../../../../api/apiconfig';
import '../CssFiles/LaboratoryTest.css';

const MySwal = withReactContent(Swal);

const LaboratoryTest = () => {
  const [isNewRecordModalOpen, setIsNewRecordModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await axios.get(apiconfig.labTest.getAll);
      setTests(response.data.data); // Adjust based on your API response structure
    } catch (error) {
      MySwal.fire('Error', 'Failed to fetch laboratory tests', 'error');
    }
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewRecordClick = () => {
    setIsNewRecordModalOpen(true);
  };

  const handleViewClick = (test) => {
    setSelectedTest(test);
    setIsViewModalOpen(true);
  };

  const handleUpdateClick = (test) => {
    setSelectedTest(test);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (test) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete the test for Patient ID: ${test.PatientID}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(apiconfig.labTest.delete, {
            data: { TestID: test.TestID }, // Use TestID
            headers: {
              'Content-Type': 'application/json',
            },
          });
          MySwal.fire('Deleted!', 'The laboratory test has been deleted.', 'success');
          fetchTests();
        } catch (error) {
          // Handle specific error responses
          if (error.response && error.response.status === 404) {
            MySwal.fire('Not Found', 'The laboratory test does not exist.', 'error');
          } else if (error.response && error.response.data && error.response.data.message) {
            MySwal.fire('Error', error.response.data.message, 'error');
          } else {
            MySwal.fire('Error', 'Failed to delete the laboratory test.', 'error');
          }
        }
      }
    });
  };

  const handleModalClose = () => {
    setIsNewRecordModalOpen(false);
    setIsViewModalOpen(false);
    setIsUpdateModalOpen(false);
    setSelectedTest(null);
  };

  const handleCreateSubmit = async (data) => {
    try {
      await axios.post(apiconfig.labTest.create, data);
      MySwal.fire('Success', 'Laboratory test created successfully', 'success');
      fetchTests();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        MySwal.fire('Error', error.response.data.message, 'error');
      } else {
        MySwal.fire('Error', 'Failed to create laboratory test', 'error');
      }
    }
  };

  const handleUpdateSubmit = async (updatedTest) => {
    try {
      await axios.put(apiconfig.labTest.update, {
        TestID: selectedTest.TestID, // Use TestID
        ...updatedTest,
      });
      MySwal.fire('Success', 'Laboratory test updated successfully', 'success');
      fetchTests();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        MySwal.fire('Error', error.response.data.message, 'error');
      } else {
        MySwal.fire('Error', 'Failed to update laboratory test', 'error');
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <h2 className="header">LABORATORY TESTS</h2>

        <div className="tabs">
          <ul className="tab-list">
            {[
              { name: 'Patient Management', path: '/patientmanagement' },
              { name: 'Appointments', path: '/appointment' },
              { name: 'Medical Records', path: '/medicalrecords' },
              { name: 'Laboratory Test', path: '/laboratorytest' },
              { name: 'Bills and Payments', path: '/billspayment' },
              { name: 'Report and Analytics', path: '/reportsandanalytics' }
            ].map((tab, index) => (
              <li
                key={index}
                onClick={() => handleTabClick(tab.path)}
                className="tab"
              >
                {tab.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="button-container">
          <button className="new-record-button" onClick={handleNewRecordClick}>+ New Record</button>
          <input
            type="text"
            placeholder="Search records"
            className="search-input"
            // Implement search functionality as needed
          />
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr className="table-header">
                <th className="table-cell">Test ID</th>
                <th className="table-cell">Patient ID</th>
                <th className="table-cell">Test Name</th>
                <th className="table-cell">Results</th>
                <th className="table-cell actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test.TestID} style={{ borderBottom: '1px solid #ddd' }}>
                  <td className="table-cell">{test.TestID}</td>
                  <td className="table-cell">{test.PatientID}</td>
                  <td className="table-cell">{test.TestName}</td>
                  <td className="table-cell">{test.Results}</td>
                  <td className="table-cell actions">
                    <button
                      className="action-button view-button"
                      onClick={() => handleViewClick(test)}
                    >
                      View
                    </button>
                    <button
                      className="action-button update-button"
                      onClick={() => handleUpdateClick(test)}
                    >
                      Update
                    </button>
                    <button
                      className="action-button delete-button"
                      onClick={() => handleDeleteClick(test)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Record Modal */}
      <LaboratoryTestModal
        isOpen={isNewRecordModalOpen}
        onClose={handleModalClose}
        onSubmit={handleCreateSubmit}
      />

      {/* View Record Modal */}
      <LaboratoryTestViewModal
        isOpen={isViewModalOpen}
        onClose={handleModalClose}
        laboratoryTest={selectedTest}
      />

      {/* Update Record Modal */}
      <LaboratoryTestUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={handleModalClose}
        onSave={handleUpdateSubmit}
        test={selectedTest}
      />
    </div>
  );
};

export default LaboratoryTest;
