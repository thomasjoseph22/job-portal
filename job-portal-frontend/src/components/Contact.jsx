import React, { useState } from 'react';
import Footer from './Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.message) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowModal(true);
    }
  };

  return (
   <>
   <section style={{ padding: '60px 0', minHeight: '100vh',background:'#f5f3ec' }}>
   <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
     {/* Contact Details */}
     <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '10px' }}>
     {/* Address */}
     <div style={{ textAlign: 'center', flex: '1 1 300px', marginBottom: '10px' }}>
       <div style={{ backgroundColor: '#071c34', padding: '30px 0' }}>
         <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: '600', marginBottom: '10px' }}>Address</h2>
         <span style={{ color: '#999999', fontSize: '16px', display: 'block' }}>1215 university, Ch 176080</span>
         <span style={{ color: '#999999', fontSize: '16px', display: 'block' }}>Chandigarh, INDIA</span>
       </div>
     </div>
     {/* Email */}
     <div style={{ textAlign: 'center', flex: '1 1 300px', marginBottom: '10px' }}>
       <div style={{ backgroundColor: '#071c34', padding: '30px 0' }}>
         <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: '600', marginBottom: '10px' }}>E-mail</h2>
         <span style={{ color: '#999999', fontSize: '16px', display: 'block' }}>jobdec@gmail.com</span>
         <span style={{ color: '#999999', fontSize: '16px', display: 'block' }}>jd@gmail.com</span>
       </div>
     </div>
     {/* Office Time */}
     <div style={{ textAlign: 'center', flex: '1 1 300px', marginBottom: '10px' }}>
       <div style={{ backgroundColor: '#071c34', padding: '30px 0' }}>
         <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: '600', marginBottom: '10px' }}>Office Time</h2>
         <span style={{ color: '#999999', fontSize: '16px', display: 'block' }}>Mon - Thu 9:00 am - 4:00 pm</span>
         <span style={{ color: '#999999', fontSize: '16px', display: 'block' }}>Fri - Mon 10:00 pm - 5:00 pm</span>
       </div>
     </div>
   </div>
   

     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
       {/* Contact Form */}
       <div style={{ flex: '1 1 100%', backgroundColor: '#f9f9f9', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
         <h2 style={{ color: '#071c34', fontSize: '22px', fontWeight: '700' }}>Get in Touch</h2>
         <form onSubmit={handleSubmit}>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
             <input 
               type="text" 
               placeholder="Your Name" 
               name="name" 
               value={formData.name} 
               onChange={handleChange} 
               style={{ padding: '12px', flex: '1 1 48%', borderRadius: '4px' }}
             />
             {errors.name && <span style={{ color: 'red', width: '100%' }}>{errors.name}</span>}
             <input 
               type="email" 
               placeholder="E-mail" 
               name="email" 
               value={formData.email} 
               onChange={handleChange} 
               style={{ padding: '12px', flex: '1 1 48%', borderRadius: '4px' }}
             />
             {errors.email && <span style={{ color: 'red', width: '100%' }}>{errors.email}</span>}
           </div>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
             <input 
               type="text" 
               placeholder="Phone Number" 
               name="phone" 
               value={formData.phone} 
               onChange={handleChange} 
               style={{ padding: '12px', flex: '1 1 48%', borderRadius: '4px' }}
             />
             {errors.phone && <span style={{ color: 'red', width: '100%' }}>{errors.phone}</span>}
             <input 
               type="text" 
               placeholder="Subject" 
               name="subject" 
               value={formData.subject} 
               onChange={handleChange} 
               style={{ padding: '12px', flex: '1 1 48%', borderRadius: '4px' }}
             />
             {errors.subject && <span style={{ color: 'red', width: '100%' }}>{errors.subject}</span>}
           </div>
           <div style={{ marginBottom: '20px' }}>
             <textarea 
               placeholder="Write Your Message" 
               name="message" 
               value={formData.message} 
               onChange={handleChange} 
               style={{ width: '100%', padding: '12px', height: '120px', borderRadius: '4px' }}
             ></textarea>
             {errors.message && <span style={{ color: 'red', width: '100%' }}>{errors.message}</span>}
           </div>
           <button type="submit" style={{ backgroundColor: '#fda40b', color: '#fff', padding: '10px', width: '150px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }}>
             Send Now
           </button>
         </form>
       </div>

       {/* Map */}
       <div style={{ flex: '1 1 100%', marginTop: '36px' }}>
         <iframe
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109741.02912911311!2d76.69348873658222!3d30.73506264436677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be66ec96b%3A0xa5ff67f9527319fe!2sChandigarh!5e0!3m2!1sen!2sin!4v1553497921355"
           width="100%"
           height="450"
           frameBorder="0"
           style={{ border: '0' }}
           allowFullScreen
           title="Map"
         ></iframe>
       </div>
     </div>
   </div>

   {/* Modal */}
   {showModal && (
     <div style={{
       position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'
     }}>
       <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '400px', textAlign: 'center' }}>
         <h3>Message Sent</h3>
         <p>Thank you for contacting us. We will get back to you shortly!</p>
         <button onClick={() => setShowModal(false)} style={{ padding: '10px 20px', backgroundColor: '#fda40b', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
           Close
         </button>
       </div>
     </div>
   )}
 </section>
 <Footer/>
   </>
  );
};

export default Contact;
