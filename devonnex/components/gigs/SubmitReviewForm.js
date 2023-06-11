import React from "react";
import { revalidatePath } from "next/cache";
import { SendOutline } from "@/utils/Icons";

function SubmitReviewForm({ username, gigId, id, gig_created_by, offered_to }) {
  const submitReview = async (formData) => {
    // Send review data to the server
    if (!formData.get("review")) return; // Exit if the review content is empty

    // Determine the user to whom the review is being submitted
    const to_user = offered_to === username ? gig_created_by : username;

    // Send a POST request to create the review
    const response = await fetch(`https://api.devonnex.tech/api/v1/reviews/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review: {
          content: formData.get("review"),
          gig_id: gigId,
          user_id: id,
          from_user: username,
          to_user,
        },
      }),
    });

    // Revalidate the gig details page to update the data
    revalidatePath(`/gigs/details/${gigId}`);
  };

  return (
    <form onSubmit={submitReview} className="input-wrapper comment">
      <input
        defaultValue={""}
        type="text"
        name="review"
        placeholder="Submit a review about your experience..."
        className="comment-input-field"
      />
      <button type="submit">
        <SendOutline />
      </button>
    </form>
  );
}

export default SubmitReviewForm;
