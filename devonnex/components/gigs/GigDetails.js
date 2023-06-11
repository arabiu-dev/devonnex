import React from "react";
import Link from "next/link";
import moment from "moment";
import Ellipses from "@/utils/ellipses";
import { v4 as uuidv4 } from "uuid";
import { ArrowBack } from "@/utils/Icons";

function GigDetails({ gig, id, gigId }) {
  const generateUniqueKey = () => uuidv4();
  return (
    <div className="jobDescription gigs">
      <Link href="/gigs?page=1&filter=All" className="btn-link link:hover">
        <ArrowBack />
        <span className="span">Go back</span>
      </Link>
      {gig.user_id === id && (
        <Ellipses
          handlers={[
            ["Edit", `/gigs/create?id=${gigId}`],
            [
              "Delete",
              `https://api.devonnex.tech/api/v1/gigs/${gigId}`,
              "/gigs?page=1&filter=All",
            ],
          ]}
        />
      )}
      <div className="jobDescriptionDetails">
        <div className="jobInfos">
          <p>{moment(gig.created_at).format("DD MMM YYYY")}</p>
          <span className="jobInfosDivider"></span>
          <p className="">Part time</p>
        </div>
        <h2 className="jobDescriptionPosition">{gig.title}</h2>
        <h4>{gig.location}</h4>
      </div>
      <div>
        <p>{gig.overview}</p>
      </div>
      {gig.sections.map((section) => (
        <div key={section.id}>
          <h3>{section.header}</h3>
          <p>{section.description}</p>
          <ul className="bullets">
            {section.bullets.map((bullet) => (
              <li key={generateUniqueKey()}>
                <span className="jobItemsDots"></span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default GigDetails;
