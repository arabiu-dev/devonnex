import React from "react";
import CreatePosts from "@/components/discussions/CreatePosts";

export const metadata = {
  title: "Create a Post - Share Your Thoughts | Devonnex",
  description:
    "Create a post and share your thoughts with the Devonnex community. Engage in discussions, seek feedback, and showcase your expertise in your chosen field.",
};

function CreatePostPage({ searchParams }) {
  return <CreatePosts searchParams={searchParams} />;
}

export default CreatePostPage;
