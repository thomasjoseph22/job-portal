import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use for navigation
import Navbar from './Navbar'; // Import the Navbar component
import Footer from './Footer';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/publicpost/');
        setJobs(response.data.jobs);
        
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
    
  }, []);

  // Function to handle "View Details" click
  const handleViewDetails = (jobId) => {
    const isApplicant = localStorage.getItem('is_applicant') === 'true';
    const isCompany = localStorage.getItem('is_company') === 'false';

    if (isApplicant && isCompany) {
      navigate(`/publicpost/${jobId}`);
    } else {
      navigate('/login');
    }
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(job =>
    (job.title?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
    (job.category?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
    (job.location?.toLowerCase().includes(searchQuery.toLowerCase()) || '')
  );

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrap}>
        <div style={styles.homepageContainer}>
          <h2 style={styles.heading}>Available Job Posts</h2>

          {/* Search Bar */}
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by job title or category..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={(e) => (e.target.style.border = '1px solid #2F55A4')} // Change border color on focus
              onBlur={(e) => (e.target.style.border = '1px solid #ccc')} // Reset border color on blur
              style={styles.searchInput}
            />
          </div>

          <div style={styles.jobCardsContainer}>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} style={styles.jobCard}>
                  <img src={job.job_image} alt={job.title} style={styles.jobImage} />
                  <h3 style={styles.jobTitle}>{job.title}</h3>
                  <p style={styles.jobCategory}><strong>Category: </strong>{job.category}</p>
                  <p style={styles.jobLocation}><strong>Location:</strong> {job.location}</p>
                  <p style={styles.jobDescription}>
                    {job.description.substring(0, 100)}...
                  </p>
                  <button onClick={() => handleViewDetails(job.id)} style={styles.jobDetailsLink}>
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p>No jobs found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer /> {/* Footer stays at the bottom */}
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor:'#9a99f2'
  },
  contentWrap: {
    flex: '1', // Makes this section take up the remaining space
  },
  homepageContainer: {
    padding: '20px',
    marginBottom: '150px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  searchContainer: {
    textAlign: 'center', // Center the search bar
    marginBottom: '20px', // Space below the search bar
  },
  searchInput: {
    width: '300px', // Adjust width as needed
    padding: '10px',
    borderRadius: '20px', // More rounded corners
    border: '1px solid #ccc',
    transition: 'border 0.3s, box-shadow 0.3s',
    outline: 'none',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  jobCardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
    gap: '20px',
  },
  jobCard: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  },
  jobImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  jobTitle: {
    fontSize: '1.2rem',
    margin: '10px 0',
  },
  jobCategory: {
    fontSize: '1rem',
    color: '#666',
  },
  jobLocation: {
    fontSize: '1rem',
    color: '#333',
    marginTop: '5px',
  },
  jobDescription: {
    fontSize: '0.9rem',
    color: '#333',
  },
  jobDetailsLink: {
    display: 'inline-block',
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#2F55A4',
    color: '#fff',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '0.875rem',
    cursor: 'pointer',
  },
};

export default HomePage;
