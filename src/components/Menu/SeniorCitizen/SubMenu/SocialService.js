import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import seniorsSocialService from '../../../services/seniorsSocialService';
import SeniorSocialModal from '../Modals/SeniorSocialModal/SeniorSocialModal';
import SeniorSocialViewModal from '../Modals/SeniorSocialViewModal/SeniorSocialViewModal';
import SeniorSocialUpdateModal from '../Modals/SeniorSocialUpdateModal/SeniorSocialUpdateModal';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { toast } from 'react-toastify';

const MySwal = withReactContent(Swal);

const SocialService = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await seniorsSocialService.getAllSocialServices(); // Fetch all services
      if (response && Array.isArray(response)) {
        setServices(response);
      } else {
        console.warn('Fetched data is not an array:', response);
        setServices([]);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
      toast.error('Failed to fetch services. ' + error.message);
    }
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewService = () => {
    setSelectedService(null);
    setCreateModalOpen(true); // Open the create modal
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateSubmit = async (data) => {
    try {
      const newService = {
        ServiceID: `SRV-${Math.floor(Date.now() / 1000)}`, // Auto-generate Service ID
        ServiceName: data.ServiceName,
        Provider: data.Provider,
        ContactInfo: data.ContactInfo,
        Description: data.Description,
      };

      await seniorsSocialService.createSocialService(newService); // Call your service to create a new service
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Service created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false);
      fetchServices(); // Refresh the services list
    } catch (error) {
      console.error('Error creating service:', error);
      toast.error('Failed to create service: ' + error.message);
    }
  };

  const handleView = (service) => {
    setSelectedService(service);
    setViewModalOpen(true); // Open the view modal
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedService(null);
  };

  const handleUpdate = (service) => {
    setSelectedService(service);
    setUpdateModalOpen(true); // Open the update modal
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedService(null);
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const updatedService = {
        ServiceID: selectedService.ServiceID, // Use the selected record's ID
        ServiceName: data.ServiceName,
        Provider: data.Provider,
        ContactInfo: data.ContactInfo,
        Description: data.Description,
      };

      await seniorsSocialService.updateSocialService(updatedService); // Call your service to update
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Service updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false);
      fetchServices(); // Refresh the services list
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error('Failed to update service: ' + error.message);
    }
  };

  const handleDelete = async (serviceID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this service?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await seniorsSocialService.deleteSocialService(serviceID); // Call your service to delete
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Service has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchServices(); // Refresh the services list
      } catch (error) {
        console.error('Error deleting service:', error);
        toast.error('Failed to delete service: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">SENIOR CITIZEN SOCIAL SERVICES</h2>

        {/* Tabs Section */}
        <div className="tabs">
          <ul className="tab-list">
            {[ // Define your tab labels and paths
              { label: 'Senior Citizen', path: '/seniorcitizen' },
              { label: 'Health Management', path: '/healthmanagement' },
              { label: 'Events & Activities', path: '/eventsandactivities' },
              { label: 'Social Service', path: '/socialservice' },
              { label: 'Benefits & Entitlements w/ Pension', path: '/benifitswithpension' },
              { label: 'Without Pension', path: '/benifitswithoutpension' },
              { label: 'Report and Analytics', path: '/seniorreportsandanalytics' },
            ].map((tab, index) => (
              <li key={index} onClick={() => handleTabClick(tab.path)} className="tab">
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="button-container">
          <button className="new-record-button" onClick={handleNewService}>
            + New Service
          </button>
          <input
            type="text"
            placeholder="Search services"
            className="search-input"
          />
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Service ID</th>
                <th>Service Name</th>
                <th>Provider</th>
                <th>Contact Info</th>
                <th>Description</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services.map((service) => (
                  <tr key={service.ServiceID}>
                    <td>{service.ServiceID}</td>
                    <td>{service.ServiceName}</td>
                    <td>{service.Provider}</td>
                    <td>{service.ContactInfo}</td>
                    <td>{service.Description}</td>
                    <td className="actions">
                      <button className="view-button" onClick={() => handleView(service)}>
                        View
                      </button>
                      <button className="update-button" onClick={() => handleUpdate(service)}>
                        Update
                      </button>
                      <button className="delete-button" onClick={() => handleDelete(service.ServiceID)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for New Service */}
      {isCreateModalOpen && (
        <SeniorSocialModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onSubmit={handleCreateSubmit}
        />
      )}

      {/* Modal for Viewing Service */}
      {isViewModalOpen && (
        <SeniorSocialViewModal
          isOpen={isViewModalOpen}
          onClose={handleViewModalClose}
          service={selectedService} // Pass the selected service
        />
      )}

      {/* Modal for Updating Service */}
      {isUpdateModalOpen && (
        <SeniorSocialUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          onSave={handleUpdateSubmit} // Change from onSubmit to onSave
          service={selectedService} // Pass the selected service for updating
        />
      )}
    </div>
  );
};

export default SocialService;
