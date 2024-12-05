import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CompanyNavbar from './CompanyNavbar'; // Import CompanyNavbar
import Footer from './Footer'; // Import Footer

const UpdateJob = () => {
    const { id } = useParams(); // Get job ID from URL parameters
    const navigate = useNavigate(); // For navigation
    const [job, setJob] = useState({
        title: '',
        category: '',
        description: '',
        eligibility: '',
        experience: '',
        date_of_issue: '',
        end_date: '',
        immediate_joiner: false,
        job_image: null,
        location: '' // Add location field
    });

    useEffect(() => {
        const fetchJobDetails = async () => {
            const accessToken = localStorage.getItem('access_token');

            if (!accessToken) {
                navigate('/login'); // Redirect to login if no token is found
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8000/api/jobs/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setJob(response.data);
            } catch (error) {
                console.error('Error fetching job details:', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login'); // Redirect to login if unauthorized
                }
            }
        };

        fetchJobDetails();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setJob({
            ...job,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('access_token');

        const formData = new FormData();
        for (const key in job) {
            formData.append(key, job[key]);
        }

        try {
            await axios.put(`http://localhost:8000/api/jobs/${id}/`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data' // Important for file uploads
                }
            });
            navigate('/jobview');
            window.location.reload();
        } catch (error) {
            console.error('Error updating job:', error.response?.data || error.message);
        }
    };

    return (
       <div>
       <CompanyNavbar /> {/* Add the CompanyNavbar component */}
       <div 
       className="container" 
       style={{ 
           backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/740/287/750/true-detective-matthew-mcconaughey-double-exposure-wallpaper-preview.jpg')`, 
           backgroundSize: 'cover', 
           minHeight: '100vh', 
           minWidth: '100vw',
           display: 'flex', 
           flexDirection: 'column' 
       }}
   >
      
       <div className="flex-grow-1 d-flex justify-content-center align-items-center">
           <div className="w-75">
               <h2 className="text-center mb-4 text-white">Update Job</h2>
               <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
                   <div className="mb-3">
                       <label htmlFor="title" className="form-label">Job Title</label>
                       <input 
                           type="text" 
                           id="title"
                           name="title" 
                           value={job.title} 
                           onChange={handleChange} 
                           className="form-control" 
                           placeholder="Job Title" 
                           required 
                       />
                   </div>
                   <div className="mb-3">
                       <label htmlFor="category" className="form-label">Category</label>
                       <input 
                           type="text" 
                           id="category"
                           name="category" 
                           value={job.category} 
                           onChange={handleChange} 
                           className="form-control" 
                           placeholder="Category" 
                           required 
                       />
                   </div>
                   <div className="mb-3">
                       <label htmlFor="description" className="form-label">Description</label>
                       <textarea 
                           id="description"
                           name="description" 
                           value={job.description} 
                           onChange={handleChange} 
                           className="form-control" 
                           placeholder="Description" 
                           required 
                       />
                   </div>
                   <div className="mb-3">
                       <label htmlFor="eligibility" className="form-label">Eligibility</label>
                       <input 
                           type="text" 
                           id="eligibility"
                           name="eligibility" 
                           value={job.eligibility} 
                           onChange={handleChange} 
                           className="form-control" 
                           placeholder="Eligibility" 
                           required 
                       />
                   </div>
                   <div className="mb-3">
                       <label htmlFor="experience" className="form-label">Experience</label>
                       <input 
                           type="text" 
                           id="experience"
                           name="experience" 
                           value={job.experience} 
                           onChange={handleChange} 
                           className="form-control" 
                           placeholder="Experience" 
                           required 
                       />
                   </div>
                   <div className="mb-3">
                       <label htmlFor="location" className="form-label">Location</label>
                       <input 
                           type="text" 
                           id="location"
                           name="location" 
                           value={job.location} 
                           onChange={handleChange} 
                           className="form-control" 
                           placeholder="Location" 
                           required 
                       />
                   </div>
                   <div className="mb-3">
                       <label htmlFor="date_of_issue" className="form-label">Date of Issue</label>
                       <input 
                           type="date" 
                           id="date_of_issue"
                           name="date_of_issue" 
                           value={job.date_of_issue} 
                           onChange={handleChange} 
                           className="form-control" 
                           required 
                       />
                   </div>
                   <div className="mb-3">
                       <label htmlFor="end_date" className="form-label">End Date</label>
                       <input 
                           type="date" 
                           id="end_date"
                           name="end_date" 
                           value={job.end_date} 
                           onChange={handleChange} 
                           className="form-control" 
                           required 
                       />
                   </div>
                   <div className="form-check mb-3">
                       <input 
                           type="checkbox" 
                           id="immediate_joiner"
                           name="immediate_joiner" 
                           checked={job.immediate_joiner} 
                           onChange={handleChange} 
                           className="form-check-input" 
                       />
                       <label htmlFor="immediate_joiner" className="form-check-label">Immediate Joiner</label>
                   </div>
                   <div className="mb-3">
                       <label htmlFor="job_image" className="form-label">Job Image</label>
                       <input 
                           type="file" 
                           id="job_image"
                           name="job_image" 
                           accept="image/*"
                           onChange={handleChange} 
                           className="form-control" 
                       />
                   </div>
                   <button type="submit" className="btn btn-primary w-100">Update Job</button>
               </form>
           </div>
       </div>
   </div>
   <Footer /> {/* Add the Footer component */}
       </div>
    );
};

export default UpdateJob;
