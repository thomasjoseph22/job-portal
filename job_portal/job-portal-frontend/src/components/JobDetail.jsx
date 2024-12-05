import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CompanyNavbar from './CompanyNavbar'; // Import the CompanyNavbar component
import Footer from './Footer';

const JobDetail = () => {
    const { id } = useParams(); // Get job ID from URL parameters
    const [job, setJob] = useState(null);
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const fetchJobDetails = async () => {
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from local storage

            if (!accessToken) {
                console.error('No access token found. Redirecting to login.');
                navigate('/login'); // Redirect to login if no token is found
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8000/api/jobs/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}` // Set the authorization header
                    }
                });
                setJob(response.data); // Store the job data in state
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching job details:', error);
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized access. Redirecting to login.');
                    navigate('/login'); // Redirect to login if unauthorized
                }
            }
        };

        fetchJobDetails();
    }, [id, navigate]);

    const handleDelete = async () => {
        const accessToken = localStorage.getItem('access_token'); // Retrieve access token from local storage

        if (!accessToken) {
            console.error('No access token found. Redirecting to login.');
            navigate('/login'); // Redirect to login if no token is found
            return;
        }

        try {
            await axios.delete(`http://localhost:8000/api/jobs/${id}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}` // Set the authorization header
                }
            });
            navigate('/jobview'); // Redirect back to job view after deletion
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    const handleUpdate = () => {
        navigate(`/jobs/update/${id}`);
    };

    if (!job) return <p>Loading...</p>;

    return (
        <div style={{
            backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/740/287/750/true-detective-matthew-mcconaughey-double-exposure-wallpaper-preview.jpg')`,
            backgroundRepeat: 'no-repeat', // Prevents the background image from repeating
            backgroundSize: 'cover', // Makes the background image cover the entire area
            backgroundPosition: 'center', // Centers the background image
            height: '100vh', // Ensures the div takes the full height of the viewport
        }}>
            <CompanyNavbar /> {/* Add the CompanyNavbar here */}
            <div style={{
                padding: '20px',
                backgroundColor: '#f8f9fa', // Light background color
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                marginBottom: '20px',
                maxWidth: '800px', // Max width for larger screens
                margin: '20px auto', // Center the component
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center', // Center text for better readability
            }}>
                <h2 style={{ margin: '0 0 20px', fontSize: '24px' }}>{job.title}</h2>
                <img src={job.job_image} alt={job.title} style={{ width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '8px' }} />
                <div style={{ marginTop: '20px', width: '100%' }}>
                    <p style={{ fontWeight: 'bold' }}><strong>Category:</strong> {job.category}</p>
                    <p style={{ fontWeight: 'bold' }}><strong>Description:</strong> {job.description}</p>
                    <p style={{ fontWeight: 'bold' }}><strong>Eligibility:</strong> {job.eligibility}</p>
                    <p style={{ fontWeight: 'bold' }}><strong>Experience:</strong> {job.experience}</p>
                    <p style={{ fontWeight: 'bold' }}><strong>Location:</strong> {job.location}</p>
                    <p style={{ fontWeight: 'bold' }}><strong>Date of Issue:</strong> {job.date_of_issue}</p>
                    <p style={{ fontWeight: 'bold' }}><strong>End Date:</strong> {job.end_date}</p>
                    <p style={{ fontWeight: 'bold' }}><strong>Immediate Joiner:</strong> {job.immediate_joiner ? 'Yes' : 'No'}</p>
                </div>
                <div style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '10px', // Space between buttons
                }}>
                    <button onClick={handleUpdate} style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        backgroundColor: '#007bff',
                        color: 'white',
                        transition: 'background-color 0.3s, transform 0.3s',
                    }}>Update Post</button>
                    <button onClick={handleDelete} style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        backgroundColor: 'red',
                        color: 'white',
                        transition: 'background-color 0.3s, transform 0.3s',
                    }}>Delete Post</button>
                    <button onClick={() => navigate('/jobview')} style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        transition: 'background-color 0.3s, transform 0.3s',
                    }}>Back to Job View</button>
                </div>
            </div>
            <Footer/>
        </div>
    );
    
};

export default JobDetail;
