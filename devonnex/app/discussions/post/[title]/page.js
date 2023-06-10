import React from "react";
import PostsShowPage from "@/components/discussions/PostsShowPage";

export async function generateMetadata({ params: { title } }, parent) {
  return {
    title: `${title.split("%20").join(" ")} - Freelancer's Platform`,
    description:
      "Explore the details of the post on our freelancing platform. Get insights, find opportunities, and connect with potential clients.",
  };
}

async function PostPage({ searchParams }) {
  return <PostsShowPage searchParams={searchParams} />;
}

export default PostPage;
