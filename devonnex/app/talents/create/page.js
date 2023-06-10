import React from "react";
import CreateTalent from "@/components/talents/CreateTalent";

export const metadata = {
  title: "Create Your Talent - Offer Your Skills and Services",
  description:
    "Create your talent on our freelancing platform and offer your skills and services to clients worldwide. Showcase your expertise and attract potential clients looking for talented professionals like you.",
};

function CreateTalentPage({ searchParams }) {
  return <CreateTalent searchParams={searchParams} />;
}

export default CreateTalentPage;
