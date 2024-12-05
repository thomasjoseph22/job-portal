import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

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
        console.log(response.data.job);
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
      console.log(response.data);
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
        setFormError('you have applied for the job.');
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
        </div>

        {alreadyApplied ? (
          <p>You have applied for this job.</p>
        ) : (
          <button onClick={handleApplyClick} style={styles.applyButton}>
            Apply
          </button>
        )}

        {showModal && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h2>Apply for this Job</h2>
              <h3 style={{color:'red'}}>Please complete your profile details before applying</h3>
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
    </div>
  );
};

const styles = {
  pageContainer: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    padding: '20px',
    maxWidth: '800px',
    width: '100%',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  jobImage: {
    width: '50%',
    height: 'auto',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '20px',
    marginLeft:'200px',
  },
  detailsContainer: {
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  applyButton: {
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    width: '90%', // Responsive width
    maxWidth: '500px', // Limit max width for larger screens
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    textAlign: 'left',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  submitButton: {
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  closeButton: {
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
  },
  successMessage: {
    color: 'green',
    marginTop: '10px',
  },
};

export default PostDetailsPage;
