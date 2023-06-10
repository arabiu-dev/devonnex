import React from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { ArrowForward } from "../../utils/Icons";

function ProjectCard({ data }) {
  const completion = (status) => {
    switch (status) {
      case "Open":
        return 10;
      case "Interviewing":
        return 60;
      case "Hired":
        return 100;
    }
  };

  return (
    <div className="projects">
      <div className="section-title-wrapper">
        <h3 className="card-title">Gigs</h3>

        <a href="#" className="btn-link link:hover">
          <span className="span">View more</span>

          <ArrowForward />
        </a>
      </div>

      {!data ||
        (!data.length && (
          <p
            className="section-text-posts"
            style={{ textAlign: "center", margin: "0" }}
          >
            No any work history yet.
          </p>
        ))}

      <ul className="project-list has-scrollbar">
        {data &&
          data.map((gig) => (
            <li className="project-item" key={gig.id}>
              <div className="card project-card">
                <time className="card-date" dateTime="2022-04-09">
                  <small>{moment(gig.created_at).format("DD MMM YYYY")}</small>
                </time>

                <Link href={`/gigs/details/${gig.id}`}>
                  <h3 className="h3 card-title">{gig.title.slice(0, 10)}...</h3>
                </Link>

                <div className="card-badge blue">
                  <small>{gig.category}</small>
                </div>

                <p className="card-text">{gig.overview.slice(0, 10)}...</p>

                <div className="card-progress-box">
                  <div className="progress-label">
                    <span className="progress-title">Progress</span>

                    <data className="progress-data" value="75">
                      {completion(gig.status)}%
                    </data>
                  </div>

                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{
                        "--width": `${completion(gig.status)}%`,
                        "--bg": "var(--emerald)",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="card-avatar-list">
                  <div className="card-avatar-item">
                    <a href="#">
                      <Image
                        src={`https://res.cloudinary.com/dqzvvp77h/image/upload/w_32,h_32/${gig.user.image_url}.jpg`}
                        alt="John Foster"
                        width="32"
                        height="32"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ProjectCard;
