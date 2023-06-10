import React from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowBack } from "../../utils/Icons";
import { useChat } from "@/contexts/chatContext";
import { useAuth } from "@/contexts/authContexts";

export default function Chats() {
  const { chatHistory, currentChatUser } = useChat();
  const { currentUserDetails } = useAuth();
  const router = useRouter();

  return (
    <div className="chat-board">
      {/* Go back button */}
      <Link
        href="#"
        className="btn-link link:hover"
        onClick={router.back}
        style={{
          order: "1",
          position: "absolute",
          top: "2rem",
        }}
      >
        <ArrowBack />
        <span className="span">Go back</span>
      </Link>

      <ul className="chat-list">
        {chatHistory.data.map((chat) => {
          return (
            <li key={chat.id}>
              <div className="comment-card chat-card">
                <div
                  className={`profile-card ${
                    chat.from === currentUserDetails.username ? "right" : ""
                  }`}
                >
                  <figure className="profile-banner img-holder">
                    <Image
                      src={`https://res.cloudinary.com/dqzvvp77h/image/upload/ar_1.0,c_fill,w_250/r_max/f_auto/${
                        chat.from === currentUserDetails.username
                          ? currentUserDetails.image_url
                          : currentChatUser.photo
                      }.jpg`}
                      width="42"
                      height="42"
                      loading="lazy"
                      alt={"Aminu"}
                    />
                  </figure>

                  <div>
                    <p>{chat.from}</p>

                    {/* Chat timestamp */}
                    <time className="card-date" dateTime="2022-04-15">
                      {moment
                        .utc(chat.timestamp * 1000)
                        .local()
                        .startOf("sec")
                        .fromNow()}
                    </time>
                  </div>
                </div>

                {/* Chat message */}
                <blockquote
                  style={{ color: "#fff" }}
                  className={`card-text ${
                    chat.from === currentUserDetails.username
                      ? "right-text"
                      : ""
                  }`}
                >
                  {chat.message}
                </blockquote>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
