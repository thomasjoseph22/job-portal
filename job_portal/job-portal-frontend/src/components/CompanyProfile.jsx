import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompanyNavbar from './CompanyNavbar'; // Adjust the import path as necessary
import Footer from './Footer';
import { Link } from 'react-router-dom';

const CompanyProfile = () => {
    const [companyData, setCompanyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        company_name: '',
        name: '',
        email: '',
        phone_number: '',
        position: '',
        username: '',
        first_name: '',
        last_name: ''
    });
    const [passwordData, setPasswordData] = useState({
        old_password: '',
        new_password: '',
        confirm_password: '',
    });
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [profileSuccess, setProfileSuccess] = useState('');
    const [modalVisible, setModalVisible] = useState(false); 
    const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
    const accessToken = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchCompanyData = async () => {
            if (accessToken) {
                try {
                    const response = await axios.get('http://localhost:8000/accounts/api/user-details/', {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });
                    setCompanyData(response.data);
                    setFormData(response.data);
                } catch (error) {
                    console.error('Error fetching company profile:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchCompanyData();
    }, [accessToken]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (accessToken) {
            try {
                const response = await axios.put('http://localhost:8000/accounts/api/applicant-details/', formData, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                setCompanyData(response.data);
                setProfileSuccess('Profile updated successfully!');
                closeEditProfileModal();
                window.location.reload();
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (passwordData.new_password !== passwordData.confirm_password) {
            setPasswordError('New passwords do not match.');
            return;
        }
        setPasswordError('');

        try {
            await axios.put('http://localhost:8000/accounts/api/update-password/', passwordData, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setPasswordSuccess('Password updated successfully!');
            setPasswordData({ old_password: '', new_password: '', confirm_password: '' });
        } catch (error) {
            console.error('Error updating password:', error);
            setPasswordError('Failed to update password. Please try again.');
        }
    };

    const openModal = () => {
        setModalVisible(true);
        setPasswordError('');
        setPasswordSuccess('');
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const openEditProfileModal = () => {
        setEditProfileModalVisible(true);
        setProfileSuccess('');
    };

    const closeEditProfileModal = () => {
        setEditProfileModalVisible(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!companyData) {
        return <div>No company data found.</div>;
    }

    return (
        <div>
        <CompanyNavbar/>
        <div style={mainContainerStyle}>
            <div style={profileContainerStyle}> 
                <h1 style={headerStyle}>Company Profile</h1>
                {companyData.company_profile_image && (
                    <img
                        src={`http://localhost:8000${companyData.company_profile_image}`}
                        alt="Company Logo"
                        style={logoStyle}
                    />
                )}
                <div style={textContainerStyle}>
                    <p><strong>Company Name:</strong> {companyData.company_name}</p>
                    <p><strong>Name:</strong> {companyData.name}</p>
                    <p><strong>Email:</strong> {companyData.email}</p>
                    <p><strong>Phone Number:</strong> {companyData.phone_number}</p>
                    <p><strong>Position:</strong> {companyData.position}</p>
                    <p><strong>Username:</strong> {companyData.username}</p>
                    <p><strong>First Name:</strong> {companyData.first_name}</p>
                    <p><strong>Last Name:</strong> {companyData.last_name}</p>
                    <button onClick={openEditProfileModal} style={buttonStyle}>Edit Profile</button>
                    <button onClick={openModal} style={{ ...buttonStyle, marginLeft: '10px' }}>Update Password</button>
                </div>
            </div>

            {/* Modal for Password Update */}
            {modalVisible && (
                <div style={modalStyle}>
                    <div style={modalContentStyle}>
                        <h2 style={{ fontWeight: 'bold' }}>Update Password</h2>
                        <form onSubmit={handleUpdatePassword}>
                            <label style={{ fontWeight: 'bold' }}>
                                Old Password:
                                <input
                                    type="password"
                                    name="old_password"
                                    value={passwordData.old_password}
                                    onChange={handlePasswordInputChange}
                                    required
                                />
                            </label>
                            <br />
                            <label style={{ fontWeight: 'bold' }}>
                                New Password:
                                <input
                                    type="password"
                                    name="new_password"
                                    value={passwordData.new_password}
                                    onChange={handlePasswordInputChange}
                                    required
                                />
                            </label>
                            <br />
                            <label style={{ fontWeight: 'bold' }}>
                                Confirm New Password:
                                <input
                                    type="password"
                                    name="confirm_password"
                                    value={passwordData.confirm_password}
                                    onChange={handlePasswordInputChange}
                                    required
                                />
                            </label>
                            <br />
                            <button type="submit" style={buttonStyle}>Update Password</button>
                            <button type="button" onClick={closeModal} style={{ ...buttonStyle, marginLeft: '10px' }}>Cancel</button>
                        </form>
                        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                        {passwordSuccess && <p style={{ color: 'green' }}>{passwordSuccess}</p>}
                    </div>
                </div>
            )}

            {/* Modal for Edit Profile */}
            {editProfileModalVisible && (
                <div style={modalStyle}>
                    <div style={modalContentStyle}>
                        <h2 style={{ fontWeight: 'bold' }}>Edit Profile</h2>
                        <form onSubmit={handleUpdateProfile}>
                            <label style={{ fontWeight: 'bold' }}>Company Name: <input type="text" name="company_name" value={formData.company_name} onChange={handleInputChange} required /></label>
                            <br />
                            <label style={{ fontWeight: 'bold' }}>Name: <input type="text" name="name" value={formData.name} onChange={handleInputChange} required /></label>
                            <br />
                            <label style={{ fontWeight: 'bold' }}>Email: <input type="email" name="email" value={formData.email} onChange={handleInputChange} required /></label>
                            <br />
                            <label style={{ fontWeight: 'bold' }}>Phone Number: <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleInputChange} required /></label>
                            <br />
                            <label style={{ fontWeight: 'bold' }}>Position: <input type="text" name="position" value={formData.position} onChange={handleInputChange} required /></label>
                            <br />
                            <label style={{ fontWeight: 'bold' }}>Username: <input type="text" name="username" value={formData.username} onChange={handleInputChange} required /></label>
                            <br />
                            <label style={{ fontWeight: 'bold' }}>First Name: <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} /></label>
                            <br />
                            <label style={{ fontWeight: 'bold' }}>Last Name: <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} /></label>
                            <br />
                            <button type="submit" style={buttonStyle}>Save Changes</button>
                            <button type="button" onClick={closeEditProfileModal} style={{ ...buttonStyle, marginLeft: '10px' }}>Cancel</button>
                        </form>
                        {profileSuccess && <p style={{ color: 'green' }}>{profileSuccess}</p>}
                    </div>
                </div>
            )}
        </div>
        <Footer/>
        </div>
        
    );
};

// Inline Styles
const mainContainerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundImage: 'url("https://media.licdn.com/dms/image/D4D16AQGQltCKyaMvlw/profile-displaybackgroundimage-shrink_350_1400/0/1688700631257?e=1700092800&v=beta&t=QG_8PSuDeHRnCG4FnCS37xAF7dfWivC5mhmXuFSn2sI")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#333',
};

const profileContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
};

const headerStyle = {
    fontSize: '24px',
    marginBottom: '20px',
    fontWeight: 'bold',
};

const textContainerStyle = {
    textAlign: 'left',
    fontSize: '18px',
};

const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const logoStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '20px',
};

const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '400px',
};

export default CompanyProfile;
