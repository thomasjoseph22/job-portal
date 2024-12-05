import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/accounts/login/', {
        username,
        password,
      });

      // Store token and user type in local storage
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('is_applicant', response.data.is_applicant);
      localStorage.setItem('is_company', response.data.is_company);

      // Determine which type of user logged in
      if (response.data.is_applicant) {
        setSuccessMessage('Successful applicant login');
        navigate('/');
        window.location.reload();
      } else if (response.data.is_company) {
        setSuccessMessage('Successful company login');
        navigate('/companydashboard'); 
      }

      setError('');
      console.log('Login successful');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      setSuccessMessage('');
      console.error('Login error:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{
        background: '#f5f3ec',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          backgroundColor: 'rgba(33, 33, 36, 0.8)', // Black transparent background
          width: '90%', // Adjust width for mobile
          maxWidth: '400px', // Set a max width for larger screens
          padding: '1.5rem',
          borderRadius: '1rem',
          boxShadow: '5px 8px 0 0 black',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly'
        }}>
          <header style={{ textAlign: 'center', color: 'white' }}>
            <h1>Login</h1>
          </header>
          <main style={{ display: 'block' }}>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  required
                  style={{
                    backgroundColor: '#3C4043',
                    width: '100%',
                    padding: '0.5rem',
                    margin: '0.5rem 0',
                    borderRadius: '0.5rem',
                    border: '1px solid black',
                    fontSize: 'large',
                    color: 'rgb(227, 227, 227)',
                  }}
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  style={{
                    backgroundColor: '#3C4043',
                    width: '100%',
                    padding: '0.5rem',
                    margin: '0.5rem 0',
                    borderRadius: '0.5rem',
                    border: '1px solid black',
                    fontSize: 'large',
                    color: 'rgb(227, 227, 227)',
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(to right, white 50%, black 50%)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: 'right bottom',
                  color: 'white',
                  padding: '0.5rem',
                  border: 'none',
                  width: '100%',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 1s ease',
                  transitionDelay: '0.2s',
                  marginTop: '1rem'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundPosition = 'left bottom';
                  e.currentTarget.style.color = 'black';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundPosition = 'right bottom';
                  e.currentTarget.style.color = 'white';
                }}
              >
                Login
              </button>
            </form>
          </main>
          <footer style={{ textAlign: 'center' }}>
          <p>
          <Link to="/register/applicant" style={{ textDecoration: 'none', color: 'white' }}>
            Looking for Job? Register
          </Link>
        </p>
        <p>
          <Link to="/register/company" style={{ textDecoration: 'none', color: 'white' }}>
            Want to Hire? Register
          </Link>
        </p>
          </footer>
          {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
          {successMessage && <div style={{ color: 'green', textAlign: 'center' }}>{successMessage}</div>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
