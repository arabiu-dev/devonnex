import React from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { TimeOutline } from "@/utils/Icons";

function PostItem({ post }) {
  return (
    <li key={post.id}>
      <div className="card feature-card">
        <figure
          className="card-banner img-holder"
          style={{ "--width": "1602", "--height": "903" }}
        >
          <Image
            src={`https://res.cloudinary.com/dqzvvp77h/image/upload/w_1602,h_903/${post.image_url}.jpg`}
            width="1602"
            height="903"
            loading="lazy"
            alt={post.title}
            className="img-cover"
          />
        </figure>

        <div className="card-content">
          <div className="card-wrapper">
            <div className="card-tag">
              {post.tags.map((tag) => (
                <a href="#" className="span hover-2" key={`${tag}`}>
                  #{tag}
                </a>
              ))}
            </div>

            <div className="wrapper">
              <TimeOutline />

              <span className="span">{post.readtime} mins read</span>
            </div>
          </div>

          <h3 className="headline headline-3">
            <Link
              href={`/discussions/post/${post.title}?postId=${post.id}`}
              className="card-title hover-2"
            >
              {post.title}
            </Link>
          </h3>

          <div className="card-wrapper">
            <div className="profile-card">
              <Image
                src={`https://res.cloudinary.com/dqzvvp77h/image/upload/w_48,h_48/${post.user.image_url}.jpg`}
                width="48"
                height="48"
                loading="lazy"
                alt="Joseph"
                className="profile-banner"
              />

              <div>
                <Link
                  href={`/account?user=${post.user.username}`}
                  className="card-title"
                >
                  {post.user.full_name}
                </Link>

                <p className="card-subtitle">
                  <small>{moment(post.created_at).format("DD MMM YYYY")}</small>
                </p>
              </div>
            </div>

            <Link
              href={`/discussions/post/${post.title}?postId=${post.id}`}
              className="card-btn"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default PostItem;
