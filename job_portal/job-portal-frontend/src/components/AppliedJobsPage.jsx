import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const AppliedJobsPage = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasUnviewedJobs, setHasUnviewedJobs] = useState(false);
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
        const unviewedJobs = response.data.some(job => job.viewed === false);
        setHasUnviewedJobs(unviewedJobs);
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
          backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/740/287/750/true-detective-matthew-mcconaughey-double-exposure-wallpaper-preview.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
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
            <ul style={styles.jobList}>
              {appliedJobs.map((application) => (
                <li key={application.id} style={styles.jobItem}>
                  <h3 style={styles.jobTitle}>{application.job.title}</h3>
                  <p><strong>Company:</strong> {application.job.company_name}</p>
                  <p><strong>Location:</strong> {application.job.location}</p>
                  <p><strong>Applied On:</strong> {new Date(application.applied_on).toLocaleDateString()}</p>
                  <p><strong>First Name:</strong> {application.first_name}</p>
                  <p><strong>Last Name:</strong> {application.last_name}</p>
                  <p><strong>Email:</strong> {application.email}</p>
                  <p><strong>Experience:</strong> {application.experience}</p>
                  <p><strong>Highest Education:</strong> {application.highest_education}</p>
                  <p style={styles.status}><strong>Status:</strong> {application.status}</p>
                </li>
              ))}
            </ul>
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
    maxWidth: '1000px',
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
  jobList: {
    listStyleType: 'none',
    padding: 0,
    color: 'black',
  },
  jobItem: {
    backgroundColor: '#e9ecef',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '5px',
  },
  status: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '0.9rem',
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
