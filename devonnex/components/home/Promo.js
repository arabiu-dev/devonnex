import React from "react";
import {
  ArrowForward,
  PricetagOutline,
  ShareSocialOutline,
  ShieldCheckmarkOutline,
} from "../../utils/Icons";

function Promo() {
  return (
    <section className="section promo" aria-label="promo">
      <div className="container">
        <h2 className="headline-md section-title text-center">
          Most Trusted Freelance Community Platform.
        </h2>

        <p className="section-text body-md text-center">
          Your premier choice for freelance success: seamless connectivity,
          diverse talent pool, secure transactions, exceptional support.
        </p>

        <ul className="grid-list-promo">
          <li>
            <div className="promo-card bg-gray">
              <div className="card-icon">
                <ShareSocialOutline />
              </div>

              <h3 className="h3 card-title">Unmatched Talent</h3>

              <p className="card-text body-md">
                Discover freelancers with specialized skillsets tailored to your
                unique needs, ensuring that you have access to the right talent
                for every aspect of your project.
              </p>

              <a href="#" className="btn-link">
                <span className="span">Explore More</span>

                <ArrowForward />
              </a>
            </div>
          </li>

          <li>
            <div className="promo-card bg-gray">
              <div className="card-icon">
                <PricetagOutline />
              </div>

              <h3 className="h3 card-title">Seamless Connectivity</h3>

              <p className="card-text body-md">
                Enjoy a user-friendly platform that effortlessly connects you
                with freelancers, making collaboration and project management a
                breeze.
              </p>

              <a href="#" className="btn-link">
                <span className="span">Explore More</span>

                <ArrowForward />
              </a>
            </div>
          </li>

          <li>
            <div className="promo-card bg-gray">
              <div className="card-icon">
                <ShieldCheckmarkOutline />
              </div>

              <h3 className="h3 card-title">Trusted Security</h3>

              <p className="card-text body-md">
                Benefit from our dedicated customer support team, ensuring your
                satisfaction and providing assistance throughout your freelance
                journey
              </p>

              <a href="#" className="btn-link">
                <span className="span">Explore More</span>

                <ArrowForward />
              </a>
            </div>
          </li>
        </ul>
        <div className="discover">
          <a href="#" className="btn-link link:hover">
            <span className="span">Explore More</span>

            <ArrowForward />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Promo;
