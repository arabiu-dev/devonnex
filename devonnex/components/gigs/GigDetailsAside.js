import React from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import SubmitReviewForm from "./SubmitReviewForm";

function GigDetailsAside({ gig, review, username, user, id }) {
  return (
    <div className="card aside-card">
      {/* Gig Details */}
      <h3 className="headline aside-title">
        <span className="span">Gig Details</span>
      </h3>
      <ul className="gig-details">
        <li>
          <h5 className="card-title">Number of freelancers required:</h5>{" "}
          <p>{gig.no_of_freelancers} people</p>
        </li>
        <li>
          <h5 className="card-title">Status Currently:</h5>
          <p>{gig.status}</p>
        </li>
        <li>
          <h5 className="card-title">Gig Location:</h5>
          <p>{gig.location}</p>
        </li>
        <li>
          <h5 className="card-title">Number of Proposals:</h5>
          <p>{gig.proposals.length}</p>
        </li>
        <li>
          <h5 className="card-title">Gig was offered to:</h5>
          <p>{gig.offered_to || "None"}</p>
        </li>
      </ul>

      {/* Reviews */}
      <h3 className="headline aside-title">
        <span className="span">Reviews</span>
      </h3>

      {gig.status !== "Hired" && (
        <p style={{ textAlign: "center" }}>Revies pending till after hiring</p>
      )}
      <ul className="comment-list">
        {/* Render each review */}
        {gig.reviews.map((review) => (
          <li key={gig.id}>
            <div className="comment-card">
              <blockquote className="card-text">“{review.content}“</blockquote>

              <div className="profile-card">
                <figure className="profile-banner img-holder">
                  {/* Display user's profile image */}
                  <Image
                    src={`https://res.cloudinary.com/dqzvvp77h/image/upload/${review.user.image_url}.jpg`}
                    width="32"
                    height="32"
                    loading="lazy"
                    alt={review.user.full_name}
                  />
                </figure>

                <div>
                  <Link
                    href={`/account?user=${review.user.username}`}
                    className="card-title"
                  >
                    {review.user.full_name}
                  </Link>

                  {/* Format and display the review's creation date */}
                  <time className="card-date" dateTime={review.created_at}>
                    <small>
                      {moment(review.created_at).format("DD MMM YYYY")}
                    </small>
                  </time>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Display review submission form if conditions are met */}
      {gig.status === "Hired" &&
        !review &&
        (gig.offered_to === username || user.username === username) && (
          <>
            <SubmitReviewForm
              username={username}
              id={id}
              gigId={gig.id}
              offered_to={gig.offered_to}
              gig_created_by={user.username}
            />
          </>
        )}
    </div>
  );
}

export default GigDetailsAside;
