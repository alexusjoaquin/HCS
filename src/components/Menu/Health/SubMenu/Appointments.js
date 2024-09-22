// src/components/Appointments/Appointment.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import AppointmentModal from '../Modals/AppointmentModal/AppointmentModal';
import AppointmentViewModal from '../Modals/AppointmentViewModal/AppointmentViewModal';
import AppointmentUpdateModal from '../Modals/AppointmentUpdateModal/AppointmentUpdateModal';
import appointmentService from '../../../services/appointmentService';
import '../CssFiles/Appointment.css';
import { toast } from 'react-toastify'; // For notifications
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Appointments = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await appointmentService.getAllAppointments();
      console.log('Fetched appointments:', data); // Debugging line
      if (Array.isArray(data)) {
        setAppointments(data);
      } else {
        console.warn('Fetched data is not an array:', data);
        setAppointments([]); // Fallback to empty array
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      toast.error('Failed to fetch appointments.');
    }
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewRecord = () => {
    setSelectedAppointment(null);
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateSubmit = async (data) => {
    try {
      // Generate a unique AppointmentID. Consider using UUID for better uniqueness.
      const appointmentData = {
        AppointmentID: `A${Math.floor(Date.now() / 1000)}`, // Simple unique ID
        PatientID: data.PatientID,
        DoctorID: data.DoctorID,
        Date: data.Date,
        Time: data.Time,
        Reason: data.Reason,
        Status: data.Status,
      };
      const response = await appointmentService.createAppointment(appointmentData);
      console.log('Appointment created:', response);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Appointment created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false); // Close the modal
      fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast.error('Failed to create appointment.');
    }
  };

  const handleView = (appointment) => {
    setSelectedAppointment(appointment);
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleUpdate = (appointment) => {
    setSelectedAppointment(appointment);
    setUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleUpdateSave = async (data) => {
    try {
      const appointmentData = {
        AppointmentID: data.AppointmentID,
        PatientID: data.PatientID,
        DoctorID: data.DoctorID,
        Date: data.Date,
        Time: data.Time,
        Reason: data.Reason,
        Status: data.Status,
      };
      const response = await appointmentService.updateAppointment(appointmentData);
      console.log('Appointment updated:', response);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Appointment updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false); // Close the modal
      fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast.error('Failed to update appointment.');
    }
  };

  const handleDelete = async (appointmentID) => {
    // Integrate SweetAlert2 confirm dialog
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this appointment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await appointmentService.deleteAppointment(appointmentID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Appointment has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchAppointments(); // Refresh the list
      } catch (error) {
        console.error('Error deleting appointment:', error);
        toast.error('Failed to delete appointment.');
      }
    }
    // If canceled, do nothing
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">APPOINTMENTS</h2>

        <div className="tabs">
          <ul className="tab-list">
            {[
              { name: 'Patient Management', path: '/patientmanagement' },
              { name: 'Appointments', path: '/appointment' },
              { name: 'Medical Records', path: '/medicalrecords' },
              { name: 'Laboratory Test', path: '/laboratorytest' },
              { name: 'Bills and Payments', path: '/billspayment' },
              { name: 'Report and Analytics', path: '/reportsandanalytics' },
            ].map((tab, index) => (
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
            placeholder="Search records"
            className="search-input"
            // Implement search functionality if desired
          />
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Patient ID</th>
                <th>Doctor ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(appointments) && appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment.AppointmentID}>
                    <td>{appointment.AppointmentID}</td>
                    <td>{appointment.PatientID}</td>
                    <td>{appointment.DoctorID}</td>
                    <td>{appointment.Date}</td>
                    <td>{appointment.Time}</td>
                    <td>{appointment.Reason}</td>
                    <td>{appointment.Status}</td>
                    <td className="actions">
                      <button className="view-button" onClick={() => handleView(appointment)}>
                        View
                      </button>
                      <button className="update-button" onClick={() => handleUpdate(appointment)}>
                        Update
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(appointment.AppointmentID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center' }}>
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for New Record */}
      <AppointmentModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        onSubmit={handleCreateSubmit}
      />

      {/* Modal for Viewing Appointment */}
      <AppointmentViewModal
        isOpen={isViewModalOpen}
        onClose={handleViewModalClose}
        appointment={selectedAppointment}
      />

      {/* Modal for Updating Appointment */}
      <AppointmentUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        onSave={handleUpdateSave}
        appointment={selectedAppointment || {}}
      />
    </div>
  );
};

export default Appointments;
