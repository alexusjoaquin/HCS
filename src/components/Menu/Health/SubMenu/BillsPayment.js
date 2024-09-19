import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import BillsPaymentModal from '../Modals/BillsPaymentModal/BillsPaymentModal';
import BillsPaymentViewModal from '../Modals/BillsPaymentViewModal/BillsPaymentViewModal'; // Import your view modal
import BillsPaymentUpdateModal from '../Modals/BillsPaymentUpdateModal/BillsPaymentUpdateModal';
import '../CssFiles/BillsPayment.css';

const BillsPayment = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false); // State for view modal
  const [selectedBill, setSelectedBill] = useState(null); // State for selected bill
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedUpdateBill, setSelectedUpdateBill] = useState(null);

  const handleUpdateClick = (bill) => {
    setSelectedUpdateBill(bill); // Set the selected bill for updating
    setUpdateModalOpen(true); // Open the update modal
  };
  

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedUpdateBill(null); // Clear selected bill on close
  };

  const handleUpdateModalSave = (data) => {
    console.log('Updated Data:', data);
    setUpdateModalOpen(false);
  };

  

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewBillClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = (data) => {
    console.log('Submitted Data:', data);
    setModalOpen(false);
  };

  const handleViewClick = (bill) => {
    setSelectedBill(bill); // Set the selected bill
    setViewModalOpen(true); // Open the view modal
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedBill(null); // Clear selected bill on close
  };

  // Example bill data for rendering
  const billsData = [...Array(8)].map((_, index) => ({
    id: `B-000000${index + 1}`,
    patientName: 'Jonard Matados',
    amountDue: 500.00,
    dueDate: '2024-09-15',
    paymentStatus: 'Pending',
  }));

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <h2 className="header">BILLS AND PAYMENTS</h2>
        
        <div className="tabs">
          <ul className="tabs-list">
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
          <button className="new-bill-button" onClick={handleNewBillClick}>+ New Bill</button>
          <input 
            type="text" 
            placeholder="Search bills" 
            className="search-input" 
          />
        </div>
        
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Bill ID</th>
                <th>Patient Name</th>
                <th>Amount Due</th>
                <th>Due Date</th>
                <th>Payment Status</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {billsData.map((bill, index) => (
                <tr key={index}>
                  <td>{bill.id}</td>
                  <td>{bill.patientName}</td>
                  <td>${bill.amountDue.toFixed(2)}</td>
                  <td>{bill.dueDate}</td>
                  <td style={{ color: 'red' }}>{bill.paymentStatus}</td>
                  <td className="actions">
                    <button className="view-button" onClick={() => handleViewClick(bill)}>View</button>
                    <button className="update-button" onClick={() => handleUpdateClick(bill)}>Update</button>
                    <button className="delete-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <BillsPaymentModal 
          isOpen={isModalOpen} 
          onClose={handleModalClose} 
          onSubmit={handleModalSubmit} 
        />

        <BillsPaymentViewModal 
          isOpen={isViewModalOpen} 
          onClose={handleViewModalClose} 
          bill={selectedBill} 
        /> {/* Render the view modal */}

        <BillsPaymentUpdateModal 
          isOpen={isUpdateModalOpen} 
          onClose={handleUpdateModalClose} 
          onSave={handleUpdateModalSave} 
          bill={selectedUpdateBill} // Pass the selected bill for updating
        />
      </div>
    </div>
  );
};

export default BillsPayment;
