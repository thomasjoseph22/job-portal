import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompanyNavbar from './CompanyNavbar';
import Footer from './Footer';

const AdminAppliedJobsPage = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('User is not authenticated. Please log in.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/company-applied-jobs/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppliedJobs(response.data);
      } catch (err) {
        setError('Failed to fetch applied jobs.');
      }
    };

    fetchAppliedJobs();
  }, []);

  const updateApplicationStatus = async (id, status) => {
    const token = localStorage.getItem('access_token');
    setLoadingStatus(id);

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

      alert(`Status updated to ${status.charAt(0).toUpperCase() + status.slice(1)} successfully.`);
    } catch (err) {
      alert('Failed to update status.');
    } finally {
      setLoadingStatus(null);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div style={{ backgroundImage: 'url("https://c4.wallpaperflare.com/wallpaper/740/287/750/true-detective-matthew-mcconaughey-double-exposure-wallpaper-preview.jpg")', // Background image URL
      backgroundSize: 'cover', 
      backgroundPosition: 'center',}}>
      <CompanyNavbar />
      <div style={styles.container}>
        <h1 style={styles.heading}>Applied Jobs</h1>
        {appliedJobs.length === 0 ? (
          <p>No applicants have applied for jobs in your company yet.</p>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Job Title</th>
                  <th style={styles.th}>Applicant Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Experience</th>
                  <th style={styles.th}>Highest Education</th>
                  <th style={styles.th}>Applied On</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Resume</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appliedJobs.map((job) => (
                  <tr key={job.id}>
                    <td style={styles.td}>{job.job.title}</td>
                    <td style={styles.td}>{job.first_name} {job.last_name}</td>
                    <td style={styles.td}>{job.email}</td>
                    <td style={styles.td}>{job.experience}</td>
                    <td style={styles.td}>{job.highest_education}</td>
                    <td style={styles.td}>{new Date(job.applied_on).toLocaleDateString()}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.statusText,
                        color: job.status === 'hired' ? 'blue' : job.status === 'rejected' ? 'red' : 'green',
                      }}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <a href={`http://localhost:8000${job.resume}`} download>
                        Download Resume
                      </a>
                    </td>
                    <td style={styles.td}>
                      {job.status === 'applied' && (
                        <>
                          <button
                            style={styles.actionButton}
                            onClick={() => updateApplicationStatus(job.id, 'interview')}
                            disabled={loadingStatus === job.id}
                          >
                            {loadingStatus === job.id ? 'Loading...' : 'Accept for Interview'}
                          </button>
                          <button
                            style={styles.actionButton}
                            onClick={() => updateApplicationStatus(job.id, 'rejected')}
                            disabled={loadingStatus === job.id}
                          >
                            {loadingStatus === job.id ? 'Loading...' : 'Reject'}
                          </button>
                        </>
                      )}
                      {job.status === 'interview' && (
                        <>
                          <button
                            style={styles.actionButton}
                            onClick={() => updateApplicationStatus(job.id, 'hired')}
                            disabled={loadingStatus === job.id}
                          >
                            {loadingStatus === job.id ? 'Loading...' : 'Hire'}
                          </button>
                          <button
                            style={styles.actionButton}
                            onClick={() => updateApplicationStatus(job.id, 'rejected')}
                            disabled={loadingStatus === job.id}
                          >
                            {loadingStatus === job.id ? 'Loading...' : 'Reject'}
                          </button>
                        </>
                      )}
                      {job.status === 'hired' && (
                        <strong style={styles.statusText}>Hired</strong>
                      )}
                      {job.status === 'rejected' && (
                        <strong style={styles.statusText}>Rejected</strong>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
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
  tableWrapper: {
    maxHeight: '500px',  // Set maximum height for scrollable area
    overflowY: 'auto',   // Enable vertical scroll only on the table wrapper
    marginTop: '20px',
  },
  table: {
    minWidth: '800px',
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '12px',
    border: '1px solid #ccc',
    backgroundColor: '#f8f8f8',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  td: {
    padding: '10px',
    border: '1px solid #ccc',
    textAlign: 'left',
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '5px',
    margin: '5px',
    transition: 'background-color 0.3s',
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
};

export default AdminAppliedJobsPage;
