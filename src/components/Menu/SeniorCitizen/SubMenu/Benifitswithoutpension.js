import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoPensionModal from '../Modals/NoPensionModal/NoPensionModal';
import NoPensionViewModal from '../Modals/NoPensionViewModal/NoPensionViewModal';
import NoPensionUpdateModal from '../Modals/NoPensionUpdateModal/NoPensionUpdateModal';
import nopensionBenefitsService from '../../../services/nopensionBenefitsService';
import Sidebar from '../../../templates/Sidebar';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const BenefitsWithoutPension = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [benefits, setBenefits] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = async () => {
    try {
      const response = await nopensionBenefitsService.getAllBenefits();
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
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateSubmit = async (data) => {
    try {
      const newBenefit = {
        BenefitID: `BEN-${Math.floor(Date.now() / 1000)}`,
        BenefitName: data.BenefitName,
        Description: data.Description,
        Eligibility: data.Eligibility,
      };

      await nopensionBenefitsService.createBenefit(newBenefit);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Benefit created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false);
      fetchBenefits();
    } catch (error) {
      console.error('Error creating benefit:', error);
      toast.error('Failed to create benefit: ' + error.message);
    }
  };

  const handleView = (benefit) => {
    setSelectedBenefit(benefit);
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedBenefit(null);
  };

  const handleUpdate = (benefit) => {
    if (benefit) {
      setSelectedBenefit(benefit);
      setUpdateModalOpen(true);
    }
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedBenefit(null);
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const updatedBenefit = {
        BenefitID: selectedBenefit.BenefitID,
        BenefitName: data.BenefitName,
        Description: data.Description,
        Eligibility: data.Eligibility,
      };

      await nopensionBenefitsService.updateBenefit(updatedBenefit);
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Benefit updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false);
      fetchBenefits();
    } catch (error) {
      console.error('Error updating benefit:', error);
      toast.error('Failed to update benefit: ' + error.message);
    }
  };

  const handleDelete = async (benefitID) => {
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
        await nopensionBenefitsService.deleteBenefit(benefitID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Benefit has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchBenefits();
      } catch (error) {
        console.error('Error deleting benefit:', error);
        toast.error('Failed to delete benefit: ' + error.message);
      }
    }
  };

  const filteredBenefits = benefits.filter(
    (benefit) =>
      benefit.BenefitName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      benefit.Description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">BENEFITS WITHOUT PENSION</h2>

        <div className="tabs">
          <ul className="tab-list">
            {[
              { label: 'Senior Citizen', path: '/seniorcitizen' },
              { label: 'Health Management', path: '/healthmanagement' },
              { label: 'Events & Activities', path: '/eventsandactivities' },
              { label: 'Social Service', path: '/socialservice' },
              { label: 'Benefits & Entitlements w/ Pension', path: '/benefitswithpension' },
              { label: 'Without Pension', path: '/benefitswithoutpension' },
              { label: 'Report and Analytics', path: '/seniorreportsandanalytics' },
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Benefit Name</th>
                <th>Description</th>
                <th>Eligibility</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredBenefits) && filteredBenefits.length > 0 ? (
                filteredBenefits.map((benefit) => (
                  <tr key={benefit.BenefitID}>
                    <td>{benefit.BenefitID}</td>
                    <td>{benefit.BenefitName}</td>
                    <td>{benefit.Description}</td>
                    <td>{benefit.Eligibility}</td>
                    <td className="actions">
                      <button className="view-button" onClick={() => handleView(benefit)}>
                        View
                      </button>
                      <button className="update-button" onClick={() => handleUpdate(benefit)}>
                        Update
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(benefit.BenefitID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for New Benefit */}
      {isCreateModalOpen && (
        <NoPensionModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onSubmit={handleCreateSubmit}
        />
      )}

      {/* Modal for Viewing Benefit */}
      {isViewModalOpen && (
        <NoPensionViewModal
          isOpen={isViewModalOpen}
          onClose={handleViewModalClose}
          benefit={selectedBenefit}
        />
      )}

      {/* Modal for Updating Benefit */}
        {isUpdateModalOpen && (
          <NoPensionUpdateModal
            isOpen={isUpdateModalOpen}
            onClose={handleUpdateModalClose}
            onSave={handleUpdateSubmit}
            benefit={selectedBenefit} // This should correctly pass the selectedBenefit
          />
        )}
    </div>
  );
};

export default BenefitsWithoutPension;
