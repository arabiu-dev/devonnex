import React from "react";
import {
  LogoBehance,
  LogoDiscord,
  LogoSlack,
  LogoTwitter,
} from "../../utils/Icons";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-top section">
          <div className="container">
            <div className="footer-brand">
              <a href="#" className="logo">
                Devonnex
              </a>

              <p className="section-text body-lg">
                Join our vibrant freelance community, fostering collaboration
                and enabling talented individuals to create remarkable projects
                together.
              </p>
            </div>

            <ul className="footer-list">
              {["Home", "About", "Market", "Trending", "Team"].map((link) => (
                <li key={link}>
                  <a href="#" className="footer-link">
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            <div className="socials-wrapper">
              <p className="h3 social-list-title">Join the Conversation</p>

              <ul className="social-list">
                <li>
                  <a href="#" className="social-link">
                    <LogoBehance />
                  </a>
                </li>

                <li>
                  <a href="#" className="social-link">
                    <LogoDiscord />
                  </a>
                </li>

                <li>
                  <a href="#" className="social-link">
                    <LogoSlack />
                  </a>
                </li>

                <li>
                  <a href="#" className="social-link">
                    <LogoTwitter />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <p className="copyright">
              Copyright Devonnex 2023. All rights reserved.
            </p>

            <ul className="footer-bottom-list">
              <li>
                <a href="#" className="footer-bottom-link">
                  Support
                </a>
              </li>

              <li>
                <a href="#" className="footer-bottom-link">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
