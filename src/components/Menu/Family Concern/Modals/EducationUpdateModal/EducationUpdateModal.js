import React from 'react';

const EducationUpdateModal = ({ isOpen, onClose, onSave, student }) => {
  const [formData, setFormData] = React.useState({
    StudentID: '',
    FullName: '',
    Course: '',
    EnrollmentStatus: '',
    SchoolName: '',
  });

  React.useEffect(() => {
    if (student) {
      setFormData({
        StudentID: student.StudentID || '',
        FullName: student.FullName || '',
        Course: student.Course || '',
        EnrollmentStatus: student.EnrollmentStatus || '',
        SchoolName: student.SchoolName || '',
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Validate the data here if necessary
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>Update Education Profile</h2>
        <form onSubmit={handleSave}>
          <label>
            Student ID:
            <input
              type="text"
              name="StudentID"
              value={formData.StudentID}
              readOnly
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
            <select
              name="EnrollmentStatus"
              value={formData.EnrollmentStatus}
              onChange={handleChange}
              required
              style={{ ...modalStyles.input, ...modalStyles.select }} // Apply input styles
            >
              <option value="" disabled>Select Status</option>
              <option value="Enrolled">Enrolled</option>
              <option value="Not Enrolled">Not Enrolled</option>
              <option value="Graduated">Graduated</option>
            </select>
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
            <button type="submit" style={modalStyles.saveButton}>
              Save
            </button>
            <button type="button" onClick={onClose} style={modalStyles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal styles
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
  select: {
    width: '400px',
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
    height: '35px', // Match input height
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '20px'
  },
  saveButton: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '130px',
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  cancelButton: {
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

export default EducationUpdateModal;
