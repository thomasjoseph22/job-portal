import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CompanyNavbar from './CompanyNavbar'; // Import the CompanyNavbar component
import Footer from './Footer';

const Jobs = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [category, setCategory] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [experience, setExperience] = useState('');
  const [dateOfIssue, setDateOfIssue] = useState('');
  const [endDate, setEndDate] = useState('');
  const [immediateJoiner, setImmediateJoiner] = useState(false);
  const [jobImage, setJobImage] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const isCompany = localStorage.getItem('is_company');

    if (!accessToken || isCompany !== 'true') {
      navigate('/login');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/accounts/api/user-details/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setCompanyName(response.data.company_name);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', jobTitle);
    formData.append('description', jobDescription);
    formData.append('location', jobLocation);
    formData.append('category', category);
    formData.append('eligibility', eligibility);
    formData.append('experience', experience);
    formData.append('date_of_issue', dateOfIssue);
    formData.append('end_date', endDate);
    formData.append('immediate_joiner', immediateJoiner);
    formData.append('company_name', companyName);
    if (jobImage) {
      formData.append('job_image', jobImage);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/jobs/', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Job posted successfully:', response.data);
      setSuccessMessage('Successfully posted the job request.');
      setIsOpen(true);
      setTimeout(() => {
        navigate('/companydashboard');
      }, 2000);
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
   <>
   <div style={{
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/740/287/750/true-detective-matthew-mcconaughey-double-exposure-wallpaper-preview.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    overflowX: 'hidden', // Prevent horizontal overflow
  }}>
    {/* Company Navbar */}
    <CompanyNavbar />

    {/* Main Content */}
    <div style={{
      padding: '20px',
      flex: '1',
      overflowY: 'auto',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white background
      borderRadius: '10px',
    }}>
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        color: '#fff',
        textAlign: 'center',
        padding: '2rem',
        borderRadius: '10px 10px 0px 0px',
        marginBottom: '20px',
        margin: '0 auto',
        maxWidth: '600px',
        width: '90%',
      }}>
        <h2 style={{ marginBottom: '10px' }}>Welcome to Your Job Post</h2>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} style={{
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        color: '#fff', 
        borderRadius:'0px 0px 10px 10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        margin: '0 auto',
        maxWidth: '600px',
        width: '90%',
      }}>
        <h3 style={{ textAlign: 'center', color: '#2F55A4' }}>Post a New Job</h3>

        <label style={{ display: 'block', marginBottom: '10px' }}>
          Company Name:
          <input
            type="text"
            value={companyName}
            readOnly
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #2F55A4',
              outline: 'none',
              width: '100%',
              cursor: 'not-allowed',
            }}
          />
        </label>

        {/* All input fields with better styling */}
        {[ 
          { label: 'Job Title', value: jobTitle, setter: setJobTitle, type: 'text' },
          { label: 'Job Description', value: jobDescription, setter: setJobDescription, type: 'textarea' },
          { label: 'Job Location', value: jobLocation, setter: setJobLocation, type: 'text' },
          { label: 'Category', value: category, setter: setCategory, type: 'text' },
          { label: 'Eligibility', value: eligibility, setter: setEligibility, type: 'text' },
          { label: 'Experience', value: experience, setter: setExperience, type: 'text' },
          { label: 'Date of Issue', value: dateOfIssue, setter: setDateOfIssue, type: 'date' },
          { label: 'End Date', value: endDate, setter: setEndDate, type: 'date' }
        ].map((input, index) => (
          <label key={index} style={{ display: 'block', marginBottom: '10px' }}>
            {input.label}:
            {input.type === 'textarea' ? (
              <textarea
                value={input.value}
                onChange={(e) => input.setter(e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #2F55A4',
                  outline: 'none',
                  width: '100%',
                  height: '100px',
                }}
                required
              />
            ) : (
              <input
                type={input.type}
                value={input.value}
                onChange={(e) => input.setter(e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #2F55A4',
                  outline: 'none',
                  width: '100%',
                }}
                required
              />
            )}
          </label>
        ))}

        <label style={{ display: 'block', marginBottom: '10px' }}>
          Immediate Joiner:
          <input
            type="checkbox"
            checked={immediateJoiner}
            onChange={() => setImmediateJoiner(!immediateJoiner)}
            style={{ marginLeft: '10px' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '10px' }}>
          Job Image:
          <input
            type="file"
            onChange={(e) => setJobImage(e.target.files[0])}
            accept="image/*"
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #2F55A4',
              outline: 'none',
              width: '100%',
            }}
          />
        </label>

        <button type="submit" style={{
          backgroundColor: '#2F55A4',
          color: '#fff',
          padding: '10px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%',
        }}>
          Submit
        </button>
      </form>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          zIndex: 999,
        }}>
          <h4>{successMessage}</h4>
          <button onClick={handleCloseModal} style={{
            backgroundColor: '#2F55A4',
            color: '#fff',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}>Close</button>
        </div>
      )}
    </div>

    
  </div>
  </>
  );
};

export default Jobs;
