import React from "react";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { TimeOutline } from "@/utils/Icons";

const RenderPost = (post) => {
  const { image_url, topic, title, id, paragraphs, tags, readtime } = post;
  const generateUniqueKey = () => uuidv4();

  return (
    <li key={id}>
      <div className="recent-post-card">
        <figure
          className="card-banner img-holder"
          style={{ "--width": "271px", "--height": "258px" }}
        >
          <Image
            src={`https://res.cloudinary.com/dqzvvp77h/image/upload/w_271,h_258/${image_url}.jpg`}
            width="271"
            height="258"
            loading="lazy"
            alt="Helpful Tips for Working from Home as a Freelancer"
            className="img-cover"
          />
        </figure>

        <div className="card-content">
          <Link
            href={`/discussions/post/${title}?postId=${id}`}
            className="card-badge"
          >
            {topic}
          </Link>

          <h3 className="headline headline-3 card-title">
            <Link
              href={`/discussions/post/${title}?postId=${id}`}
              className="link hover-2"
            >
              {title}
            </Link>
          </h3>

          <p className="card-text text-limit">
            {paragraphs[0].content.slice(0, 230)}...
          </p>

          <div className="card-wrapper">
            <div className="card-tag">
              {tags.map((tag) => (
                <span className="span hover-2" key={generateUniqueKey()}>
                  #{tag}
                </span>
              ))}
            </div>

            <div className="wrapper">
              <TimeOutline />

              <span className="span">{readtime} mins read</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default RenderPost;
