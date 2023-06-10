import React, { Suspense } from "react";
import Link from "next/link";
import { filterList } from "@/utils/formFields";
import { cookies } from "next/headers"; // Import cookies
import { redirect } from "next/navigation";
import { firebaseAdmin } from "../../utils/config/firebase-admin";
import Talents from "@/components/talents/Talents";
import Loading from "./loading";

export const metadata = {
  title: "Developers Talents - Find Top Freelance Developers | Devonnex",
  description:
    "Discover talented freelance developers from around the world on Devonnex. Hire experienced developers for your projects and get more done.",
};

async function TalentsPage({ searchParams }) {
  try {
    const nextCookies = cookies(); // Get cookies object
    const cookie = nextCookies.get("_usertoken_"); // Find cookie
    await firebaseAdmin.auth().verifyIdToken(cookie.value);
  } catch {
    redirect("/auth/login");
  }

  return (
    <section
      className="section discover product"
      id="product"
      aria-label="product"
    >
      <div className="container">
        <div className="title-wrapper">
          <h2 className="headline headline-2">
            <span className="span">Developer Talent Spotlight</span>
          </h2>
          <p className="section-text-posts">
            Discover exceptional developers and their remarkable skills
          </p>
          <Link
            href={"/talents/create"}
            className="btn btn-primary"
            style={{ background: "var(--linear-gradient-2)" }}
            data-load-more
          >
            <span className="spiner"></span>
            <span>Create a talent ads</span>
          </Link>
          <ul className="filter-btn-list">
            {["All", ...filterList].map((link) => (
              <li className="filter-btn-item" key={link}>
                <Link
                  href={`/talents?page=1&filter=${link}`}
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
          <Talents searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}

export default TalentsPage;
