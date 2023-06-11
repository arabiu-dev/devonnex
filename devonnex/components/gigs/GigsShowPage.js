import React from "react";
import { cookies } from "next/headers"; // Import cookies
import Link from "next/link";
import GigDetails from "./GigDetails";
import GigDetailsAside from "./GigDetailsAside";
import ProposalItem from "./ProposalItem";
import Refresher from "../../utils/refresher";

// Function to fetch data for a gig asynchronously
async function getData(gigId) {
  const res = await fetch(`https://api.devonnex.tech/api/v1/gigs/${gigId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// React component for displaying the Gigs Show page
async function GigsShowPage({ params: { gigId } }) {
  // Fetch the gig data
  const gig = await getData(gigId);

  // Get user details from the cookie
  const cookie = cookies().get("userDetails");
  const { username, id } = JSON.parse(cookie.value);

  // Extract user information from the gig data
  const { user } = gig;

  let proposal = undefined;
  let review = gig.reviews.find((r) => r.user.id === id);

  // Check if the current user is the gig owner
  if (gig.user_id !== id) {
    proposal = gig.proposals.find((p) => p.user_id === id);
    console.log(id);
  }

  console.log(gig.proposals[0].user.id);

  return (
    <section
      className="section recent-post post-show"
      id="recent"
      aria-labelledby="recent-label"
      style={{ paddingBlock: "0" }}
    >
      <div className="container">
        <div>
          <GigDetails gig={gig} id={id} gigId={gigId} />
        </div>

        <div className="post-aside grid-list">
          <GigDetailsAside
            gig={gig}
            review={review}
            username={username}
            user={user}
            id={id}
          />
        </div>

        <ul className="project-lists gigs">
          {/* Render proposal items based on the user's role */}
          {gig.user_id === id ? (
            <>
              {gig.proposals.map((proposal) => (
                <ProposalItem
                  key={proposal.id}
                  proposal={proposal}
                  gig={gig}
                  user_id={id}
                />
              ))}
            </>
          ) : (
            <>
              {proposal && (
                <>
                  <ProposalItem
                    key={proposal.id}
                    proposal={proposal}
                    gig={gig}
                    user_id={id}
                  />
                </>
              )}
            </>
          )}
        </ul>

        {/* Render 'Submit a proposal' link if the user is not the gig owner  */}
        {gig.user_id !== id && !proposal && gig.status !== "Hired" && (
          <Link
            href={`/gigs/create_edit_proporsal/${gigId}`}
            className="btn btn-primary"
            style={{ margin: "0 10px" }}
            data-load-more
          >
            <span className="spiner"></span>
            <span>Submit a proposal</span>
          </Link>
        )}
      </div>
      <Refresher />
    </section>
  );
}

export default GigsShowPage;
