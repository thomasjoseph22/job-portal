import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CompanyNavbar from './CompanyNavbar'; // Import CompanyNavbar
import Footer from './Footer'; // Import Footer

const UpdateJob = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
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
    const [errors, setErrors] = useState({});

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

    const validateForm = () => {
        const newErrors = {};

        if (!job.title) newErrors.title = "Title is required.";
        if (!job.category) newErrors.category = "Category is required.";
        if (!job.description) newErrors.description = "Description is required.";
        if (!job.eligibility) newErrors.eligibility = "Eligibility criteria is required.";
        if (!job.experience || isNaN(job.experience)) newErrors.experience = "Valid experience (numeric) is required.";
        if (!job.date_of_issue) newErrors.date_of_issue = "Date of issue is required.";
        if (!job.end_date) newErrors.end_date = "End date is required.";
        if (job.end_date && job.date_of_issue && new Date(job.end_date) < new Date(job.date_of_issue)) {
            newErrors.end_date = "End date cannot be before date of issue.";
        }
        if (!job.location) newErrors.location = "Location is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) return;
    
        const accessToken = localStorage.getItem('access_token');
        const formData = new FormData();
    
        // Append all fields to formData
        Object.entries(job).forEach(([key, value]) => {
            if (key === 'job_image' && value instanceof File) {
                formData.append(key, value); // Append file only if it's updated
            } else if (key !== 'job_image') {
                formData.append(key, value); // Append other fields
            }
        });
    
        try {
            await axios.put(`http://localhost:8000/api/jobs/${id}/`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            alert('Job updated successfully!');
            navigate('/companydashboard'); // Navigate immediately after success
        } catch (error) {
            console.error('Error updating job:', error.response?.data || error.message);
            alert('Failed to update the job. Please try again.');
        }
    };
    
    

    return (
        <div>
            <CompanyNavbar />
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
                            {['title', 'category', 'description', 'eligibility', 'experience', 'location'].map((field) => (
                                <div className="mb-3" key={field}>
                                    <label htmlFor={field} className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                    <input
                                        type="text"
                                        id={field}
                                        name={field}
                                        value={job[field]}
                                        onChange={handleChange}
                                        className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                    />
                                    {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
                                </div>
                            ))}
                            <div className="mb-3">
                                <label htmlFor="date_of_issue" className="form-label">Date of Issue</label>
                                <input 
                                    type="date" 
                                    id="date_of_issue"
                                    name="date_of_issue" 
                                    value={job.date_of_issue} 
                                    onChange={handleChange} 
                                    className={`form-control ${errors.date_of_issue ? 'is-invalid' : ''}`}
                                />
                                {errors.date_of_issue && <div className="invalid-feedback">{errors.date_of_issue}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="end_date" className="form-label">End Date</label>
                                <input 
                                    type="date" 
                                    id="end_date"
                                    name="end_date" 
                                    value={job.end_date} 
                                    onChange={handleChange} 
                                    className={`form-control ${errors.end_date ? 'is-invalid' : ''}`}
                                />
                                {errors.end_date && <div className="invalid-feedback">{errors.end_date}</div>}
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
            <Footer />
        </div>
    );
};

export default UpdateJob;
