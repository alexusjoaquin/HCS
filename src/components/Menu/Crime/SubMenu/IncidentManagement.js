import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import IncidentManagementModal from '../Modals/IncidentManagementModal/IncidentManagementModal';
import IncidentManagementViewModal from '../Modals/IncidentManagementViewModal/IncidentManagementViewModal';
import IncidentManagementUpdateModal from '../Modals/IncidentManagementUpdateModal/IncidentManagementUpdateModal';
import incidentManagementService from '../../../services/incidentManagementService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const IncidentManagement = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const incidentsData = await incidentManagementService.getAllIncidents(); 

      if (Array.isArray(incidentsData)) {
        setIncidents(incidentsData);
      } else {
        console.warn('Fetched data is not an array:', incidentsData);
        setIncidents([]);
      }
    } catch (error) {
      console.error('Failed to fetch incidents:', error);
      toast.error('Failed to fetch incidents. ' + error.message);
    }
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewIncident = () => {
    setSelectedIncident(null);
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

    const handleCreateSubmit = async (data) => {
      try {
          const incidentData = {
              IncidentID: data.IncidentID, // Ensure this is correctly set
              IncidentType: data.Type,      // Ensure this key matches your Lambda expectation
              Location: data.Location,
              DateReported: data.DateReported,
              Status: data.Status,
          };

          await incidentManagementService.createIncident(incidentData);
          MySwal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Incident created successfully!',
              confirmButtonText: 'OK',
          });
          setCreateModalOpen(false);
          fetchIncidents();
      } catch (error) {
          console.error('Error creating incident:', error);
          toast.error('Failed to create incident: ' + error.message);
      }
  };


  const handleView = (incident) => {
    setSelectedIncident(incident);
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedIncident(null);
  };

  const handleUpdate = (incident) => {
    setSelectedIncident(incident);
    setUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedIncident(null);
  };

  const handleUpdateSave = async (data) => {
    try {
      const updatedIncidentData = {
        IncidentID: data.IncidentID, // Ensure this is correctly set
        IncidentType: data.IncidentType, // Changed from Type to IncidentType
        Location: data.Location,
        DateReported: data.DateReported,
        Status: data.Status,
      };
      
      await incidentManagementService.updateIncident(updatedIncidentData);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Incident updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false);
      fetchIncidents();
    } catch (error) {
      console.error('Error updating incident:', error);
      toast.error('Failed to update incident: ' + error.message);
    }
  };

  const handleDelete = async (incidentID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this incident?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await incidentManagementService.deleteIncident(incidentID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Incident has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchIncidents();
      } catch (error) {
        console.error('Error deleting incident:', error);
        toast.error('Failed to delete incident: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">INCIDENT MANAGEMENT</h2>

        {/* Tabs Section */}
        <div className="tabs">
          <ul className="tab-list">
            {[
              { label: 'Crime Reports', path: '/crimereports' },
              { label: 'Incident Management', path: '/incidentmanagement' },
              { label: 'Investigation', path: '/investigation' },
              { label: 'Suspects', path: '/suspects' },
              { label: 'Victims', path: '/victims' },
              { label: 'Court Cases', path: '/courtcases' },
              { label: 'Report and Analytics', path: '/crimereportsandanalytics' },
            ].map((tab, index) => (
              <li
                key={index}
                onClick={() => handleTabClick(tab.path)}
                className="tab"
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="button-container">
          <button className="new-record-button" onClick={handleNewIncident}>
            + New Incident
          </button>
          <input type="text" placeholder="Search incidents" className="search-input" />
        </div>

        <div style={{ 
            overflowX: 'auto', 
            backgroundColor: '#fff', 
            borderRadius: '5px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
            maxWidth: 'calc(100% - 30px)', 
            marginLeft: '50px' 
          }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse', 
              minWidth: '600px', 
              marginLeft: '0' 
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                  <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Incident ID</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Incident Type</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Status</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Date Reported</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Location</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {incidents.length > 0 ? (
                  incidents.map((incident) => (
                    <tr key={incident.IncidentID}>
                      <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{incident.IncidentID}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{incident.IncidentType}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{incident.Status}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{incident.DateReported}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{incident.Location}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                        <button 
                          style={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            padding: '5px 10px',
                            marginRight: '5px'
                          }}
                          onClick={() => handleView(incident)}
                        >
                          View
                        </button>
                        <button 
                          style={{
                            backgroundColor: '#2196F3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            padding: '5px 10px',
                            marginRight: '5px'
                          }}
                          onClick={() => handleUpdate(incident)}
                        >
                          Update
                        </button>
                        <button 
                          style={{ 
                            padding: '5px 10px', 
                            backgroundColor: '#f44336', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '5px', 
                            cursor: 'pointer' 
                          }}
                          onClick={() => handleDelete(incident.IncidentID)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '12px' }}>No incidents found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

      </div>

      {/* Modals */}
      {isCreateModalOpen && (
        <IncidentManagementModal isOpen={isCreateModalOpen} onClose={handleCreateModalClose} onSubmit={handleCreateSubmit} />
      )}
<IncidentManagementViewModal
    isOpen={isViewModalOpen}
    onClose={handleViewModalClose}
    incidentReport={selectedIncident} // Pass selectedIncident as incidentReport
/>

      {isUpdateModalOpen && (
        <IncidentManagementUpdateModal isOpen={isUpdateModalOpen} onClose={handleUpdateModalClose} onSave={handleUpdateSave} incident={selectedIncident} />
      )}
    </div>
  );
};

export default IncidentManagement;
