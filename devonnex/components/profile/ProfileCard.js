import React from "react";
import Image from "next/image";

function ProfileCard({ image, fullName, expertise }) {
  return (
    <div className="profile-card-wrapper">
      <figure className="card-avatar">
        <Image
          src={`https://res.cloudinary.com/dqzvvp77h/image/upload/w_48,h_48/${image}.jpg`}
          alt={fullName}
          width="48"
          height="48"
        />
      </figure>

      <div>
        <p className="card-title">{fullName}</p>

        <p className="card-subtitle">{expertise}</p>
      </div>
    </div>
  );
}

export default ProfileCard;
