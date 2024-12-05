// Sidebar.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/accounts/api/user-details/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setUserDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const baseURL = 'http://localhost:8000'; 

  return (
    <aside style={{
      width: '250px',
      height: '100vh',
      position: 'fixed',
      backgroundColor: '#2c3e50',
      color: 'white',
      paddingTop: '20px',
      top: 0,
    }}>
      <header style={{ textAlign: 'center', paddingBottom: '20px' }}>
        <img
          className="profile-picture"
          src={userDetails.company_profile_image ? `${baseURL}${userDetails.company_profile_image}` : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_10.png"}
          alt="Profile"
          style={{ borderRadius: '50%', width: '80px', height: '80px' }}
        />
        <p>{userDetails.name}</p>
      </header>
      <nav className="side-navigation" style={{ padding: '0' }}>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          <li style={{ backgroundColor: '#2980b9' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '10px' }}>
              <i className="fa fa-dashboard"></i> Dashboard
            </a>
          </li>
          <li>
            <a href="/jobs" style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '10px' }}>
              <i className="fa fa-briefcase"></i> Post Jobs
            </a>
          </li>
          <li>
            <a href="#" style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '10px' }}>
              <i className="fa fa-ship"></i> Projects
            </a>
          </li>
          <li>
            <a href="#" style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '10px' }}>
              <i className="fa fa-users"></i> Users
            </a>
          </li>
          <li>
            <a href="#" style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '10px' }}>
              <i className="fa fa-comments"></i> Comments
            </a>
          </li>
          <li>
            <a href="#" style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '10px' }}>
              <i className="fa fa-area-chart"></i> Stats
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
