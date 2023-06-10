import React from "react";
import { v4 as uuidv4 } from "uuid";

function ProposalSection({ header, description, bullets }) {
  const generateUniqueKey = () => uuidv4();
  return (
    <div>
      <h4>{header}</h4>
      <p>{description}</p>
      <ul className="bullets">
        {bullets.map((bullet) => (
          <li key={generateUniqueKey()}>
            <span className="jobItemsDots"></span>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProposalSection;
