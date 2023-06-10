import React from "react";
import Profile from "@/components/profile/Profile";

export const metadata = {
  title: "Profile - Devonnex Freelancer",
  description:
    "Manage and showcase your skills, experience, portfolio, and contact information on your Devonnex freelancer profile. Attract clients and get hired for exciting projects.",
};

function UserProfilePage({ searchParams }) {
  return <Profile searchParams={searchParams} />;
}

export default UserProfilePage;
