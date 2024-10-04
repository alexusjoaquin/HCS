import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import pensionBenefitsService from '../../../services/pensionBenifitsService';
import BenefitPensionModal from '../Modals/BenifitPensionModal/BenifitPensionModal';
import PensionBenifitsViewModal from '../Modals/PensionBenifitsViewModal/PensionBenifitsViewModal';
import PensionBenifitsUpdateModal from '../Modals/PensionBenifitsUpdateModal/PensionBenifitsUpdateModal';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const BenefitsWithPension = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [benefits, setBenefits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = async () => {
    try {
      const response = await pensionBenefitsService.getAllPensionBenefits();
      if (response && Array.isArray(response)) {
        setBenefits(response);
      } else {
        console.warn('Fetched data is not an array:', response);
        setBenefits([]);
      }
    } catch (error) {
      console.error('Failed to fetch benefits:', error);
      toast.error('Failed to fetch benefits. ' + error.message);
    }
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewBenefit = () => {
    setSelectedBenefit(null);
    setCreateModalOpen(true); // Open the create modal
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false); // Close the create modal
  };

  const handleCreateSubmit = async (data) => {
    try {
      const benefitData = {
        BenefitID: `BEN-${Math.floor(Date.now() / 1000)}`,
        BenefitName: data.BenefitName,
        Description: data.Description,
        AmountPension: data.AmountPension,
      };

      await pensionBenefitsService.createPensionBenefit(benefitData);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Benefit created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false); // Close the modal after submission
      fetchBenefits(); // Refresh the benefits list
    } catch (error) {
      console.error('Error creating benefit:', error);
      toast.error('Failed to create benefit: ' + error.message);
    }
  };

  const handleView = (benefit) => {
    setSelectedBenefit(benefit);
    setViewModalOpen(true); // Open the view modal
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false); // Close the view modal
    setSelectedBenefit(null); // Reset selected benefit
  };

  const handleUpdate = (benefit) => {
    setSelectedBenefit(benefit);
    setUpdateModalOpen(true); // Open the update modal
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false); // Close the update modal
    setSelectedBenefit(null); // Reset selected benefit
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const updatedBenefit = {
        BenefitID: selectedBenefit.BenefitID,  // Use the selected record's ID
        BenefitName: data.BenefitName,
        Description: data.Description,
        AmountPension: data.AmountPension,
      };

      await pensionBenefitsService.updatePensionBenefit(updatedBenefit); // Send to service
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Benefit updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false); // Close modal after updating
      fetchBenefits(); // Refresh the benefits list
    } catch (error) {
      console.error('Error updating benefit:', error);
      toast.error('Failed to update benefit: ' + error.message);
    }
  };

  const handleDelete = async (pensionBenefitID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this benefit?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await pensionBenefitsService.deletePensionBenefit(pensionBenefitID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Benefit has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchBenefits(); // Refresh the benefits list
      } catch (error) {
        console.error('Error deleting benefit:', error);
        toast.error('Failed to delete benefit: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">BENEFITS WITH PENSION</h2>

        {/* Tabs Section */}
        <div className="tabs">
          <ul className="tab-list">
            {[
              { label: 'Senior Citizen', path: '/seniorcitizen' },
              { label: 'Health Management', path: '/healthmanagement' },
              { label: 'Events & Activities', path: '/eventsandactivities' },
              { label: 'Social Service', path: '/socialservice' },
              { label: 'Benefits & Entitlements w/ Pension', path: '/benifitswithpension' },
              { label: 'Without Pension', path: '/benifitswithoutpension' },
              { label: 'Report and Analytics', path: '/seniorreportsandanalytics' }
            ].map((tab, index) => (
              <li key={index} onClick={() => handleTabClick(tab.path)} className="tab">
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="button-container">
          <button className="new-record-button" onClick={handleNewBenefit}>
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
                <th>Benefit ID</th>
                <th>Benefit Name</th>
                <th>Description</th>
                <th>Amount Pension</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {benefits.length > 0 ? (
                benefits.map((benefit) => (
                  <tr key={benefit.BenefitID}>
                    <td>{benefit.BenefitID}</td>
                    <td>{benefit.BenefitName}</td>
                    <td>{benefit.Description}</td>
                    <td>{benefit.AmountPension}</td>
                    <td className="actions">
                      <button className="view-button" onClick={() => handleView(benefit)}>
                        View
                      </button>
                      <button className="update-button" onClick={() => handleUpdate(benefit)}>
                        Update
                      </button>
                      <button className="delete-button" onClick={() => handleDelete(benefit.BenefitID)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No benefits found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for New Benefit */}
      {isCreateModalOpen && (
        <BenefitPensionModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onSubmit={handleCreateSubmit}
        />
      )}

      {/* Modal for Viewing Benefit */}
      {isViewModalOpen && (
        <PensionBenifitsViewModal
          isOpen={isViewModalOpen}
          onClose={handleViewModalClose}
          benefit={selectedBenefit} // Pass the selected benefit
        />
      )}

      {/* Modal for Updating Benefit */}
      {isUpdateModalOpen && (
        <PensionBenifitsUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          onSave={handleUpdateSubmit} // Change from onSubmit to onSave
          benefit={selectedBenefit} // Pass the selected benefit for updating
        />
      )}
    </div>
  );
};

export default BenefitsWithPension;
