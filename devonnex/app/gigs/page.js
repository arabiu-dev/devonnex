import React, { Suspense } from "react";
import Link from "next/link";
import { cookies } from "next/headers"; // Import cookies
import { redirect } from "next/navigation";
import { firebaseAdmin } from "../../utils/config/firebase-admin";
import Gigs from "@/components/gigs/Gigs";
import { filterList } from "@/utils/formFields";
import Loading from "./loading";

export const metadata = {
  title: "Freelance Gigs and Jobs - Find Exciting Opportunities | Devonnex",
  description:
    "Explore a wide range of freelance gigs and jobs on Devonnex. Discover exciting opportunities to work on interesting projects and grow your career.",
};

async function GigsPage({ searchParams }) {
  try {
    const nextCookies = cookies(); // Get cookies object
    const cookie = nextCookies.get("_usertoken_"); // Find cookie
    await firebaseAdmin.auth().verifyIdToken(cookie.value);
  } catch {
    redirect("/auth/login");
  }

  return (
    <section className="section product" id="product" aria-label="product">
      <div className="container">
        <div className="title-wrapper">
          <h2 className="headline headline-2">
            <span className="span">Explore Exciting Gigs</span>
          </h2>
          <p className="section-text-posts">
            Elevate Your Experience with Remarkable Gigs.
          </p>
          <Link
            href={"/gigs/create"}
            className="btn btn-primary"
            style={{
              background: "var(--linear-gradient-2)",
            }}
            data-load-more
          >
            <span className="spiner"></span>
            <span>Create a gig</span>
          </Link>
          <ul className="filter-btn-list">
            {["All", ...filterList].map((link) => (
              <li className="filter-btn-item" key={link}>
                <Link
                  href={`/gigs?page=1&filter=${link}`}
                  className="filter-btn"
                  data-filter-btn="all"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Suspense fallback={<Loading />}>
          <Gigs searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}

export default GigsPage;
