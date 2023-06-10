import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ReadOutline } from "../../utils/Icons";
import PostItem from "./PostItem";

async function getPopularPosts() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await fetch(`http://localhost:3030/api/v1/posts/popular`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function LatestPost() {
  const popularPost = await getPopularPosts();

  return (
    <section className="section feature" aria-label="posts">
      <div className="container">
        <h2 className="headline headline-2">
          <span className="span">Editor&apos;s picked</span>
        </h2>

        <p className="section-text-posts">Featured and highly rated articles</p>

        <ul className="feature-list">
          {popularPost.map((post) => (
            <PostItem post={post} key={post.id} />
          ))}
        </ul>

        <Link href="/discussions/create" className="btn btn-secondary">
          <span className="span">Publish a Post</span>

          <ReadOutline />
        </Link>
      </div>

      <Image
        src="/assets/images/shadow-3.svg"
        width="500"
        height="1500"
        loading="lazy"
        alt=""
        className="feature-bg"
      />
    </section>
  );
}

export default LatestPost;
