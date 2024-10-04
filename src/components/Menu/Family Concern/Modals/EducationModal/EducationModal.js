import React from 'react';

const EducationModal = ({ isOpen, onClose, onSubmit }) => {
  // Generate an auto-incremented StudentID based on timestamp
  const generateStudentID = () => `STU-${Date.now()}`; // Fixed string interpolation

  const [formData, setFormData] = React.useState({
    StudentID: generateStudentID(), // Auto-generated
    FullName: '',
    Course: '',
    EnrollmentStatus: '',
    SchoolName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData); // Wait for the submission to complete
    // Reset form with a new StudentID after successful submission
    setFormData({
      StudentID: generateStudentID(),
      FullName: '',
      Course: '',
      EnrollmentStatus: '',
      SchoolName: '',
    });
    onClose(); // Close only after successful submission
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>New Student Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Student ID:
            <input
              type="text"
              name="StudentID"
              value={formData.StudentID}
              readOnly // Auto-generated, so it's read-only
              style={modalStyles.input}
            />
          </label>
          <label>
            Full Name:
            <input
              type="text"
              name="FullName"
              value={formData.FullName}
              onChange={handleChange}
              placeholder="Enter Full Name"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Course:
            <input
              type="text"
              name="Course"
              value={formData.Course}
              onChange={handleChange}
              placeholder="Enter Course"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            Enrollment Status:
            <input
              type="text"
              name="EnrollmentStatus"
              value={formData.EnrollmentStatus}
              onChange={handleChange}
              placeholder="Enter Enrollment Status"
              required
              style={modalStyles.input}
            />
          </label>
          <label>
            School Name:
            <input
              type="text"
              name="SchoolName"
              value={formData.SchoolName}
              onChange={handleChange}
              placeholder="Enter School Name"
              required
              style={modalStyles.input}
            />
          </label>
          <div style={modalStyles.buttonContainer}>
            <button type="submit" style={modalStyles.submitButton}>
              Submit
            </button>
            <button type="button" onClick={onClose} style={modalStyles.closeButton}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Styles...

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  input: {
    width: '380px',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'block',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '20px',
  },
  submitButton: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '130px',
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  closeButton: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '130px',
    backgroundColor: '#f44336',
    color: 'white',
  },
};

export default EducationModal;
