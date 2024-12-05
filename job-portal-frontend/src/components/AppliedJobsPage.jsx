import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const AppliedJobsPage = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/applied-jobs/', {
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
  }, [navigate]);

  if (loading) return <p>Loading your applied jobs...</p>;

  return (
    <>
      <Navbar />
      <div 
        className="container-fluid" 
        style={{
          padding: '20px', 
          minHeight: '100vh',
          background:'#f5f3ec',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <div style={styles.container}>
          <h1 style={styles.heading}>Jobs You Have Applied For</h1>
          {error ? (
            <div style={styles.errorContainer}>
              <p style={styles.errorText}>{error}</p>
            </div>
          ) : appliedJobs.length === 0 ? (
            <p style={{ color: 'black' }}>You have not applied for any jobs yet.</p>
          ) : (
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Job Title</th>
                    <th style={styles.tableHeader}>Company</th>
                    <th style={styles.tableHeader}>Location</th>
                    <th style={styles.tableHeader}>Applied On</th>
                    <th style={styles.tableHeader}>First Name</th>
                    <th style={styles.tableHeader}>Last Name</th>
                    <th style={styles.tableHeader}>Email</th>
                    <th style={styles.tableHeader}>Experience</th>
                    <th style={styles.tableHeader}>Highest Education</th>
                    <th style={styles.tableHeader}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appliedJobs.map((application) => (
                    <tr key={application.id}>
                      <td style={styles.tableCell}>{application.job.title}</td>
                      <td style={styles.tableCell}>{application.job.company_name}</td>
                      <td style={styles.tableCell}>{application.job.location}</td>
                      <td style={styles.tableCell}>{new Date(application.applied_on).toLocaleDateString()}</td>
                      <td style={styles.tableCell}>{application.first_name}</td>
                      <td style={styles.tableCell}>{application.last_name}</td>
                      <td style={styles.tableCell}>{application.email}</td>
                      <td style={styles.tableCell}>{application.experience}</td>
                      <td style={styles.tableCell}>{application.highest_education}</td>
                      <td
                        style={{
                          ...styles.tableCell,
                          ...styles.getStatusStyle(application.status),
                        }}
                      >
                        {application.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    padding: '20px',
    width: '90%',
    maxWidth: '1500px',
    margin: '20px auto',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    color: 'black',
  },
  tableContainer: {
    overflowX: 'auto', // Enable horizontal scrolling
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    color: 'black',
    backgroundColor: '#ffffff',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    borderBottom: '2px solid #ddd',
    padding: '10px',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  tableCell: {
    borderBottom: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
  },
  getStatusStyle: (status) => {
    switch (status.toLowerCase()) {
      case 'hired':
        return { backgroundColor: '#28a745', color: '#fff', borderRadius: '5px' };
      case 'rejected':
        return { backgroundColor: '#dc3545', color: '#fff', borderRadius: '5px' };
      case 'interview':
        return { backgroundColor: '#007bff', color: '#fff', borderRadius: '5px' };
      default:
        return { backgroundColor: '#6c757d', color: '#fff', borderRadius: '5px' };
    }
  },
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  errorText: {
    fontSize: '1.2rem',
    color: 'red',
  },
};

export default AppliedJobsPage;
