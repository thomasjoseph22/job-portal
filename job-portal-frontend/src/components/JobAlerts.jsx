import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { JobContext } from './JobProvider'; // Import the JobContext
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Footer from './Footer'; // Import Footer

const JobAlerts = () => {
    const [jobs, setJobs] = useState([]);
    const [user, setUser] = useState(null);
    const [userSkills, setUserSkills] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const navigate = useNavigate();
    const { setUnviewedJobs } = useContext(JobContext); // Get setUnviewedJobs from context

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const isApplicant = localStorage.getItem('is_applicant') === 'true';

        if (!accessToken || !isApplicant) {
            navigate('/login');
        } else {
            fetchJobs();
            fetchUserData();
        }
    }, [navigate]);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/jobs', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            console.log('Jobs Response:', response.data);
            if (response.data.jobs && Array.isArray(response.data.jobs)) {
                setJobs(response.data.jobs);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };
    
    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/accounts/api/applicant-details/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            console.log('User Data:', response.data);
            setUser(response.data);
    
            // Parse skills correctly
            const skillsString = response.data.skills || '';
            const skillsArray = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
            setUserSkills(skillsArray);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        const filterJobs = () => {
            if (jobs.length > 0 && userSkills.length > 0) {
                // Filter jobs based on skills by matching job title with the skills
                const filtered = jobs.filter(job =>
                    userSkills.some(skill => job.title.toLowerCase().includes(skill.toLowerCase()))
                );
                setFilteredJobs(filtered);

                const unviewedCount = filtered.filter(job => !job.viewed).length;
                setUnviewedJobs(unviewedCount); // Update unviewed jobs count in context
            }
        };

        filterJobs();
    }, [jobs, userSkills, setUnviewedJobs]);

    const handleViewDetails = async (jobId) => {
        try {
            const isApplicant = localStorage.getItem('is_applicant') === 'true';
            if (isApplicant) {
                // Mark the job as viewed in the backend
                const response = await axios.post(`http://localhost:8000/api/jobs/${jobId}/viewed/`, {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
    
                if (response.status === 200) {
                    // Update the job's viewed status in the frontend based on the backend response
                    setJobs(prevJobs => {
                        return prevJobs.map(job =>
                            job.id === jobId ? { ...job, viewed: response.data.viewed } : job
                        );
                    });
    
                    // After marking as viewed, navigate to the job details page
                    navigate(`/publicpost/${jobId}`);
                }
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error marking job as viewed:', error);
        }
    };
    
    
    

    const handleView = async (jobId) => {
        await axios.patch(`http://localhost:8000/api/jobs/${jobId}/viewed/`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        });

        fetchJobs();
    };

    return (
        <>
            <div 
                className="container-fluid" 
                style={{
                    padding: '20px',
                    minHeight: '100vh',
                    backgroundColor: '#f5f3ec', // Set background color
                    color: '#000', // Set text color for better readability
                }}
            >
                <h2 className="text-center my-4" style={{color:'black'}}>Job Alerts</h2>
                <div className="row justify-content-center">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map(job => (
                            <div key={job.id} className="col-auto mb-4">
                                <div className="card h-100" style={{ width: '300px', background: 'black', border: 'none', color:'white' }}>
                                    <img
                                        src={job.job_image}
                                        alt={`${job.title} Image`}
                                        className="card-img-top"
                                        style={{ height: '180px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{job.title}</h5>
                                        <p><strong>Eligibility:</strong> {job.eligibility}</p>
                                        <p><strong>Category:</strong> {job.category}</p>
                                        <p><strong>Experience:</strong> {job.experience}</p>
                                        <button className="btn btn-primary" onClick={() => handleViewDetails(job.id)}>
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No matching jobs found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default JobAlerts;
