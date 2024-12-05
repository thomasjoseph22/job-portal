import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { JobContext } from './JobProvider'; // Import the context
import './Navbar.css'; // Import the shared CSS file

const CompanyNavbar = () => {
  const { unviewedJobs } = useContext(JobContext); // Access unviewed jobs from context
  const isCompany = localStorage.getItem('is_company') === 'true'; // Check if the user is a company
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State for toggling sidebar

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('is_applicant');
    localStorage.removeItem('is_company');
    window.location.href = '/'; // Redirect to home after logout
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close
  };

  if (!isCompany) {
    return null; // Do not render if not a company
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="https://logopond.com/logos/0521a5417079fdd5aef033c202407e4d.png"
          alt="Job Detective Logo"
          className="navbar-logo"
        />
        <span className="navbar-title">Job Detective</span>
      </div>
      <div className="hamburger" onClick={toggleSidebar}>
        &#9776; {/* Hamburger icon */}
      </div>
      <div className="navbar-right">
        <Link to="/companydashboard" className="navbar-link"><strong>Dashboard</strong></Link>
        <Link to="/jobs" className="navbar-link"><strong>Post Jobs</strong></Link>
        <Link to="/jobview" className="navbar-link"><strong>View Job Posts</strong></Link>
        <Link to="/admin-appliedjobs" className="navbar-link"><strong>Applied Job Post</strong></Link>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      {/* Sidebar for mobile view */}
      {isSidebarOpen && (
        <div className="sidebar">
          <Link to="/companydashboard" className="sidebar-link" onClick={toggleSidebar}><strong>Dashboard</strong></Link>
          <Link to="/jobs" className="sidebar-link" onClick={toggleSidebar}><strong>Post Jobs</strong></Link>
          <Link to="/jobview" className="sidebar-link" onClick={toggleSidebar}><strong>View Job Posts</strong></Link>
          <Link to="/admin-appliedjobs" className="sidebar-link" onClick={toggleSidebar}><strong>Applied Job Post</strong></Link>
          <button onClick={() => {handleLogout(); toggleSidebar();}} className="sidebar-button">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default CompanyNavbar;
