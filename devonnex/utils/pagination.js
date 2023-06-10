import React from "react";
import Link from "next/link";
import { ArrowBack, ArrowForward } from "./Icons";

function Pagination({ path, current_page, total_pages, filter }) {
  // Construct the query string based on the current page and filter (if any)
  const query = filter
    ? { page: current_page, filter }
    : { page: current_page };

  return (
    <nav aria-label="pagination" className="pagination">
      {/* Render previous page link if the current page is greater than 1 */}
      {current_page > 1 && (
        <Link
          href={{
            pathname: `/${path}`,
            query: { ...query, page: query.page - 1 },
          }}
          className="pagination-btn"
          aria-label="previous page"
        >
          <ArrowBack />
        </Link>
      )}

      {/* Render ellipsis (...) if the current page is greater than or equal to 3 */}
      {current_page > 3 && (
        <Link
          href={{
            pathname: `/${path}`,
            query: { ...query, page: query.page - 3 },
          }}
          className="pagination-btn"
          aria-label="more page"
        >
          ...
        </Link>
      )}

      {/* Render link for the current page */}
      <Link href={{ pathname: `/${path}`, query }} className="pagination-btn">
        {current_page}
      </Link>

      {/* Render next two page links if there are at least two more pages remaining */}
      {total_pages - current_page >= 1 && (
        <Link
          href={{
            pathname: `/${path}`,
            query: { ...query, page: query.page + 1 },
          }}
          className="pagination-btn"
        >
          {current_page + 1}
        </Link>
      )}

      {total_pages - current_page >= 2 && (
        <Link
          href={{
            pathname: `/${path}`,
            query: { ...query, page: query.page + 2 },
          }}
          className="pagination-btn"
        >
          {current_page + 2}
        </Link>
      )}

      {/* Render ellipsis (...) if there are at least three more pages remaining */}
      {total_pages - current_page >= 3 && (
        <Link
          href={{
            pathname: `/${path}`,
            query: { ...query, page: query.page + 3 },
          }}
          className="pagination-btn"
          aria-label="more page"
        >
          ...
        </Link>
      )}

      {/* Render next page link if the current page is less than the total pages */}
      {current_page < total_pages && (
        <Link
          href={{
            pathname: `/${path}`,
            query: { ...query, page: query.page + 1 },
          }}
          className="pagination-btn"
          aria-label="next page"
        >
          <ArrowForward />
        </Link>
      )}
    </nav>
  );
}

export default Pagination;
