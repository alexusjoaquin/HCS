// src/components/EventsandActivities/EventsandActivities.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import eventService from '../../../services/eventService';
import EventModal from '../Modals/EventModal/EventModal';
import EventViewModal from '../Modals/EventViewModal/EventViewModal';
import EventUpdateModal from '../Modals/EventUpdateModal/EventUpdateModal';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const EventsandActivities = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventService.getAllEvents(); // Fetch all events
      if (response && Array.isArray(response)) {
        setEvents(response);
      } else {
        console.warn('Fetched data is not an array:', response);
        setEvents([]);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
      toast.error('Failed to fetch events. ' + error.message);
    }
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewEvent = () => {
    setSelectedEvent(null);
    setCreateModalOpen(true); // Open the create modal
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false); // Close the create modal
  };

  const handleCreateSubmit = async (data) => {
    try {
        const eventData = {
            EventID: `E-${Math.floor(Date.now() / 1000)}`, // You can keep this as is, or generate as you need
            EventName: data.EventName,
            EventDate: data.Date, // Ensure this matches the key in your payload
            Location: data.Location,
            Description: data.Description,
        };

        await eventService.createEvent(eventData);
        MySwal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Event created successfully!',
            confirmButtonText: 'OK',
        });
        setCreateModalOpen(false); // Close the modal after submission
        fetchEvents(); // Refresh the events list
    } catch (error) {
        console.error('Error creating event:', error);
        toast.error('Failed to create event: ' + error.message);
    }
};


  const handleView = (event) => {
    setSelectedEvent(event);
    setViewModalOpen(true); // Open the view modal
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false); // Close the view modal
    setSelectedEvent(null); // Reset selected event
  };

  const handleUpdate = (event) => {
    setSelectedEvent(event);
    setUpdateModalOpen(true); // Open the update modal
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false); // Close the update modal
    setSelectedEvent(null); // Reset selected event
  };

  const handleUpdateSubmit = async (data) => {
    try {
        const updatedEvent = {
            EventID: selectedEvent.EventID, // Use the selected record's ID
            EventName: data.EventName,
            EventDate: data.EventDate, // Make sure this key matches what your API expects
            Location: data.Location,
            Description: data.Description,
        };

        await eventService.updateEvent(updatedEvent); // Send to service
        MySwal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'Event updated successfully!',
            confirmButtonText: 'OK',
        });
        setUpdateModalOpen(false); // Close modal after updating
        fetchEvents(); // Refresh the events list
    } catch (error) {
        console.error('Error updating event:', error);
        toast.error('Failed to update event: ' + error.message);
    }
};


  const handleDelete = async (eventID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this event?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await eventService.deleteEvent(eventID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Event has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchEvents(); // Refresh the events list
      } catch (error) {
        console.error('Error deleting event:', error);
        toast.error('Failed to delete event: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">SENIOR CITIZEN EVENTS & ACTIVITIES</h2>

        <div className="tabs">
          <ul className="tab-list">
            {[
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
          <button className="new-record-button" onClick={handleNewEvent}>
            + New Event
          </button>
          <input
            type="text"
            placeholder="Search events"
            className="search-input"
          />
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Event Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Description</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(events) && events.length > 0 ? (
                events.map((event) => (
                  <tr key={event.EventID}>
                    <td>{event.EventID}</td>
                    <td>{event.EventName}</td>
                    <td>{event.EventDate}</td>
                    <td>{event.Location}</td>
                    <td>{event.Description}</td>
                    <td className="actions">
                      <button className="view-button" onClick={() => handleView(event)}>
                        View
                      </button>
                      <button className="update-button" onClick={() => handleUpdate(event)}>
                        Update
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(event.EventID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for New Event */}
      {isCreateModalOpen && (
        <EventModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onSubmit={handleCreateSubmit}
        />
      )}

      {/* Modal for Viewing Event */}
      {isViewModalOpen && (
        <EventViewModal
          isOpen={isViewModalOpen}
          onClose={handleViewModalClose}
          event={selectedEvent} // Pass the selected event
        />
      )}

      {/* Modal for Updating Event */}
      {isUpdateModalOpen && (
        <EventUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          onSave={handleUpdateSubmit}  // Change from onSubmit to onSave
          event={selectedEvent}  // Pass the selected event for updating
        />
      )}

    </div>
  );
};

export default EventsandActivities;
