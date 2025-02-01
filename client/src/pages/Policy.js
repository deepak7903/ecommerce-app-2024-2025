import React from "react";
import Layout from "./../components/Layout/Layout";
import "../styles/Policy.css";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - ShopSphere"}>
      <div className="policy-container">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/contactus.jpeg"
              alt="privacy"
              className="policy-image img-fluid"
            />
          </div>
          <div className="col-md-6">
            <div className="policy-content">
              <h1 className="policy-title">Privacy Policy</h1>
              <div className="policy-item">
                <h5>Data Collection</h5>
                <p>We collect information that you provide directly to us, including when you create an account, make a purchase, or contact us for support.</p>
              </div>
              <div className="policy-item">
                <h5>Use of Information</h5>
                <p>We use the information we collect to process your orders, personalize your shopping experience, and improve our services.</p>
              </div>
              <div className="policy-item">
                <h5>Data Protection</h5>
                <p>Your personal information is secured using industry-standard encryption and security measures.</p>
              </div>
              <div className="policy-item">
                <h5>Cookie Policy</h5>
                <p>We use cookies to enhance your browsing experience and analyze site traffic.</p>
              </div>
              <div className="policy-item">
                <h5>Third-Party Services</h5>
                <p>We may share your information with trusted third-party service providers who assist us in operating our website and serving you better.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
