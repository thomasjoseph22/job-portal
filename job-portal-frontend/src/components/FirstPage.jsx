import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Footer from './Footer';
import './FirstPage.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap CSS is imported

const FirstPage = () => {
  return (
    <>
      <div style={styles.container}>
        {/* New Section with Text and Image */}
        <div style={styles.jobSearchBanner}>
          <div style={styles.textSection}>
            <h1 style={styles.jobSearchHeading}>
              Searching for a job? Can't find the right one?
            </h1>
            {/* Updated Button using Link */}
            <Link to="/home" style={styles.button}>
              Walk into your dream
            </Link>
          </div>
          <div style={styles.imageSection}>
            <img
              src="https://cdn.pixabay.com/photo/2022/12/12/03/03/working-7650053_1280.png"
              alt="Job Search"
              style={styles.image}
            />
          </div>
        </div>
      </div>

      {/* Single Image Section */}
      <div style={styles.imageContainer}>
        <img
          src="https://www.aihr.com/wp-content/uploads/Write-a-Great-Job-Advertisement-Must-Have-Elements.png"
          alt="Search Bar Illustration"
          style={styles.responsiveImage}
        />
      </div>

         {/* Single Image Section */}
         <div style={styles.imageContainer}>
         <img
           src="https://evalground.com/blog/wp-content/uploads/2017/04/What-Next_.png"
           alt="Search Bar Illustration"
           style={styles.responsiveImage}
         />
       </div>

      {/* Service Card Section */}
      <div className="projcard-container">
        <div className="projcard projcard-blue">
          <div className="projcard-innerbox">
            <img
              className="projcard-img"
              src="https://static.vecteezy.com/system/resources/previews/041/946/276/non_2x/search-bar-on-website-window-2d-linear-cartoon-object-browser-with-access-to-digital-data-isolated-line-element-white-background-information-on-internet-color-flat-spot-illustration-vector.jpg"
              alt="Cupping Therapy"
            />
            <div className="projcard-textbox">
              <div className="projcard-title">Easy to search</div>
              <div className="projcard-subtitle">
                "Effortlessly find what you're looking for."
              </div>
              <div className="projcard-bar"></div>
              <div className="projcard-description">
                With our intuitive search tools, finding the right product or service has never been easier.
              </div>
              <div className="projcard-tagbox"></div>
            </div>
          </div>
        </div>


      

        {/* Card 2 */}
        <div className="projcard projcard-red">
          <div className="projcard-innerbox">
            <img
              className="projcard-img"
              src="https://i.pinimg.com/736x/50/a7/21/50a7213b5f1644e1060b042de0aaaf17.jpg"
              alt="Energy Healing"
            />
            <div className="projcard-textbox">
              <div className="projcard-title">Verified company Profiles</div>
              <div className="projcard-subtitle">"Connecting you with trusted employers."</div>
              <div className="projcard-bar"></div>
              <div className="projcard-description">
                Explore opportunities with confidence by browsing verified company profiles.
              </div>
              <div className="projcard-tagbox"></div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="projcard projcard-green">
          <div className="projcard-innerbox">
            <img
              className="projcard-img"
              src="https://d37oebn0w9ir6a.cloudfront.net/account_16830/interview2_105e7f85646fed2c709cd9fe3492a077.png"
              alt="Guided Meditation"
            />
            <div className="projcard-textbox">
              <div className="projcard-title">1000+ jobs available</div>
              <div className="projcard-subtitle">"Your next career move is just a click away."</div>
              <div className="projcard-bar"></div>
              <div className="projcard-description">
                Discover thousands of job opportunities across various industries and locations.
              </div>
              <div className="projcard-tagbox"></div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="projcard projcard-customcolor" style={{ '--projcard-color': '#F5AF41' }}>
          <div className="projcard-innerbox">
            <img
              className="projcard-img"
              src="https://thumbs.dreamstime.com/b/stressed-cartoon-businessman-pile-papers-stressed-cartoon-businessman-pile-office-papers-documents-help-sign-125222221.jpg"
              alt="Stress Relief"
            />
            <div className="projcard-textbox">
              <div className="projcard-title">Any problems? Report</div>
              <div className="projcard-subtitle">"We are here to help you every step of the way."</div>
              <div className="projcard-bar"></div>
              <div className="projcard-description">
                Encountered an issue or need assistance? Our dedicated support team is ready to address any concerns.
              </div>
              <div className="projcard-tagbox"></div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

const styles = {
  container: {
    padding: '50px 20px',
    textAlign: 'center',
    background: '#f5f3ec',
  },
  jobSearchBanner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    marginTop: '40px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
  },
  textSection: {
    flex: 1,
    paddingRight: '20px',
  },
  jobSearchHeading: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
  },
  imageSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  button: {
    display: 'inline-block',
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  imageContainer: {
    textAlign: 'center', // Center the image container
    marginTop: '40px',   // Space above the image
  },
  responsiveImage: {
    width: '100%',       // Ensure image takes full width of the container
    height: 'auto',      // Maintain aspect ratio
    maxWidth: '900px',   // Optional: You can limit the maximum width if you want
    borderRadius: '8px', // Optional: Adding border radius for rounded corners
  },
};

export default FirstPage;
