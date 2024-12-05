import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CompanyNavbar from './CompanyNavbar'; // Make sure the path is correct
import Footer from './Footer';
import { Link } from 'react-router-dom';

const JobView = () => {
    const [jobs, setJobs] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();

    // Fetch user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('http://localhost:8000/accounts/api/user-details/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                setUserDetails(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
                if (error.response && error.response.status === 401) {
                    handleLogout();
                }
            }
        };
        
        fetchUserDetails();
    }, []);

    // Fetch jobs and filter by company name
    useEffect(() => {
        const fetchJobs = async () => {
            const accessToken = localStorage.getItem('access_token');

            if (!accessToken) {
                console.error('No access token found. Redirecting to login.');
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/api/jobs/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                // Filter jobs by company name if userDetails are available
                if (userDetails && userDetails.company_name) {
                    const filteredJobs = response.data.jobs.filter(
                        (job) => job.company_name === userDetails.company_name
                    );
                    setJobs(filteredJobs);
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized access. Redirecting to login.');
                    navigate('/login');
                }
            }
        };

        if (userDetails) {
            fetchJobs();
        }
    }, [navigate, userDetails]);

    return (
        <div style={{background:'#9a99f2'}}>
        <div style={{ marginBottom: '400px'}}>
            {/* Company Navbar */}
            <CompanyNavbar />

            {/* Main Content Area */}
            <main style={styles.mainContent}>
                <h2 style={styles.heading}>Job Posts</h2>
                <div className="job-cards" style={styles.jobCards}>
                    {jobs.map(job => (
                        <div key={job.id} className="job-card" style={styles.jobCard}>
                            <img src={job.job_image} alt={job.title} style={styles.jobImage} />
                            <h3 style={styles.jobTitle}>{job.title}</h3>
                            <p><strong>Company:</strong> {job.company_name}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Posted on:</strong> {new Date(job.date_of_issue).toLocaleDateString()}</p>
                            <Link to={`/jobs/${job.id}`} style={styles.viewDetailsButton}>View Details</Link>
                        </div>
                    ))}
                </div>
            </main>
        </div>
        <Footer/>
        </div>
    );
};

const styles = {
    mainContent: {
        padding: '20px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },
    heading: {
        fontSize: '2rem',
        textAlign: 'center',
        marginBottom: '20px',
    },
    jobCards: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Makes the grid responsive
        gap: '20px',
        marginTop: '20px',
    },
    jobCard: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '15px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'center',
    },
    jobImage: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: '10px',
    },
    jobTitle: {
        fontSize: '1rem',
        margin: '10px 0',
        fontWeight: 'bold',
    },
    viewDetailsButton: {
        display: 'inline-block',
        padding: '10px 15px',
        color: '#fff',
        backgroundColor: '#2F55A4',
        borderRadius: '4px',
        textDecoration: 'none',
        fontSize: '0.875rem',
        marginTop: '10px',
    },
    '@media (max-width: 768px)': {
        jobCard: {
            flexDirection: 'column',
            textAlign: 'center',
        },
        jobImage: {
            height: '100px',
        },
        jobTitle: {
            fontSize: '0.9rem',
        },
        viewDetailsButton: {
            fontSize: '0.75rem',
            padding: '8px 12px',
        },
    },
    '@media (max-width: 480px)': {
        jobCards: {
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        },
        viewDetailsButton: {
            fontSize: '0.75rem',
            padding: '6px 10px',
        },
    },
};

export default JobView;
