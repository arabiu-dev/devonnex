import React, { Suspense } from "react";
import Hero from "@/components/home/Hero";
import Promo from "@/components/home/Promo";
import Stats from "@/components/home/Stats";
import Collection from "@/components/home/Collection";
import Creators from "@/components/home/Creators";
import DiscoverItems from "@/components/home/DiscoverItems";
import Questions from "@/components/home/Questions";
import Contact from "@/components/home/Contact";
import Loading from "./loading";

async function Home() {
  return (
    <>
      <main>
        <article>
          <Hero />
          <Promo />
          <Stats />
          <Collection />
          <Suspense fallback={<Loading />}>
            <DiscoverItems />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <Creators />
          </Suspense>
          <Questions />
          <Contact />
        </article>
      </main>
    </>
  );
}

export default Home;
