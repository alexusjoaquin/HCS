import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import FamilySocialModal from '../Modals/FamilySocialModal/FamilySocialModal';
import FamilySocialUpdateModal from '../Modals/FamilySocialUpdateModal/FamilySocialUpdateModal';
import FamilySocialViewModal from '../Modals/FamilySocialViewModal/FamilySocialViewModal';
import familysocialService from '../../../services/familysocialService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const FamilySocialServices = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [socialServices, setSocialServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSocialServices();
  }, []);

  const fetchSocialServices = async () => {
    try {
      const response = await familysocialService.getAllFamilySocialRecords();
      
      if (response && response.familySocialServices) {
        if (Array.isArray(response.familySocialServices)) {
          setSocialServices(response.familySocialServices);
        } else {
          console.warn('Fetched familySocialServices is not an array:', response.familySocialServices);
          setSocialServices([]);
        }
      } else {
        console.warn('Response does not contain familySocialServices:', response);
        setSocialServices([]);
      }
    } catch (error) {
      console.error('Failed to fetch social services:', error);
      toast.error('Failed to fetch social services. ' + error.message);
    }
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewService = () => {
    setSelectedService(null);
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateSubmit = async (data) => {
    try {
      const serviceData = {
        ServiceID: `SERV-${Math.floor(Date.now() / 1000)}`, // Auto-generated Service ID
        CaseWorker: data.CaseWorker,
        Date: data.Date,
        Location: data.Location,
        Description: data.Description,
      };

      await familysocialService.createFamilySocialRecord(serviceData);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Social service created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false);
      fetchSocialServices();
    } catch (error) {
      console.error('Error creating social service:', error);
      toast.error('Failed to create social service: ' + error.message);
    }
  };

  const handleView = (service) => {
    setSelectedService(service);
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedService(null);
  };

  const handleUpdate = (service) => {
    if (service) {
      setSelectedService(service);
      setUpdateModalOpen(true);
    }
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedService(null);
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const updatedService = {
        ServiceID: selectedService.ServiceID, // Ensure selectedService is valid
        CaseWorker: data.CaseWorker,
        Date: data.Date,
        Location: data.Location,
        Description: data.Description,
      };

      await familysocialService.updateFamilySocialRecord(updatedService);
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Social service updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false);
      fetchSocialServices();
    } catch (error) {
      console.error('Error updating social service:', error);
      toast.error('Failed to update social service: ' + error.message);
    }
  };

  const handleDelete = async (serviceID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this social service?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await familysocialService.deleteFamilySocialRecord(serviceID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Social service has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchSocialServices();
      } catch (error) {
        console.error('Error deleting social service:', error);
        toast.error('Failed to delete social service: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">FAMILY SOCIAL SERVICES</h2>

        <div className="tabs">
          <ul className="tab-list">
            {[
              { label: <><span>Family</span><br /><span>Profiles</span></>, path: '/familyprofiles' },
              { label: <><span>Member</span><br /><span>Management</span></>, path: '/membermanagement' },
              { label: <><span>Health</span><br /><span>& Well Being</span></>, path: '/healthandwellbeing' },
              { label: <><span>Member</span><br /><span>Education</span></>, path: '/education' },
              { label: <><span>Financial</span><br /><span>Assistance</span></>, path: '/financialassistance' },
              { label: <><span>Social</span><br /><span>Services</span></>, path: '/familysocialservices' },
              { label: <><span>Counselling</span><br /><span>& Support</span></>, path: '/counsellingsupport' },
              { label: <><span>Events</span><br /><span>& Activities</span></>, path: '/familyeventsandactivities' },
              { label: <><span>Report</span><br /><span>& Analytics</span></>, path: '/familyreportsandanalytics' },
            ].map((tab, index) => (
              <li key={index} onClick={() => handleTabClick(tab.path)} className="tab">
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="button-container">
          <button className="new-record-button" onClick={handleNewService}>
            + New Record
          </button>
          <input
            type="text"
            placeholder="Search records"
            className="search-input"
          />
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Service ID</th>
                <th>Case Worker</th>
                <th>Date</th>
                <th>Location</th>
                <th>Description</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(socialServices) && socialServices.length > 0 ? (
                socialServices.map((service) => (
                  <tr key={service.ServiceID}>
                    <td>{service.ServiceID}</td>
                    <td>{service.CaseWorker}</td>
                    <td>{service.Date}</td>
                    <td>{service.Location}</td>
                    <td>{service.Description}</td>
                    <td className="actions">
                      <button className="view-button" onClick={() => handleView(service)}>
                        View
                      </button>
                      <button className="update-button" onClick={() => handleUpdate(service)}>
                        Update
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(service.ServiceID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No social services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for New Social Service */}
      {isCreateModalOpen && (
        <FamilySocialModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onSubmit={handleCreateSubmit}
        />
      )}

      {/* Modal for Viewing Social Service */}
      {isViewModalOpen && (
        <FamilySocialViewModal
          isOpen={isViewModalOpen}
          onClose={handleViewModalClose}
          service={selectedService}
        />
      )}

      {/* Modal for Updating Social Service */}
      {isUpdateModalOpen && (
        <FamilySocialUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          service={selectedService}
          onSubmit={handleUpdateSubmit}
        />
      )}
    </div>
  );
};

export default FamilySocialServices;
