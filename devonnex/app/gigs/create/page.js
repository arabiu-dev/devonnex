import React from "react";
import CreateGig from "@/components/gigs/CreateGig";

export const metadata = {
  title: "Create a Gig - Freelance Job Marketplace",
  description:
    "Find and apply for freelance gigs on our job marketplace. Create a gig and start receiving proposals from talented freelancers.",
};

function CreateGigPage({ searchParams }) {
  return <CreateGig searchParams={searchParams} />;
}

export default CreateGigPage;
