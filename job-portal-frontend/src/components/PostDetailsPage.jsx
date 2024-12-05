import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PostDetailsPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    experience: '',
    highest_education: '',
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/publicpost/${jobId}/`);
        setJob(response.data.job);
        setAlreadyApplied(response.data.already_applied);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch job details');
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const fetchApplicantDetails = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://localhost:8000/accounts/api/applicant-details/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { first_name = '', last_name = '', email = '', experience = '', highest_education = '' } = response.data;
      setFormData({
        first_name,
        last_name,
        email,
        experience,
        highest_education,
      });
    } catch (err) {
      setError('Failed to fetch applicant details');
      navigate('/login');
    }
  };

  const handleApplyClick = () => {
    fetchApplicantDetails();
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setFormLoading(true);
    const token = localStorage.getItem('access_token');

    try {
      const response = await axios.post(
        `http://localhost:8000/api/apply-job/${jobId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormSuccess('Application sent successfully!');
      setFormLoading(false);
      setAlreadyApplied(true);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        experience: '',
        highest_education: '',
      });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setFormError('You have applied for the job.');
      } else {
        setFormError('Failed to send the application. Please try again.');
      }
      setFormLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormError('');
    setFormSuccess('');
  };

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.pageContainer}>
  <div style={styles.container}>
    <h1 style={styles.heading}>{job.title}</h1>
    <div style={styles.detailsWrapper}>
      <img
        src={`http://localhost:8000${job.job_image}`}
        alt={job.title}
        style={styles.jobImage}
      />
      <div style={styles.detailsContainer}>
        <p><strong>Category:</strong> {job.category}</p>
        <p><strong>Company:</strong> {job.company_name}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Description:</strong> {job.description}</p>
        <p><strong>Experience Required:</strong> {job.experience} years</p>
        <p><strong>Eligibility:</strong> {job.eligibility}</p>
        <p><strong>Immediate Joiner:</strong> {job.immediate_joiner ? 'Yes' : 'No'}</p>
        <p><strong>Date of Issue:</strong> {new Date(job.date_of_issue).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(job.end_date).toLocaleDateString()}</p>

        {alreadyApplied ? (
          <p>You have applied for this job.</p>
        ) : (
          <button onClick={handleApplyClick} style={styles.applyButton}>
            Apply
          </button>
        )}
      </div>
    </div>

        {showModal && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h2>Apply for this Job</h2>
              <h3 style={{ color: 'red' }}>Please complete your profile details before applying</h3>
              <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />

                <label style={styles.label}>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />

                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />

                <label style={styles.label}>Experience</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />

                <label style={styles.label}>Education</label>
                <input
                  type="text"
                  name="highest_education"
                  value={formData.highest_education}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />

                <button type="submit" style={styles.submitButton}>
                  {formLoading ? 'Submitting...' : 'Submit Application'}
                </button>
                {formError && <p style={styles.errorMessage}>{formError}</p>}
                {formSuccess && <p style={styles.successMessage}>{formSuccess}</p>}
              </form>
              <button onClick={closeModal} style={styles.closeButton}>Close</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  pageContainer: {
    width: '100%',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    padding: '40px',
    width: '90%',
    maxWidth: '1200px',
    margin: '20px auto',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#2d3748',
  },
  detailsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    alignItems: 'flex-start',
    flexWrap: 'wrap', // Allow wrapping for smaller screens
  },
  jobImage: {
    flex: '1 1 300px', // Allow flexible resizing
    width: '100%',
    maxHeight: '400px',
    borderRadius: '15px',
    objectFit: 'cover',
  },
  detailsContainer: {
    flex: '2 1 600px', // Allow flexible resizing
    textAlign: 'left',
    fontSize: '1rem',
    lineHeight: '1.8',
    color: '#4a5568',
  },
  applyButton: {
    padding: '12px 20px',
    backgroundColor: '#28a745',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    textAlign: 'center',
    margin: '20px 0',
    transition: 'all 0.3s ease',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '10px', // Padding for smaller screens
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    outline: 'none',
    fontSize: '1rem',
    width: '100%', // Ensure full width on small screens
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#38a169',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  closeButton: {
    padding: '10px 20px',
    backgroundColor: '#e53e3e',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: '10px',
    transition: 'all 0.3s ease',
  },
  errorMessage: {
    color: '#e53e3e',
    fontWeight: 'bold',
  },
  successMessage: {
    color: '#38a169',
    fontWeight: 'bold',
  },
};

// Media queries for responsiveness
const mediaQueries = {
  '@media (max-width: 768px)': {
    detailsWrapper: {
      flexDirection: 'column', // Stack elements vertically
    },
    jobImage: {
      maxHeight: '300px',
    },
  },
  '@media (max-width: 500px)': {
    heading: {
      fontSize: '1.5rem',
    },
    container: {
      padding: '20px',
    },
    applyButton: {
      width: '100%',
    },
  },
};


export default PostDetailsPage;
