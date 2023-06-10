"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowBack, ArrowForward } from "@/utils/Icons";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <section className="section" aria-label="feature" id="featured">
        <div className="container">
          <Link href="/discussions" className="btn-link link:hover">
            <ArrowBack />
            <span className="span">Go back</span>
          </Link>
          <div
            className="jobDescription"
            style={{
              gap: "1rem",
              width: "480px",
              position: "relative",
            }}
          >
            <div>
              <h2>Something went wrong!</h2>
              <button
                className="btn"
                onClick={
                  // Attempt to recover by trying to re-render the segment
                  () => reset()
                }
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
