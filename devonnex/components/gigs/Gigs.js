import React from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Pagination from "@/utils/pagination";
import Refresher from "../../utils/refresher";
import { Time, Location, Star, People } from "../../utils/Icons";

async function getData(page, filter) {
  const res = await fetch(
    `http://api.devonnex.tech/api/v1/gigs?page=${page}&filter=${filter}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function Gigs({ searchParams: { page, filter } }) {
  const data = await getData(page, filter);

  return (
    <>
      <ul className="package-list">
        {data.gigs.map((gig) => (
          <li key={uuidv4()}>
            <div className="package-card">
              <div className="card-content">
                <small>{gig.category}</small>
                <Link href={`/gigs/details/${gig.id}`}>
                  <h3 className="h3 card-title">{gig.title}</h3>
                </Link>
                <p className="card-text">{gig.overview}</p>
                <ul className="card-meta-list">
                  <li className="card-meta-item">
                    <div className="meta-box">
                      <Time />
                      <p className="text">{gig.duration}</p>
                    </div>
                  </li>
                  <li className="card-meta-item">
                    <div className="meta-box">
                      <People />
                      <p className="text">pax: {gig.no_of_freelancers}</p>
                    </div>
                  </li>
                  <li className="card-meta-item">
                    <div className="meta-box">
                      <Location />
                      <p className="text">{gig.location}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="card-price">
                <div className="wrapper">
                  <p className="reviews">({gig.user.rating} rating)</p>
                  <div className="card-rating">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>
                </div>
                <p className="price">
                  ${gig.payment_amount}
                  <span>/ {gig.payment_per}</span>
                </p>
                <Link
                  href={`/gigs/details/${gig.id}`}
                  className="btn btn-secondary"
                >
                  View More
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        path={"gigs"}
        current_page={data.current_page}
        total_pages={data.total_pages}
        filter={filter}
      />
      <Refresher />
    </>
  );
}

export default Gigs;
