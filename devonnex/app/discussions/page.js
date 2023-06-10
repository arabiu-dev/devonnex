import React, { Suspense } from "react";
import { cookies } from "next/headers"; // Import cookies
import { redirect } from "next/navigation";
import { firebaseAdmin } from "../../utils/config/firebase-admin";
import LatestPost from "@/components/discussions/LatestPost";
import RecentPosts from "@/components/discussions/RecentPosts";
import Loading from "./loading";

export const metadata = {
  title: "Discussions and Posts - Devonnex Community",
  description:
    "Engage in insightful discussions, share your thoughts, and stay up-to-date with the latest posts from developers around the world. Join the vibrant Devonnex community today.",
};

async function DiscussionsPage({ searchParams }) {
  try {
    const nextCookies = cookies(); // Get cookies object
    const token = nextCookies.get("_usertoken_"); // Find cookie
    await firebaseAdmin.auth().verifyIdToken(token.value);
  } catch {
    redirect("/auth/login");
  }

  // the user is authenticated!
  return (
    <>
      <Suspense fallback={<Loading />}>
        <LatestPost />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <RecentPosts searchParams={searchParams} />
      </Suspense>
    </>
  );
}
export default DiscussionsPage;
