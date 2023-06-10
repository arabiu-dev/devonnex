import React from "react";
import Ellipses from "@/utils/ellipses";
import { TrendingDownOutline, TrendingUpOutline } from "../../utils/Icons";

function Revenue({ revenue, isProfileOwner }) {
  return (
    <div className="card revenue-card">
      {isProfileOwner && (
        <Ellipses
          handlers={[
            ["Withdraw", `/gigs/create?id=${""}`],
            ["Add Funds", `http://localhost:3030/api/v1/gigs/${""}`],
          ]}
        />
      )}

      <p className="card-title">Revenue</p>

      <data className="card-price" value={revenue}>
        ${revenue}
      </data>

      <p className="card-text">Last Week</p>

      <div className="divider card-divider"></div>

      <ul className="revenue-list">
        <li className="revenue-item icon-box">
          <TrendingUpOutline />

          <div>
            <data className="revenue-item-data card-title" value="15">
              {!revenue ? revenue + "%" : "15%"}
            </data>

            <p className="revenue-item-text">Prev Week</p>
          </div>
        </li>

        <li className="revenue-item icon-box">
          <TrendingDownOutline />

          <div>
            <data className="revenue-item-data card-title" value="10">
              {!revenue ? revenue + "%" : "10%"}
            </data>

            <p className="revenue-item-text">Prev Month</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Revenue;
