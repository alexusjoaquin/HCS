import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import vaccineService from '../../../services/vaccineService'; // Service to handle fetching data
import { toast } from 'react-toastify'; // For notifications
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Vaccine = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const data = await vaccineService.getAllTransactions();
      if (Array.isArray(data)) {
        setTransactions(data);
      } else {
        console.warn('Fetched data is not an array:', data);
        setTransactions([]); // Fallback to empty array
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      toast.error('Failed to fetch transactions.');
    }
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewRecord = () => {
    MySwal.fire({
      icon: 'info',
      title: 'New Record',
      text: 'Functionality for adding new records will go here!',
      confirmButtonText: 'OK',
    });
  };

  const handleUpdate = (transaction) => {
    MySwal.fire({
      title: 'Update Transaction',
      html: `
        <label for="resident-id">Resident ID:</label>
        <input id="resident-id" class="swal2-input" value="${transaction.ResidentID}"/>
        <label for="medicine-name">Medicine Name:</label>
        <input id="medicine-name" class="swal2-input" value="${transaction.MedicineName}"/>
      `,
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      preConfirm: async () => {
        const updatedResidentID = document.getElementById('resident-id').value;
        const updatedMedicineName = document.getElementById('medicine-name').value;

        if (!updatedResidentID || !updatedMedicineName) {
          Swal.showValidationMessage('Please fill out all fields');
          return false;
        }

        return { updatedResidentID, updatedMedicineName };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedTransaction = {
            ...transaction,
            ResidentID: result.value.updatedResidentID,
            MedicineName: result.value.updatedMedicineName,
          };
          await vaccineService.updateTransaction(transaction.TransactionID, updatedTransaction);
          MySwal.fire('Updated!', 'Transaction has been updated.', 'success');
          fetchTransactions(); // Refresh the list after update
        } catch (error) {
          console.error('Error updating transaction:', error);
          toast.error('Failed to update transaction.');
        }
      }
    });
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
        await vaccineService.deleteTransaction(transactionID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Transaction has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchTransactions(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting transaction:', error);
        toast.error('Failed to delete transaction.');
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">VACCINE MANAGEMENT</h2>

        <div className="tabs">
          <ul className="tab-list">
            {[{ name: 'Medicine', path: '/medicine' }, { name: 'Vaccine', path: '/vaccine' }].map((tab, index) => (
              <li key={index} onClick={() => handleTabClick(tab.path)} className="tab">
                {tab.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="button-container">
          <button className="new-record-button" onClick={handleNewRecord}>
            + New Record
          </button>
          <input
            type="text"
            placeholder="Search transactions"
            className="search-input"
            // Implement search functionality if desired
          />
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Resident ID</th>
                <th>Medicine Name</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(transactions) && transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction.TransactionID}>
                    <td>{transaction.TransactionID}</td>
                    <td>{transaction.ResidentID}</td>
                    <td>{transaction.MedicineName}</td>
                    <td className="actions">
                      <button className="update-button" onClick={() => handleUpdate(transaction)}>
                        Update
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(transaction.TransactionID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>
                    No transactions found.
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

export default Vaccine;
