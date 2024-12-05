import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faTwitter, faMastodon, faThreads, faFacebook } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const styles = {
    footer: {
      background: '#0d1117',
      boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.12)',
      boxSizing: 'border-box',
      width: '100%',
      textAlign: 'left',
      font: 'bold 16px sans-serif',
      padding: '55px 50px',
      color: '#fff!important',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    footerLeft: {
      flex: '1 1 40%',
      display: 'inline-block',
      verticalAlign: 'top',
    },
    footerCenter: {
      flex: '1 1 35%',
      display: 'inline-block',
      verticalAlign: 'top',
    },
    footerRight: {
      flex: '1 1 20%',
      display: 'inline-block',
      verticalAlign: 'top',
    },
    logo: {
      maxWidth: '300px',
      height: '100px',
      borderRadius: '50%',
      marginBottom: '15px',
    },
    name: {
      color: '#ffffff',
      fontSize: '36px',
      margin: 0,
    },
    jobTitle: {
      color: '#ffffff',
      margin: 0,
    },
    footerLinks: {
      color: '#ffffff',
      margin: '20px 0 12px',
      padding: 0,
    },
    footerLink: {
      display: 'inline-block',
      lineHeight: '1.8',
      fontWeight: 400,
      textDecoration: 'none',
      color: 'inherit',
      marginRight: '5px',
    },
    footerAbout: {
      lineHeight: '20px',
      color: '#92999f',
      fontSize: '13px',
      margin: 0,
    },
    footerSocials: {
      marginTop: '25px',
    },
    socialLink: {
      display: 'inline-block',
      fontSize: '35px',
      cursor: 'pointer',
      color: '#ffffff',
      textAlign: 'center',
      lineHeight: '35px',
      marginRight: '5px',
    },
  };

  return (
    <footer style={styles.footer} role="contentinfo" itemScope itemType="http://schema.org/Person">
      <div style={styles.footerLeft} itemScope itemType="http://schema.org/Person" className="h-card">
        <img
          src="https://logopond.com/logos/0521a5417079fdd5aef033c202407e4d.png"
          alt="Profile Picture"
          itemProp="image"
          style={styles.logo}
        />
        <h3 itemProp="name" style={styles.name}>Job Detective</h3>
        <p itemProp="jobTitle" style={styles.jobTitle}>Find your dream job</p>
        <nav aria-label="Footer Navigation">
          <p style={styles.footerLinks}>
            <Link to="/" itemProp="url" style={styles.footerLink} className="link-1">Home</Link>
            <Link to="/about" itemProp="url" style={styles.footerLink}>About Us</Link>
            <Link to="/testimonial" itemProp="url" style={styles.footerLink}>Testimonial</Link>
            <Link to="/contact" itemProp="url" style={styles.footerLink}>Contact</Link>
          </p>
        </nav>
        <p style={{ color: 'teal', fontSize: '14px', fontWeight: 'normal', margin: '0' }}>© 2024 Job Detective</p>
      </div>

      <div style={styles.footerCenter}>
        <div itemScope itemType="http://schema.org/PostalAddress" className="p-address">
          <p>
            <span itemProp="streetAddress" className="p-street-address">This is a Street</span>,
            <span itemProp="addressLocality" className="p-locality">A Locality</span>,
            <span itemProp="addressRegion" className="p-region">Region state</span>,
            <span itemProp="postalCode" className="p-postal-code">12345</span>
          </p>
        </div>
        <div>
          <p itemProp="telephone" className="p-tel">+91 234567890</p>
        </div>
        <div>
          <p><a href="mailto:myname@mail.com" itemProp="email" className="u-email">myname@mail.com</a></p>
        </div>
      </div>

      <div style={styles.footerRight}>
        <p style={styles.footerAbout}>
          <span style={{ display: 'block', color: '#ffffff', fontSize: '14px', fontWeight: 'bold', marginBottom: '20px' }}>About Me</span>
          Not a web developer, but have a knack for creating stunning websites and applications. Everywhere @sdavidprince
        </p>
        <div style={styles.footerSocials}>
          <a href="#" rel="me" aria-label="LinkedIn" itemProp="sameAs" style={styles.socialLink}><FontAwesomeIcon icon={faLinkedin} /></a>
          <a href="#" rel="me" aria-label="GitHub" itemProp="sameAs" style={styles.socialLink}><FontAwesomeIcon icon={faGithub} /></a>
          <a href="#" rel="me" aria-label="Twitter" itemProp="sameAs" style={styles.socialLink}><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="#" rel="me" aria-label="Mastodon" itemProp="sameAs" style={styles.socialLink}><FontAwesomeIcon icon={faMastodon} /></a>
          <a href="#" rel="me" aria-label="Threads" itemProp="sameAs" style={styles.socialLink}><FontAwesomeIcon icon={faThreads} /></a>
          <a href="#" rel="me" aria-label="Facebook" itemProp="sameAs" style={styles.socialLink}><FontAwesomeIcon icon={faFacebook} /></a>
        </div>
      </div>

      {/* Media Queries for Responsiveness */}
      <style>
        {`
          @media (max-width: 768px) {
            footer {
              padding: 30px 20px;
              flex-direction: column;
              align-items: center;
              text-align: center;
            }
            ${JSON.stringify(styles.footerLeft)} {
              flex: 1 1 100%;
              margin-bottom: 20px;
            }
            ${JSON.stringify(styles.footerCenter)} {
              flex: 1 1 100%;
              margin-bottom: 20px;
            }
            ${JSON.stringify(styles.footerRight)} {
              flex: 1 1 100%;
            }
            ${JSON.stringify(styles.footerLinks)} {
              flexDirection: 'column';
            }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
