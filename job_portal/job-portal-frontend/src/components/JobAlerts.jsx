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
            setUser(response.data);
            const skills = JSON.parse(response.data.skills);
            setUserSkills(skills);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        const filterJobs = () => {
            if (jobs.length > 0 && userSkills.length > 0) {
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

    const handleViewDetails = (jobId) => {
        const isApplicant = localStorage.getItem('is_applicant') === 'true';
        if (isApplicant) {
            navigate(`/publicpost/${jobId}`);
        } else {
            navigate('/login');
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
           backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/740/287/750/true-detective-matthew-mcconaughey-double-exposure-wallpaper-preview.jpg')`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           color: '#fff'
       }}
   >
       <h2 className="text-center my-4" style={{color:'black'}}>Job Alerts</h2>
       <div className="row justify-content-center">
           {filteredJobs.length > 0 ? (
               filteredJobs.map(job => (
                   <div key={job.id} className="col-auto mb-4">
                       <div className="card h-100" style={{ width: '300px', background: 'black', border: 'none',color:'white' }}>
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
                               {job.viewed ? (
                                   <button className="btn" style={{marginLeft:'75px',color:'white',background:'green'}} disabled>
                                       Viewed
                                   </button>
                               ) : (
                                   <button className="btn btn-outline-secondary " style={{background:'orange',color:'white',marginLeft:'95px'}} onClick={() => handleView(job.id)}>
                                       View
                                   </button>
                               )}
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
