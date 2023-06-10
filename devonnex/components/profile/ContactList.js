import React from "react";
import { MailOutline, CallOutline } from "../../utils/Icons";

function ContactList({ email, phoneNumber }) {
  return (
    <ul className="contact-list">
      <li>
        <a href="mailto:xyz@mail.com" className="contact-link icon-box">
          <MailOutline />

          <p className="text">{email}</p>
        </a>
      </li>

      <li>
        <a href="tel:00123456789" className="contact-link icon-box">
          <CallOutline />

          <p className="text">{phoneNumber}</p>
        </a>
      </li>
    </ul>
  );
}

export default ContactList;
