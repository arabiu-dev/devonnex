import React from "react";
import Image from "next/image";
import { ArrowForward, Star } from "../../utils/Icons";
import Link from "next/link";

function ReviewCard({ data, user }) {
  return (
    <div className="tasks">
      <div className="section-title-wrapper">
        <h3 className="card-title">Reviews</h3>

        <a href="#" className="btn-link link:hover">
          <span className="span">View All</span>

          <ArrowForward />
        </a>
      </div>

      {!data ||
        (!data.length && (
          <p
            className="section-text-posts"
            style={{ textAlign: "center", margin: "0" }}
          >
            No any review left for {user ? "you" : "this user"} yet.
          </p>
        ))}
      <ul className="testi-list has-scrollbar">
        {data &&
          data.map((review) => (
            <li className="testi-item" key={review.id}>
              <div className="testi-card">
                <div className="profile-wrapper">
                  <figure className="avatar">
                    <Image
                      src={`https://res.cloudinary.com/dqzvvp77h/image/upload/w_80,h_80/${review.user.image_url}.jpg`}
                      width="80"
                      height="80"
                      loading="lazy"
                      alt="Robert William"
                    />
                  </figure>

                  <div>
                    <Link href={`/account?user=${review.user.username}`}>
                      <h3 className="h4 testi-name">{review.user.full_name}</h3>
                    </Link>

                    <p className="testi-title">{review.user.expertise}</p>
                  </div>
                </div>

                <blockquote className="testi-text">
                  &quot;{review.content}&quot;
                </blockquote>

                <div className="rating-wrapper">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ReviewCard;
