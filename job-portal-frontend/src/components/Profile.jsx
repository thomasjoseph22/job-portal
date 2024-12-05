import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
  });
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    address: '',
    working_or_studying: '',
    profile_image: null,
    resume: null,
    skills: '',
    experience: '',
    highest_education: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const isApplicant = localStorage.getItem('is_applicant') === 'true';
    if (!isApplicant) {
      navigate('/home');
      return;
    }

    const fetchUserData = async () => {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:8000/accounts/api/applicant-details/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const text = await response.text();
      try {
        const data = JSON.parse(text); // Ensure the response is valid JSON
        setUserData(data);
        setFormData({
          ...formData,
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          phone_number: data.phone_number || '',
          address: data.address || '',
          working_or_studying: data.working_or_studying || '',
          skills: data.skills || '', // Display skills as a simple string
          experience: data.experience || '',
          highest_education: data.highest_education || '',
        });
      } catch (error) {
        console.error('Failed to parse response:', error);
        alert('Error fetching user data.');
      }
      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profile_image: e.target.files[0],
    }));
  };

  const handleResumeChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('access_token');
    const formDataToSend = new FormData();
  
    // Skills remain as a comma-separated string
    formDataToSend.append('skills', formData.skills);
  
    // Append other fields to the FormData
    Object.keys(formData).forEach((key) => {
      if (key !== 'skills') {
        // If the file inputs are null, do not append them again to avoid overwriting
        if ((key === 'profile_image' || key === 'resume') && formData[key] === null) {
          // If there's no new file uploaded, retain the previous file (skip appending)
          return;
        }
        formDataToSend.append(key, formData[key]);
      }
    });
  
    const response = await fetch('http://localhost:8000/accounts/api/applicant-details/', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formDataToSend,
    });
  
    if (response.ok) {
      const updatedData = await response.json();
      setUserData(updatedData);
      setIsEditing(false);
    } else {
      console.error('Failed to update user data:', response.status);
    }
  };
  

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('access_token');

    const response = await fetch('http://localhost:8000/accounts/api/update-password/', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordData),
    });

    if (response.ok) {
      alert('Password updated successfully.');
      setPasswordData({ old_password: '', new_password: '' });
      setIsUpdatingPassword(false);
    } else {
      const errorData = await response.json();
      alert(errorData.detail || 'Failed to update password.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Error fetching user data.</div>;
  }

  return (
    <>
      <div style={{
        background:'#f5f3ec',
        minHeight: '100vh',
        padding: '20px'
      }}>
        <h1 className="text-center" style={{ height: '10px', marginRight: '250px' }}>Profile</h1>
        <div className="container mt-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', padding: '20px' }}>

          <img
            src={userData.profile_image || 'default_image_url.png'}
            alt="Profile"
            className="rounded-circle mx-auto d-block mb-3"
            style={{ width: '300px', height: '300px' }}
          />

          <div className="mt-3">
            <h5>Personal Information</h5>
            <p><strong>First Name:</strong> {userData.first_name}</p>
            <p><strong>Last Name:</strong> {userData.last_name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone Number:</strong> {userData.phone_number}</p>
            <p><strong>Address:</strong> {userData.address}</p>
            <p><strong>Working/Studying:</strong> {userData.working_or_studying}</p>

            <p><strong>Skills:</strong> {userData.skills}</p>

            <p><strong>Experience:</strong> {userData.experience}</p>
            <p><strong>Highest Education Level:</strong> {userData.highest_education}</p>
            <button onClick={() => setIsEditing(true)} className="btn btn-warning">Edit Profile</button>
            <button onClick={() => setIsUpdatingPassword(true)} className="btn btn-info ms-2">Update Password</button>
          </div>
        </div>

        {isEditing && (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Profile</h5>
                  <button type="button" className="btn-close" onClick={() => setIsEditing(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">First Name:</label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Last Name:</label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone Number:</label>
                      <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Address:</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Working/Studying:</label>
                      <input
                        type="text"
                        name="working_or_studying"
                        value={formData.working_or_studying}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Skills (comma separated):</label>
                      <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Experience:</label>
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Highest Education Level:</label>
                      <input
                        type="text"
                        name="highest_education"
                        value={formData.highest_education}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Profile Image:</label>
                      <input
                        type="file"
                        onChange={handleImageChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Resume:</label>
                      <input
                        type="file"
                        onChange={handleResumeChange}
                        className="form-control"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Profile</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {isUpdatingPassword && (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update Password</h5>
                  <button type="button" className="btn-close" onClick={() => setIsUpdatingPassword(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Old Password:</label>
                      <input
                        type="password"
                        name="old_password"
                        value={passwordData.old_password}
                        onChange={handlePasswordChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">New Password:</label>
                      <input
                        type="password"
                        name="new_password"
                        value={passwordData.new_password}
                        onChange={handlePasswordChange}
                        className="form-control"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Password</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </>
  );
};

export default Profile;
