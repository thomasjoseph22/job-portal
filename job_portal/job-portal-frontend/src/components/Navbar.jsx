import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { JobContext } from './JobProvider'; // Import the context
import './Navbar.css'; // Import the CSS file

const Navbar = ({ hasUnviewedJobs }) => {
  const navigate = useNavigate();
  const { unviewedJobs } = useContext(JobContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('is_applicant');
    localStorage.removeItem('is_company');
    navigate('/');
  };

  const isApplicant = localStorage.getItem('is_applicant') === 'true';

  const handleProfileClick = () => {
    if (isApplicant) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="https://logopond.com/logos/0521a5417079fdd5aef033c202407e4d.png"
          alt="Job Detective Logo"
          className="navbar-logo"
        />
        <Link to="/" className="navbar-link"><span className="navbar-title">JOB DETECTIVE</span></Link>
      </div>
      <div className="hamburger" onClick={toggleSidebar}>
        &#9776; {/* Hamburger icon */}
      </div>
      <div className="navbar-right">
        <Link to="/home" className="navbar-link">Home</Link>
        <Link to="/about" className="navbar-link">About_Us</Link>
        <Link to="/testimonial" className="navbar-link">Testimonial</Link>
        <span onClick={handleProfileClick} className="navbar-link">Profile</span>
        <div className="jobAlertsContainer">
          <Link to="/job-alerts" className="navbar-link">
            Job Alerts 
          </Link>
          {unviewedJobs > 0 && <span className="notification">{unviewedJobs}</span>} {/* Red circle notification */}
        </div>
        <Link to="/applied-job" className="navbar-link">Applied Jobs</Link>
        {isApplicant && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </div>

      {/* Sidebar for mobile view */}
      {isSidebarOpen && (
        <div className="sidebar">
          <Link to="/home" className="sidebar-link" onClick={toggleSidebar}>Home</Link>
          <span onClick={handleProfileClick} className="sidebar-link">Profile</span>
          <Link to="/job-alerts" className="sidebar-link" onClick={toggleSidebar}>Job Alerts</Link>
          <Link to="/applied-job" className="sidebar-link" onClick={toggleSidebar}>Applied Jobs</Link>
          {isApplicant && (
            <button onClick={() => {handleLogout(); toggleSidebar();}} className="sidebar-button">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
