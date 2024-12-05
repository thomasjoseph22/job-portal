import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { JobProvider } from './components/JobProvider'; // Import the JobProvider
import Navbar from './components/Navbar'; // Make sure the path to Navbar is correct
import ApplicantRegistration from './components/ApplicantRegistration';
import CompanyRegistration from './components/CompanyRegistration';
import Login from './components/Login';
import CompanyDashboard from './components/CompanyDashboard';
import Jobs from './components/Jobs';
import JobView from './components/JobView';
import JobDetail from './components/JobDetail';
import UpdateJob from './components/UpdateJob';
import HomePage from './components/HomePage';
import PostDetailsPage from './components/PostDetailsPage';
import Profile from './components/Profile';
import JobAlerts from './components/JobAlerts';
import AppliedJobsPage from './components/AppliedJobsPage';
import AdminAppliedJobsPage from './components/AdminAppliedJobsPage';
import CompanyProfile from './components/CompanyProfile';
import FirstPage from './components/FirstPage';
import About from './components/About';
import Testimonial from './components/Testimonial';
import Contact from './components/Contact'



function App() {
  const [hasUnviewedJobs, setHasUnviewedJobs] = useState(false);

  // Callback to update whether there are unviewed jobs
  const handleUnviewedJobsUpdate = (unviewed) => {
    setHasUnviewedJobs(unviewed);
  };

  return (
    <JobProvider>
      <Router>
        <Routes>
          {/* Routes with Navbar */}
          <Route 
            path="/home" 
            element={
              <>
                <Navbar hasUnviewedJobs={hasUnviewedJobs} />
                <HomePage />
              </>
            } 
          />
          <Route 
            path="/" 
            element={
              <>
                <Navbar hasUnviewedJobs={hasUnviewedJobs} />
                <FirstPage />
              </>
            } 
          />
          <Route 
            path="/publicpost/:jobId" 
            element={
              <>
                <Navbar hasUnviewedJobs={hasUnviewedJobs} />
                <PostDetailsPage />
              </>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <>
                <Navbar hasUnviewedJobs={hasUnviewedJobs} />
                <Profile />
              </>
            } 
          />
          <Route 
            path="/testimonial" 
            element={
              <>
                <Navbar hasUnviewedJobs={hasUnviewedJobs} />
                <Testimonial />
              </>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <>
                <Navbar hasUnviewedJobs={hasUnviewedJobs} />
                <Contact />
              </>
            } 
          />
          <Route 
            path="/job-alerts" 
            element={
              <>
                <Navbar hasUnviewedJobs={hasUnviewedJobs} />
                <JobAlerts onUnviewedJobsUpdate={handleUnviewedJobsUpdate} />
              </>
            } 
          />
          <Route 
            path="/about" 
            element={
              <>
                <Navbar hasUnviewedJobs={hasUnviewedJobs} />
                <About onUnviewedJobsUpdate={handleUnviewedJobsUpdate} />
              </>
            } 
          />

          <Route 
            path="/register/applicant" 
            element={
              <>
                <Navbar hasUnviewedJobs={hasUnviewedJobs} />
                <ApplicantRegistration onUnviewedJobsUpdate={handleUnviewedJobsUpdate} />
              </>
            } 
          />

          <Route 
            path="/register/company" 
            element={
              <>
                <Navbar hasUnviewedJobs={hasUnviewedJobs} />
                <CompanyRegistration onUnviewedJobsUpdate={handleUnviewedJobsUpdate} />
              </>
            } 
          />

          {/* Routes without Navbar */}
          <Route path="/applied-job" element={<AppliedJobsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/companydashboard" element={<CompanyDashboard />} />
          <Route path="/admin-appliedjobs" element={<AdminAppliedJobsPage />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobview" element={<JobView />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/jobs/update/:id" element={<UpdateJob />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
        </Routes>
      </Router>
    </JobProvider>
  );
}

export default App;
