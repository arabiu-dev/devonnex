import React from "react";
import Image from "next/image";
import {
  Flash,
  CashOutline,
  StarOutline,
  ArrowForward,
} from "../../utils/Icons";
import Link from "next/link";

async function getData() {
  const res = await fetch(
    `http://localhost:3030/api/v1/talents?page=1&filter=All`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function DiscoverItems() {
  const { talents } = await getData();

  return (
    <section className="section discover" aria-labelledby="discover-label">
      <div className="container">
        <h2
          className="headline-md section-title text-center"
          id="discover-label"
        >
          Discover Items
        </h2>

        <ul className="grid-list-promo">
          {talents.map((talent) => (
            <li key={talent.id}>
              <div className="discover-card card">
                <div
                  className="card-banner img-holder"
                  style={{ "--width": "500", "--height": "500" }}
                >
                  <Image
                    src={`https://res.cloudinary.com/dqzvvp77h/image/upload/w_500,h_500/${talent.ads_url}.jpg`}
                    width="500"
                    height="500"
                    loading="lazy"
                    alt={talent.title}
                    className="img-cover"
                  />

                  <Link href="/auth/login" className="btn btn-primary">
                    <Flash />
                    <span className="span">Let&apos;s talk</span>
                  </Link>
                </div>

                <div className="card-profile" style={{ position: "relative" }}>
                  <Image
                    src={`https://res.cloudinary.com/dqzvvp77h/image/upload/w_32,h_32/${talent.user.image_url}.jpg`}
                    width="32"
                    height="32"
                    loading="lazy"
                    alt={`${talent.user.username} profile`}
                    className="img"
                  />
                  <Link
                    href={`/account?user=${talent.user.username}`}
                    className="link:hover"
                  >
                    @{talent.user.username}
                  </Link>
                </div>

                <h3 className="title-sm card-title">
                  <a href="#" className="link:hover">
                    {talent.title}
                  </a>
                </h3>

                <div className="card-meta">
                  <div>
                    <p>Rate</p>
                    <div className="card-price" style={{}}>
                      <span className="span" style={{ paddingTop: "3px" }}>
                        <CashOutline />
                      </span>
                      <span className="span">{talent.rate}/hr</span>
                    </div>
                  </div>

                  <div>
                    <p>Review Score</p>

                    <div className="card-price" style={{}}>
                      <span className="span" style={{ paddingTop: "2px" }}>
                        <StarOutline />
                      </span>
                      <span className="span">{talent.user.rating}/10</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <a href="#" className="btn-link link:hover">
          <span className="span">Explore More</span>

          <ArrowForward />
        </a>
      </div>
    </section>
  );
}

export default DiscoverItems;
