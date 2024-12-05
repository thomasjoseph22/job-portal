import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css'; 
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import CompanyNavbar from './CompanyNavbar';
import { Link } from 'react-router-dom';
import Footer from './Footer';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CompanyDashboard = () => {
  const [userDetails, setUserDetails] = useState({});
  const [totalJobs, setTotalJobs] = useState(0);
  const [appliedJobs, setAppliedJobs] = useState([]);
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
      } catch (error) {
        console.error('Error fetching user details:', error);
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
      }
    };

    const fetchTotalJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/jobs/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setTotalJobs(response.data.total_jobs);
      } catch (error) {
        console.error('Error fetching total jobs:', error);
      }
    };

    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/company-applied-jobs/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setAppliedJobs(response.data);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };

    fetchUserDetails();
    fetchTotalJobs();
    fetchAppliedJobs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('is_applicant');
    localStorage.removeItem('is_company');
    navigate('/login');
  };

  const baseURL = 'http://localhost:8000/';

  // Chart data configuration
  const chartData = {
    labels: ['Total Jobs', 'Applied Jobs', 'Responded Jobs'],
    datasets: [
      {
        label: 'Total Jobs',
        data: [totalJobs, appliedJobs.length, appliedJobs.filter(job => job.status === 'hired').length],
        backgroundColor: ['#3498db', '#2ecc71', '#e74c3c'],
      },
    ],
  };

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CompanyNavbar />

      <main style={{ 
        flexGrow: 1, 
        backgroundColor: '#ecf0f1', 
        padding: '20px', 
        height: 'calc(100vh - 60px)', 
        overflowY: 'auto', 
      }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        transition: 'color 0.3s ease',
    }}>
        Welcome to Company Dashboard
    </h1>
    <h2 style={{
        fontSize: '2rem',
        fontWeight: 'normal',
        color: '#3498db',
        textAlign: 'center',
        marginBottom: '40px',
        transition: 'color 0.3s ease',
    }}>
        {userDetails.company_name}
    </h2>
        
        <div className="container user" style={{ display: 'flex', alignItems: 'center', margin: '20px 0', }}>
          <div className="user-card" style={{ 
            display: 'flex', 
            height:'150px',
            width:'250px',
            alignItems: 'center', 
            padding: '10px', 
            backgroundColor: 'white', 
            borderRadius: '5px', 
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)' 
          }}>
            <figure style={{ marginRight: '10px' }}>
              <img 
                src={userDetails.company_profile_image ? `${baseURL}${userDetails.company_profile_image}` : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_10.png"} 
                alt="User" 
                style={{ borderRadius: '50%', width: '100px', height: '50px' }} 
              />
            </figure>
            <div className="user-info">
              <div className="name"><span>{userDetails.name}</span></div>
              <div className="user-role">{userDetails.position}</div>
              <div className="experience-points"><i className="fa fa-phone"></i> {userDetails.phone_number}</div>
            </div>
          </div>
          <div className="action-links" style={{ marginLeft: 'auto' }}>
            <ul style={{ listStyleType: 'none', display: 'flex', gap: '10px' }}>
              <li>
                <Link
                  to="/company-profile"
                  data-title="Edit profile"
                  style={{ color: 'green', textDecoration: 'none', fontSize: '20px' }}
                >
                  <i className="fa fa-pencil"></i>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  data-title="Sign out"
                  onClick={handleLogout}
                  style={{ color: 'red', textDecoration: 'none', fontSize: '20px' }}
                >
                  <i className="fa fa-sign-out"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

       {/* Cards Section */}
       <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
       {/* Card for Total Jobs */}
       <div className="dashboard-card" style={{
         backgroundColor: '#3498db',
         color: 'white',
         borderRadius: '10px',
         boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
         padding: '20px',
         flex: '1 1 calc(33.33% - 20px)',
         minWidth: '250px',
         textAlign: 'center',
         transition: 'transform 0.3s',
       }}>
         <h3>Total Jobs</h3>
         <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalJobs}</p>
       </div>

       {/* Card for Applied Jobs */}
       <div className="dashboard-card" style={{
         backgroundColor: '#2ecc71',
         color: 'white',
         borderRadius: '10px',
         boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
         padding: '20px',
         flex: '1 1 calc(33.33% - 20px)',
         minWidth: '250px',
         textAlign: 'center',
         transition: 'transform 0.3s',
       }}>
         <h3>Applied Jobs</h3>
         <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{appliedJobs.length}</p>
       </div>

       {/* Card for Responded to Applied Jobs */}
       <div className="dashboard-card" style={{
         backgroundColor: '#e74c3c',
         color: 'white',
         borderRadius: '10px',
         boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
         padding: '20px',
         flex: '1 1 calc(33.33% - 20px)',
         minWidth: '250px',
         textAlign: 'center',
       }}>
         <h3>Responded to Applied Jobs</h3>
         <ul style={{ listStyleType: 'none', padding: 0 }}>
           {appliedJobs
             .filter(job => job.status === 'hired')
             .map(job => (
               <li key={job.id} style={{ margin: '10px 0' }}>
                 {job.job.title} - <strong>{job.status}</strong>
               </li>
             ))}
         </ul>
       </div>
     </div>

        {/* Bar Chart Section */}
        <div style={{ marginTop: '30px', marginBottom: '15px' }}>
          <Bar 
            data={chartData} 
            options={{
              maintainAspectRatio: false,
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 10,
                },
              },
            }} 
            height={200} 
          />
        </div>
        <Footer/>
      </main>
    </div>
    
    </>
  );
};

export default CompanyDashboard;
