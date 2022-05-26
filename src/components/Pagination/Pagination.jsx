import React from "react";

import "./Pagination.css";
const Pagination = ({
  charactersPerPage,
  totalCharacters,
  paginate,
  currentPage,
  previous,
  next,
}) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalCharacters / charactersPerPage); i++) {
    pageNumber.push(i);
  }
  if (totalCharacters === 0) {
    return null;
  }
  return (
    <div className="pagination_wrapper">
      <div className="pagination">
        <div className="previous" onClick={() => previous(currentPage)}>
          Previous
        </div>
        {pageNumber.map((number) => (
          <div
            className={`page_number ${
              currentPage === number ? "active" : null
            }`}
            key={number}
            onClick={() => paginate(number)}
          >
            {number}
          </div>
        ))}
        <div className="next" onClick={() => next(currentPage)}>
          Next
        </div>
      </div>
    </div>
  );
};

export default Pagination;
