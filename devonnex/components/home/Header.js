"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  CallOutline,
  ChatboxEllipsesOutline,
  CloseOutline,
  MenuOutline,
  SearchOutline,
} from "@/utils/Icons";
import { useAuth } from "@/contexts/authContexts";
import { destroyCookie } from "nookies";

function Header() {
  const [active, setActive] = useState(false);
  const [offset, setOffset] = useState(0);
  const { currentUserDetails, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (
    ["/chats", "/auth", "create", "details", "account/setup"].some((path) =>
      pathname.includes(path)
    )
  )
    return <></>;

  const onClick = async () => {
    destroyCookie(null, "userDetails");
    destroyCookie(null, "_usertoken_");
    logout();
    setActive(false);
    router.push("/");
  };

  return (
    <>
      <header className={`header ${offset >= 200 ? "active" : ""}`} data-header>
        <div className="container">
          <div className="input-wrapper" style={{ justifySelf: "flex-start" }}>
            <input
              type="search"
              name="search"
              placeholder="Search Anything..."
              className="input-field"
            />

            <SearchOutline />
          </div>

          <a href="#" className="logo">
            Devonnex
          </a>
          {currentUserDetails ? (
            <div className="header-action" style={{ justifySelf: "flex-end" }}>
              <Link
                className="btn-icon profil-btn"
                href={`/account?user=${currentUserDetails.username}`}
                aria-label="Metalink account: Fiona doe"
              >
                <Image
                  src={`https://res.cloudinary.com/dqzvvp77h/image/upload/${currentUserDetails.image_url}.jpg`}
                  width="40"
                  height="40"
                  alt={currentUserDetails.full_name}
                  className="img-cover"
                />
              </Link>
              <Link
                className="header-action-btn"
                aria-label="user"
                href="/chats"
                style={{ marginBlock: "auto" }}
              >
                <ChatboxEllipsesOutline />
              </Link>

              <button
                className="header-action-btn"
                onClick={() => setActive((prev) => !prev)}
                aria-label="open menu"
                data-nav-toggler
              >
                <MenuOutline />
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="btn btn-primary"
              style={{
                margin: "0",
                background: "var(--linear-gradient-2)",
                justifySelf: "flex-end",
              }}
            >
              <CallOutline />

              <span className="span">Sign in</span>
            </Link>
          )}
        </div>
      </header>

      {currentUserDetails && (
        <div className={`sidebar ${active ? "active" : ""}`} data-navbar>
          <button
            className="nav-close-btn"
            aria-label="close menu"
            onClick={() => setActive((state) => !state)}
            data-nav-toggler
          >
            <CloseOutline />
          </button>

          <div className="wrapper">
            <ul className="sidebar-list">
              <li>
                <p className="sidebar-list-title">Language</p>
              </li>
              {[
                ["English", "#"],
                ["French", "#"],
                ["Arabic", "#"],
              ].map((link) => (
                <li className="navbar-item" key={link}>
                  <Link
                    href={link[1]}
                    className="navbar-link"
                    onClick={() => setActive((state) => !state)}
                    data-nav-link
                  >
                    {link[0]}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="sidebar-list">
              <li>
                <p className="sidebar-list-title">Currency</p>
              </li>
              {[
                ["USD - US Dollar", "#"],
                ["Euro", "#"],
                ["Pound", "#"],
              ].map((link) => (
                <li className="navbar-item" key={link}>
                  <Link
                    href={link[1]}
                    className="navbar-link"
                    onClick={() => setActive((state) => !state)}
                    data-nav-link
                  >
                    {link[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <nav className="navbar wrapper">
            <ul className="navbar-list">
              {[
                ["Home Page", "/"],
                ["Discussions", "/discussions?page=1&filter=All"],
                ["Gigs - Jobs", "/gigs?page=1&filter=All"],
                ["Talents", "talents?page=1&filter=All"],
              ].map((link) => (
                <li className="navbar-item" key={link}>
                  <Link
                    href={link[1]}
                    className="navbar-link"
                    onClick={() => setActive((state) => !state)}
                    data-nav-link
                  >
                    {link[0]}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="navbar-list">
              {[
                ["Profile", `/account?user=${currentUserDetails.username}`],
                ["Chats", "/chats"],
                ["Funds", "/account/funds"],
              ].map((link) => (
                <li className="navbar-item" key={link}>
                  <Link
                    href={link[1]}
                    className="navbar-link"
                    onClick={() => setActive((state) => !state)}
                    data-nav-link
                  >
                    {link[0]}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://kanbanfrenzy.netlify.app/"
                  className="navbar-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Board
                </a>
              </li>
            </ul>
          </nav>

          <ul className="contact-list" style={{ flexDirection: "column" }}>
            <li className="profile-card contact-item">
              <figure className="profile-banner img-holder">
                <Image
                  src={`https://res.cloudinary.com/dqzvvp77h/image/upload/ar_1.0,c_fill,w_250/r_max/f_auto/${currentUserDetails.image_url}.jpg`}
                  width="62"
                  height="62"
                  loading="lazy"
                  alt={currentUserDetails.full_name}
                />
              </figure>

              <div>
                <p className="card-title">{currentUserDetails.full_name}</p>

                <button
                  style={{
                    padding: "0 5px",
                    margin: "0",
                    background: "var(--linear-gradient-2)",
                  }}
                  className="btn"
                  onClick={onClick}
                >
                  <small>Sign out</small>
                </button>
              </div>
            </li>

            <li className="contact-item">
              <p>{currentUserDetails.expertise}</p>
            </li>

            <li className="contact-item">
              {" "}
              <a
                href={`mailto:${currentUserDetails.work_email}`}
                className="contact-link"
              >
                {currentUserDetails.work_email}
              </a>
            </li>
            <li className="contact-item">
              <a
                href={`tel:${currentUserDetails.phone_number}`}
                className="contact-link"
              >
                {currentUserDetails.phone_number}
              </a>
            </li>
          </ul>
        </div>
      )}

      <div
        className={`overlay ${active ? "active" : ""}`}
        onClick={() => setActive((prev) => !prev)}
        data-overlay
        data-nav-toggler
      ></div>

      <a
        href="#top"
        className={`back-to-top btn-icon ${offset >= 290 ? "active" : ""}`}
        aria-label="back to top"
        data-back-top-btn
      >
        <ArrowUp />
      </a>
    </>
  );
}

export default Header;
