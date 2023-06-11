import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckmarkCircle, PersonAddOutline } from "../../utils/Icons";

async function getData() {
  const res = await fetch(`https://api.devonnex.tech/api/v1/users`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function Creators() {
  const data = await getData();
  return (
    <section className="section sellers" aria-labelledby="sellers-label">
      <div className="container">
        <h2
          className="headline-md section-title text-center"
          id="sellers-label"
        >
          Best Creators & Sellers
        </h2>

        <ul className="grid-list-promo">
          {data.map((user) => (
            <li key={user.id}>
              <div className="seller-card card">
                <figure className="card-banner">
                  <Image
                    src={`https://res.cloudinary.com/dqzvvp77h/image/upload/w_64,h_64/${user.image_url}.jpg`}
                    width="64"
                    height="64"
                    loading="lazy"
                    alt={`${user.full_name} profile`}
                  />

                  <CheckmarkCircle />
                </figure>

                <div className="card-title-wrapper">
                  <h3 className="title-sm">
                    <Link
                      href={`/account?user=${user.username}`}
                      className="link:hover"
                    >
                      {user.full_name}
                    </Link>
                  </h3>

                  <p className="user-name label-md">@{user.username}</p>
                </div>

                <button
                  className="btn-icon outline"
                  aria-label="Hire Steven Townsend"
                >
                  <PersonAddOutline />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Creators;
