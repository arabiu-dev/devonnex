import React from "react";

function Bio({ bio }) {
  return (
    <div className="projects">
      <div className="section-title-wrapper">
        <h3 className="card-title">Bio</h3>
      </div>
      <div className="card project-card">
        <h3 className="card-title">About Me</h3>
        <p>{bio}</p>
      </div>
    </div>
  );
}

export default Bio;
