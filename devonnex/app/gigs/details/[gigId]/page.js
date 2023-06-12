import React from "react";
import { cookies } from "next/headers"; // Import cookies
import GigsShowPage from "@/components/gigs/GigsShowPage";

export const metadata = {
  title: "Gig Details - Freelance Gig Description and Information",
  description:
    "Explore the details of a freelance gig on our platform. Get all the information you need to decide if this gig is the right fit for you.",
};

function GigDetailPage({ params }) {
  const cookie = cookies().get("userDetails");
  const user = JSON.parse(cookie.value);
  return <GigsShowPage params={params} userDetails={user} />;
}

export default GigDetailPage;
