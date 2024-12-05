import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const CompanyRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    company_name: '',
    name: '',
    position: '',
    phone_number: '',
    company_profile_image: null,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'company_profile_image') {
      setFormData({ ...formData, company_profile_image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:8000/accounts/register/company/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Registration successful!');
      setError('');
    } catch (err) {
      setError('Registration failed. Please check your inputs.');
      setSuccess('');
    }
  };

  return (
    <>
    <div 
      className="container-fluid d-flex justify-content-center align-items-center"
      style={mainContainerStyle}
    >
      <div className="row justify-content-center w-100">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-primary text-white text-center py-4">
              <h3 className="card-title">Company Registration</h3>
            </div>
            <div className="card-body p-4">
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="company_name" className="form-label">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="company_name"
                    placeholder="Enter company name"
                    value={formData.company_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="position" className="form-label">Position</label>
                  <input
                    type="text"
                    className="form-control"
                    name="position"
                    placeholder="Enter your position"
                    value={formData.position}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="phone_number" className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone_number"
                    placeholder="Enter phone number"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="company_profile_image" className="form-label">Company Profile Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="company_profile_image"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
              </form>
            </div>
            <div className="card-footer text-center py-3">
  <small className="text-muted">
    Already have an account? 
    <Link to="/login" style={{ textDecoration: 'none' }}>
      Login
    </Link>
  </small>
</div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

// Inline styles for background image and container
const mainContainerStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: 'url("https://c4.wallpaperflare.com/wallpaper/740/287/750/true-detective-matthew-mcconaughey-double-exposure-wallpaper-preview.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: '20px',
};

export default CompanyRegistration;
