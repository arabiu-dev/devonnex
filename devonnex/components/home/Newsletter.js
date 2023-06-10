import React from "react";
import { MailOpenOutline, DocumentTextOutline } from "../../utils/Icons";

function Newsletter() {
  return (
    <section className="section newsletter" aria-label="newsletter">
      <div className="container">
        <div className="newsletter-card">
          <div>
            <h3 className="headline-md text-center">
              Subscribe to Newsletter!
            </h3>

            <p className="body-md card-text text-center">
              Subscribe to get latest updates and information.
            </p>
          </div>

          <div className="input-wrapper">
            <input
              type="email"
              name="email_address"
              placeholder="Enter your email :"
              required
              className="input-field"
            />

            <button className="btn btn-primary">Subscribe</button>
          </div>
          <MailOpenOutline />
          <DocumentTextOutline />
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
