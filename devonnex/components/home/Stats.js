import React from "react";
import Image from "next/image";

function Stats() {
  return (
    <section className="stats" aria-label="statistics">
      <div className="container">
        <div className="stats-content">
          <h2 className="h2 section-title headline-md">
            Our exceptional talents span across worldwide coverage.
          </h2>

          <p className="section-text body-md">
            Discover the power of our diverse freelance community, uniting
            exceptional talents from across the globe. With a wide-reaching
            presence, we bring together top-tier professionals from various
            continents and countries, ensuring a wealth of options for
            successful collaboration.
          </p>

          <p className="section-text body-md">
            Experience the advantages of our worldwide coverage as you tap into
            a rich pool of expertise. Our global network encompasses talents
            from every corner of the globe, providing an unparalleled range of
            skills and perspectives. Join our thriving community and unlock a
            world of freelance possibilities, where the best talents from around
            the world are just a click away.
          </p>

          <ul className="stats-list">
            <li>
              <div className="stats-card bg-gray">
                <h3 className="h3 card-title">150k+</h3>

                <p className="card-text">Pepole who Have Joined</p>
              </div>
            </li>

            <li>
              <div className="stats-card bg-gray">
                <h3 className="h3 card-title">45k+</h3>

                <p className="card-text">Skilled professionals</p>
              </div>
            </li>

            <li>
              <div className="stats-card bg-gray">
                <h3 className="h3 card-title">12k+</h3>

                <p className="card-text">Successful projects</p>
              </div>
            </li>
          </ul>
        </div>

        <figure className="stats-banner">
          <Image
            src="/assets/images/stats-banner.png"
            width="797"
            height="454"
            alt="map"
            className="w-100"
          />
        </figure>
      </div>
    </section>
  );
}

export default Stats;
