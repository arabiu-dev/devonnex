import React from "react";
import { CallOutline } from "../../utils/Icons";

function Contact() {
  return (
    <section className="section contact" aria-label="contact">
      <div className="container">
        <h2 className="headline-md section-title text-center">
          Have Question ? Get in touch!
        </h2>

        <p className="body-md section-text text-center">
          Get in touch with our team for any inquiries, collaborations, or
          questions about our freelance services. We are here to assist you
          promptly and provide the information you need.
        </p>

        <a href="#" className="btn btn-primary">
          <CallOutline />

          <span className="span">Contact us</span>
        </a>
      </div>
    </section>
  );
}

export default Contact;
