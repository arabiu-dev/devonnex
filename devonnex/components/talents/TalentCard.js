import React from "react";
import Image from "next/image";
import Ellipses from "@/utils/ellipses";
import { CashOutline, StarOutline } from "../../utils/Icons";
import LetsTalk from "./LetsTalk";

function TalentCard({ talent, id }) {
  return (
    <div className="discover-card card">
      <div
        className="card-banner img-holder"
        style={{ "--width": "500", "--height": "500" }}
      >
        <Image
          src={`https://res.cloudinary.com/dqzvvp77h/image/upload/w_500,h_500/${talent.ads_url}.jpg`}
          width="500"
          height="500"
          loading="lazy"
          alt={talent.title}
          className="img-cover"
        />

        {talent.user.id !== id && (
          <LetsTalk talent={[talent.user.username, talent.user.full_name]} />
        )}
      </div>

      <div className="card-profile" style={{ position: "relative" }}>
        {talent.user.id === id && (
          <Ellipses
            handlers={[
              ["Edit", `/talents/create?id=${talent.id}`],
              [
                "Delete",
                `http://api.devonnex.tech/api/v1/talents/${talent.id}`,
                "/talents?pages=1&filter=All",
              ],
            ]}
          />
        )}
        <Image
          src={`https://res.cloudinary.com/dqzvvp77h/image/upload/w_32,h_32/${talent.user.image_url}.jpg`}
          width="32"
          height="32"
          loading="lazy"
          alt={`${talent.user.username} profile`}
          className="img"
        />
        <a href="#" className="link:hover">
          @{talent.user.username}
        </a>
      </div>

      <h3 className="title-sm card-title">
        <a href="#" className="link:hover">
          {talent.title}
        </a>
      </h3>

      <div className="card-meta">
        <div>
          <p>Rate</p>
          <div className="card-price">
            <span
              className="span"
              style={{ display: "flex", alignItems: "center" }}
            >
              <CashOutline />
            </span>
            <span className="span">${talent.rate} / hr</span>
          </div>
        </div>

        <div>
          <p>Review Score</p>
          <div
            className="card-price"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span className="span">
              <StarOutline />
            </span>
            <span className="span">{talent.user.rating} / 10</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TalentCard;
