import React from "react";
import { cookies } from "next/headers";
import { SendOutline, ArrowBack } from "../../utils/Icons";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import Ellipses from "@/utils/ellipses";
import { Averia_Sans_Libre } from "next/font/google";
import { revalidatePath } from "next/cache";

const robo = Averia_Sans_Libre({
  subsets: ["latin"],
  weight: ["400", "300", "700"],
});

async function getData(postId) {
  const res = await fetch(`https://api.devonnex.tech/api/v1/posts/${postId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function PostsShowPage({ searchParams: { postId } }) {
  const post = await getData(postId);
  const cookie = cookies().get("userDetails");
  const { username, id } = JSON.parse(cookie.value);

  const addComment = async (formData) => {
    "use server";
    if (!formData.get("comment")) return;
    const cookie = cookies().get("userDetails");

    const res = await fetch(`https://api.devonnex.tech/api/v1/comments/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: {
          content: formData.get("comment"),
          post_id: postId,
          user_id: JSON.parse(cookie.value).id,
        },
      }),
    });
    revalidatePath(`/discussions/post/${post.title}?postId=${postId}`);
  };

  return (
    <section
      className="section recent-post post-show"
      id="recent"
      aria-labelledby="recent-label"
    >
      <div className="container">
        <div className="post-main posts-padding">
          <Link
            href="/discussions?page=1&filter=All"
            className="btn-link link:hover"
          >
            <ArrowBack />
            <span className="span">Go back</span>
          </Link>

          <div className="post-header">
            <h2 className="headline headline-3 card-title">
              <a href="#" className="link hover-2">
                {post.title}
              </a>
            </h2>

            <div className="profile-card" style={{ position: "relative" }}>
              {post.user_id === id && (
                <Ellipses
                  handlers={[
                    ["Edit", `/discussions/create?id=${postId}`],
                    [
                      "Delete",
                      `https://api.devonnex.tech/api/v1/posts/${postId}`,
                      "/discussions?page=1&filter=All",
                    ],
                  ]}
                />
              )}

              <Image
                src={`https://res.cloudinary.com/dqzvvp77h/image/upload/w_48,h_48/${post.user.image_url}.jpg`}
                width="48"
                height="48"
                loading="lazy"
                alt={post.user.full_name}
                className="profile-banner"
              />

              <div>
                <Link
                  href={`/account?user=${post.user.username}`}
                  className="card-title"
                >
                  {post.user.full_name}
                </Link>
                <time className="card-date" dateTime={post.created_at}>
                  <small>
                    <small>
                      {moment(post.created_at).format("DD MMM YYYY")}
                    </small>
                  </small>
                </time>
              </div>
            </div>
          </div>
          <figure
            className="card-banner img-holder"
            style={{ "--width": "1602", "--height": "903" }}
          >
            <Image
              src={`https://res.cloudinary.com/dqzvvp77h/image/upload/w_1602,h_903/${post.image_url}.jpg`}
              width="1602"
              height="903"
              loading="lazy"
              alt="Self-observation is the first step of inner unfolding"
              className="img-cover"
            />
          </figure>

          <p
            className={`section-text post-body ${robo.className}`}
            style={{
              textAlign: "justify",
              color: "var(--cultured)",
              maxWidth: "unset",
            }}
          >
            {post.paragraphs.map((paragraph) => (
              <span key={paragraph.id}>
                {paragraph.content}
                <br />
                <br />
              </span>
            ))}
          </p>
        </div>

        <div className="post-aside grid-list">
          <div className="card aside-card">
            <h3 className="headline aside-title">
              <span className="span">Post Comments</span>
            </h3>

            <ul className="comment-list">
              {post.comments.map((comment) => (
                <li key={comment.id}>
                  <div className="comment-card">
                    <blockquote className="card-text">
                      “{comment.content}“
                    </blockquote>

                    <div className="profile-card">
                      <figure className="profile-banner img-holder">
                        <Image
                          src={`https://res.cloudinary.com/dqzvvp77h/image/upload/w_32,h_32/${comment.user.image_url}.jpg`}
                          width="32"
                          height="32"
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

            <form action={addComment} className="input-wrapper comment">
              <input
                defaultValue={""}
                type="text"
                name="comment"
                placeholder="Your Comment..."
                className="comment-input-field"
              />
              <button type="submit">
                <SendOutline />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PostsShowPage;
