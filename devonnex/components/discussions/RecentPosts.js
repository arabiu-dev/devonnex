import React from "react";
import Image from "next/image";
import moment from "moment";
import { cookies } from "next/headers";
import Pagination from "@/utils/pagination";
import PopularPost from "./PopularPost";
import RenderPost from "./RenderPost";
import Refresher from "../../utils/refresher";

async function getRecentPosts(page, filter) {
  const res = await fetch(
    `http://localhost:3030/api/v1/posts?page=${page}&filter=${filter}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getRecentComments(id) {
  const res = await fetch(
    `http://localhost:3030/api/v1/user/comments?user_id=${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getUserPosts(id) {
  const res = await fetch(
    `http://localhost:3030/api/v1/user/posts?user_id=${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const RecentPosts = async ({ searchParams: { page, filter } }) => {
  const cookie = cookies().get("userDetails"); // Find cookie
  const { id } = JSON.parse(cookie.value);
  const postsData = getRecentPosts(page, filter);
  const commentsData = getRecentComments(id);
  const userPostsData = getUserPosts(id);

  const [posts, comments, userPosts] = await Promise.all([
    postsData,
    commentsData,
    userPostsData,
  ]);

  return (
    <section
      className="section recent-post"
      id="recent"
      aria-labelledby="recent-label"
    >
      <div className="container">
        <div className="post-main">
          <h2 className="headline headline-2">
            <span className="span">Recent posts</span>
          </h2>
          <p className="section-text-posts">
            Don&apos;t miss the latest discussions
          </p>
          <ul className="grid-list">{posts.posts.map(RenderPost)}</ul>
          <Pagination
            path={"discussions"}
            current_page={posts.current_page}
            total_pages={posts.total_pages}
            filter={filter}
          />
        </div>

        <div className="post-aside grid-list">
          <div className="card aside-card">
            <h3 className="headline aside-title">
              <span className="span">Your Posts</span>
            </h3>
            {!userPosts.length && (
              <p style={{ textAlign: "center" }}>
                Posts you created will appear here
              </p>
            )}
            <ul className="popular-list">{userPosts.map(PopularPost)}</ul>
          </div>

          <div className="card aside-card">
            <h3 className="headline aside-title">
              <span className="span">Last Comments</span>
            </h3>
            {!comments.length && (
              <p style={{ textAlign: "center" }}>
                Your most recent comments will appear here.
              </p>
            )}
            <ul className="comment-list">
              {comments.map((comment) => (
                <li key={comment.id}>
                  <div className="comment-card">
                    <blockquote className="card-text">
                      {comment.content}
                    </blockquote>
                    <div className="profile-card">
                      <figure className="profile-banner img-holder">
                        <Image
                          src={`https://res.cloudinary.com/dqzvvp77h/image/upload/w_32,h_32/${comment.user.image_url}.jpg`}
                          width={32}
                          height={32}
                          loading="lazy"
                          alt={comment.user.full_name}
                        />
                      </figure>
                      <div>
                        <p className="card-title">{comment.user.full_name}</p>
                        <time
                          className="card-date"
                          dateTime={comment.created_at}
                        >
                          {moment(comment.created_at).format("DD MMM YYYY")}
                        </time>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Refresher />
    </section>
  );
};

export default RecentPosts;
