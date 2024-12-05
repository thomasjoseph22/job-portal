import React from 'react';
import './About.css'; // Assuming you want to style the page separately
import Footer from './Footer';

const About = () => {
  return (
    <>
      <div className="about-container">
        <section className="about-header">
          <h1>About Job Detective</h1>
          
          {/* Logo image between title and tagline */}
          <img 
            src="https://logopond.com/logos/0521a5417079fdd5aef033c202407e4d.png" 
            alt="Job Detective Logo" 
            className="about-logo"
          />

          <p>Your gateway to endless job opportunities</p>
        </section>

        <section className="about-mission">
          <h2>Our Mission</h2>
          <p>
            At Job Detective, our mission is to bridge the gap between job seekers and their dream careers by providing a comprehensive, user-friendly platform. We aim to empower individuals to take control of their career paths by offering verified job listings from reputable companies, personalized job recommendations, and tools to enhance their employability. Whether you're a recent graduate or an experienced professional, we strive to help you find meaningful employment opportunities that align with your skills, goals, and aspirations.
          </p>
        </section>

        <section className="about-vision">
          <h2>Our Vision</h2>
          <p>
            We envision a world where job searching is simplified, transparent, and accessible for all. By leveraging technology, we are committed to creating a job marketplace where candidates can easily connect with employers, showcase their talents, and build fulfilling careers.
          </p>
        </section>

        <section className="about-values">
          <h2>Our Values</h2>
          <ul>
            <li><strong>Empowerment:</strong> Enabling individuals to make informed career choices.</li>
            <li><strong>Integrity:</strong> Ensuring transparency with verified job listings and employer profiles.</li>
            <li><strong>Accessibility:</strong> Providing a platform that anyone can use, regardless of experience or background.</li>
            <li><strong>Innovation:</strong> Continuously improving our platform to meet the evolving needs of job seekers and employers.</li>
          </ul>
        </section>

        <section className="about-commitment">
          <h2>Our Commitment</h2>
          <p>
            Job Detective is committed to your success. Our team works tirelessly to bring you the best opportunities, real-time updates, and support throughout your job-searching journey. We believe that finding the right job should be a smooth, hassle-free experience, and we're here to help you every step of the way.
          </p>
        </section>
      </div>
      <Footer/>
    </>
  );
};

export default About;
