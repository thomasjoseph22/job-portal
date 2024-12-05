import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompanyNavbar from './CompanyNavbar';
import Footer from './Footer'; // Import Footer component
import { Link } from 'react-router-dom';

const AdminAppliedJobsPage = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('User is not authenticated. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/company-applied-jobs/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppliedJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch applied jobs.');
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  const updateApplicationStatus = async (id, status) => {
    const token = localStorage.getItem('access_token');
    setLoading(true);
    setModalMessage(null);
    
    try {
      await axios.patch(`http://localhost:8000/api/job-applications/${id}/`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setAppliedJobs((prev) =>
        prev.map((job) =>
          job.id === id ? { ...job, status } : job
        )
      );
  
      setModalMessage(`Status updated to ${status.charAt(0).toUpperCase() + status.slice(1)} successfully.`);
      window.location.reload();
    } catch (err) {
      setModalMessage('Failed to update status.');
    } finally {
      setLoading(false);
    }
  };
  

  // Append spinner styles to the document
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet); // Cleanup
    };
  }, []);

  if (loading) return <div style={styles.spinner}></div>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.pageWrapper}>
      <CompanyNavbar />
      <div style={styles.container}>
        <h1 style={styles.heading}>Applied Jobs</h1>
        {appliedJobs.length === 0 ? (
          <p>No applicants have applied for jobs in your company yet.</p>
        ) : (
          <div style={styles.jobList}>
            {appliedJobs.map((job) => (
              <div key={job.id} style={styles.jobItem}>
                <h3 style={styles.jobTitle}>{job.job.title}</h3>
                <div style={styles.jobDetails}>
                  <p><strong>Applicant Name:</strong> {job.first_name} {job.last_name}</p>
                  <p><strong>Email:</strong> {job.email}</p>
                  <p><strong>Experience:</strong> {job.experience}</p>
                  <p><strong>Highest Education:</strong> {job.highest_education}</p>
                  <p><strong>Applied On:</strong> {new Date(job.applied_on).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> {job.status}</p>
                  <p>
                    <strong>Resume: </strong>
                    <a href={`http://localhost:8000${job.resume}`} download>
                      Download Resume
                    </a>
                  </p>

                  <div style={styles.buttonContainer}>
                    {job.status === 'applied' && (
                      <>
                        <button
                          style={styles.acceptButton}
                          onClick={() => updateApplicationStatus(job.id, 'interview')}
                        >
                          Accept for Interview
                        </button>
                        <button
                          style={styles.rejectButton}
                          onClick={() => updateApplicationStatus(job.id, 'rejected')}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {job.status === 'interview' && (
                      <>
                        <button
                          style={styles.hireButton}
                          onClick={() => updateApplicationStatus(job.id, 'hired')}
                        >
                          Hire
                        </button>
                        <button
                          style={styles.rejectButton}
                          onClick={() => updateApplicationStatus(job.id, 'rejected')}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {job.status === 'hired' && (
                      <strong style={{ ...styles.statusText, color: 'green' }}>Hired</strong>
                    )}
                    {job.status === 'rejected' && (
                      <strong style={{ ...styles.statusText, color: 'red' }}>Rejected</strong>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {modalMessage && (
          <Modal
            message={modalMessage}
            onClose={() => setModalMessage(null)}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f0f0f5',
  },
  container: {
    flex: '1',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  jobList: {
    display: 'flex',
    flexWrap: 'wrap', // Allows wrapping of items
    justifyContent: 'space-between', // Spaces out items evenly
    padding: '0',
  },
  jobItem: {
    flex: '1 1 calc(30% - 10px)', // Makes each card take up 1/3 of the row (with margin)
    margin: '5px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  jobDetails: {
    padding: '10px',
    borderTop: '1px solid #eee',
    marginTop: '10px',
  },
  jobTitle: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#007BFF',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
    margin: '5px',
    transition: 'background-color 0.3s',
  },
  rejectButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
    margin: '5px',
    transition: 'background-color 0.3s',
  },
  hireButton: {
    backgroundColor: '#008CBA',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
    margin: '5px',
    transition: 'background-color 0.3s',
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
  spinner: {
    margin: '100px auto',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '5px solid lightgray',
    borderTop: '5px solid #007BFF',
    animation: 'spin 1s linear infinite',
  },
};

export default AdminAppliedJobsPage;
