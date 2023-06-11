import React from "react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import Ellipses from "@/utils/ellipses";
import ProposalSection from "./ProposalSection";

function ProposalItem({ proposal, gig, user_id }) {
  const { username, full_name } = proposal.user;
  return (
    <li className="project-item" key={proposal.id}>
      <div className="jobDescription tasks gigs">
        {gig.user_id === user_id ? (
          <Ellipses
            handlers={[
              ["Profile", `/account?user=${username}`],
              ["Interview", [username, full_name]],
              [
                "Hire!",
                [
                  [gig.id, username],
                  [gig.user.revenue - gig.payment_amount, gig.user_id],
                  [
                    proposal.user.revenue + gig.payment_amount,
                    proposal.user_id,
                  ],
                ],
              ],
            ]}
          />
        ) : (
          <Ellipses
            handlers={[
              [
                "Edit",
                `/gigs/create_edit_proporsal/${gig.id}?sectionId=${proposal.id}`,
              ],
              [
                "Delete",
                `https://api.devonnex.tech/api/v1/proporsals/${proposal.id}`,
                `/gigs/details/${gig.id}`,
              ],
            ]}
          />
        )}
        <div>
          <h3>Proposal</h3>
          {proposal.proposal_sections.map((psection) => {
            const { header, description, bullets, id } = psection;
            return (
              <React.Fragment key={id}>
                {" "}
                <ProposalSection
                  header={header}
                  description={description}
                  bullets={bullets}
                />
              </React.Fragment>
            );
          })}

          <div className="profile-card" style={{ marginTop: "2rem" }}>
            <Image
              src={`https://res.cloudinary.com/dqzvvp77h/image/upload/w_48,h_48/${gig.user.image_url}.jpg`}
              width="48"
              height="48"
              loading="lazy"
              alt={proposal.user.full_name}
              className="profile-banner"
            />

            <div>
              <Link
                href={`/account?user=${proposal.user.username}`}
                className="card-title"
              >
                {review.user.full_name}
              </Link>

              <p className="card-subtitle">
                <small>
                  {moment(proposal.created_at).format("DD MMM YYYY")}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ProposalItem;
