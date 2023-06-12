import React from "react";
import { cookies } from "next/headers"; // Import cookies
import PostsShowPage from "@/components/discussions/PostsShowPage";

export async function generateMetadata({ params: { title } }, parent) {
  return {
    title: `${title.split("%20").join(" ")} - Freelancer's Platform`,
    description:
      "Explore the details of the post on our freelancing platform. Get insights, find opportunities, and connect with potential clients.",
  };
}

async function PostPage({ searchParams }) {
  const cookie = cookies().get("userDetails");
  const user = JSON.parse(cookie.value);
  return <PostsShowPage searchParams={searchParams} userDetails={user} />;
}

export default PostPage;
