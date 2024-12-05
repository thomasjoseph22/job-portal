import React from 'react';
import './Testimonials.css';
import Footer from './Footer';

const Testimonials = () => {
    const testimonials = [
        {
          quote: "Job Detective helped me find my dream job within days! The process was seamless and stress-free.",
          attribution: "QuakeV",
        },
        {
          quote: "Thanks to Job Detective, I landed a role that matches my skills perfectly. Highly recommended!",
          attribution: "SkyRider",
        },
        {
          quote: "This app has been a game-changer! I found job opportunities I never thought existed. Thanks, Job Detective!",
          attribution: "EchoFX",
        },
        {
          quote: "I couldn't have done it without Job Detective. It made finding the right job so much easier!",
          attribution: "BlazeM",
        },
        {
          quote: "A huge thank you to Job Detective for making job hunting a breeze. You made it possible!",
          attribution: "PhoenixWave",
        },
        {
          quote: "Job Detective was a true lifesaver! I secured a fantastic position in record time.",
          attribution: "MaverickOne",
        },
    ];
    

  return (
    <>
    <div className="container">
      <div className="columns">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-wrapper">
            <div className="testimonial">
              <p className="quote">"{testimonial.quote}"</p>
              <p className="attribution">- {testimonial.attribution}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Testimonials;
