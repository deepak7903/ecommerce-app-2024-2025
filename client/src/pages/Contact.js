import React from "react";
import Layout from "./../components/Layout/Layout";
//import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <Layout title={"Contact us - Get in Touch"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            className="contact-image"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6">
          <div className="contact-header text-center">
            <h1>CONTACT US</h1>
          </div>
          <p className="contact-description">
            Any query and info about products? Feel free to reach out anytime. We're available 24/7 to assist you.
          </p>
          <div className="contact-info">
            <div className="contact-item">
              
              <span className="contact-text">kumardeepak0344@gmail.com</span>
            </div>
            <div className="contact-item">
              
              <span className="contact-text">7903829763</span>
            </div>
            <div className="contact-item">
              
              <span className="contact-text">7903829763 (Toll Free)</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
