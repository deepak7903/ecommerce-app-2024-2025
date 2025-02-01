import React from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import "../styles/About.css";

const About = () => {
  const navigate = useNavigate();
  
  return (
    <Layout title={"About us - ShopSphere"}>
      <div className="about-container">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/about.jpeg"
              alt="about us"
              className="about-image img-fluid"
            />
          </div>
          <div className="col-md-6">
            <div className="about-content">
              <h1 className="about-title">Welcome to ShopSphere</h1>
              <p className="about-description">
                Your ultimate destination for effortless shopping! We bring you a wide range 
                of quality products at unbeatable prices, ensuring a seamless and secure 
                shopping experience.
              </p>
              <div className="about-features">
                <div className="feature-item">
                  ✨ Curated Quality Products
                </div>
                <div className="feature-item">
                  🚚 Fast & Reliable Delivery
                </div>
                <div className="feature-item">
                  💫 24/7 Customer Support
                </div>
                <div className="feature-item">
                  🔒 Secure Payment Options
                </div>
              </div>
              <button 
                className="about-btn"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
