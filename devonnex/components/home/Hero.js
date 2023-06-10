import React from "react";
import Link from "next/link";

function Hero() {
  return (
    <section className="section hero" aria-label="home">
      <div className="container">
        <h1 className="headline-lg hero-title">
          Explore a world of skilled freelancers.{" "}
          <span className="span">Connect.</span>
        </h1>
        <p className="section-text body-lg">
          Embrace the freelance community that fuels collaboration, unlocking
          endless possibilities for talented individuals to thrive together and
          achieve remarkable projects.
        </p>
        <Link href="/auth/login" className="btn">
          Get Started
        </Link>
      </div>
    </section>
  );
}

export default Hero;
