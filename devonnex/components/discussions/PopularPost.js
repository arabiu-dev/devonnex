import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

function PopularPost(post) {
  const { image_url, title, readtime, created_at, id } = post;

  return (
    <li key={id}>
      <div className="popular-card">
        <figure
          className="card-banner img-holder"
          style={{ "--width": "64px", "--height": "64px" }}
        >
          <Image
            src={`https://res.cloudinary.com/dqzvvp77h/image/upload/w_32,h_32/${image_url}.jpg`}
            width={64}
            height={64}
            loading="lazy"
            alt={title}
            className="img-cover"
          />
        </figure>

        <div className="card-content">
          <h4 className="headline headline-4 card-title">
            <Link
              href={`/discussions/post/${title}?postId=${id}`}
              className="link hover-2"
            >
              {title}
            </Link>
          </h4>

          <div className="warpper">
            <p className="card-subtitle">{readtime} mins read</p>

            <time className="publish-date" dateTime={created_at}>
              {moment(created_at).format("DD MMM YYYY")}
            </time>
          </div>
        </div>
      </div>
    </li>
  );
}

export default PopularPost;
