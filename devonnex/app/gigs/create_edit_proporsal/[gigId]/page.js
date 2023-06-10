import React from "react";
import CreateProposal from "@/components/gigs/CreateProposal";

export const metadata = {
  title: "Create a Proposal - Freelance Gig Proposal Submission",
  description:
    "Submit your proposal for a freelance gig on our platform. Showcase your skills and experience to win the gig.",
};

function CreateProposalPage({ params, searchParams }) {
  return <CreateProposal searchParams={searchParams} params={params} />;
}

export default CreateProposalPage;
