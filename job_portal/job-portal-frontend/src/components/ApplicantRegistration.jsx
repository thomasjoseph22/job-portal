import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const ApplicantRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    address: '',
    phone_number: '',
    working_or_studying: '',
    profile_image: null,
    skills: '',  // Added skills field
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'profile_image') {
      setFormData({ ...formData, profile_image: e.target.files[0] });
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
      const response = await axios.post('http://localhost:8000/accounts/register/applicant/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Registration successful:', response.data);
  
      setSuccess('Registration successful!');
      setError('');
    } catch (err) {
      console.log('Registration error:', err.response ? err.response.data : err.message);
  
      setError('Registration failed. Please check your inputs.');
      setSuccess('');
    }
  };

  return (
    <>
    <div 
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/740/287/750/true-detective-matthew-mcconaughey-double-exposure-wallpaper-preview.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    >
      <div className="row justify-content-center w-100">
        <div
          className="col-lg-6 col-md-8"
          style={{ maxWidth: '700px', width: '100%' }}
        >
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header bg-primary text-white text-center py-4">
              <h3 className="card-title">Create Your Account</h3>
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
                  <label htmlFor="first_name" className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    placeholder="Enter first name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="last_name" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    placeholder="Enter last name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder="Enter address"
                    value={formData.address}
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
                  <label htmlFor="working_or_studying" className="form-label">Working or Studying</label>
                  <input
                    type="text"
                    className="form-control"
                    name="working_or_studying"
                    placeholder="Working or Studying"
                    value={formData.working_or_studying}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="skills" className="form-label">Skills</label>
                  <input
                    type="text"
                    className="form-control"
                    name="skills"
                    placeholder="Enter skills (comma separated)"
                    value={formData.skills}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="profile_image" className="form-label">Profile Image(jpeg only)</label>
                  <input
                    type="file"
                    className="form-control"
                    name="profile_image"
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

export default ApplicantRegistration;
