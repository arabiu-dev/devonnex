import React from "react";
import Pagination from "@/utils/pagination";
import TalentCard from "./TalentCard";
import Refresher from "../../utils/refresher";

async function getData(page, filter) {
  const res = await fetch(
    `https://api.devonnex.tech/api/v1/talents?page=${page}&filter=${filter}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function Talents({
  searchParams: { page, filter },
  userDetails: { id },
}) {
  const data = await getData(page, filter);

  return (
    <>
      <ul className="grid-list-promo">
        {data.talents.map((talent) => (
          <li key={talent.id}>
            <TalentCard talent={talent} id={id} />
          </li>
        ))}
      </ul>

      <Pagination
        path="talents"
        current_page={data.current_page}
        total_pages={data.total_pages}
        filter={filter}
      />
      <Refresher />
    </>
  );
}

export default Talents;
