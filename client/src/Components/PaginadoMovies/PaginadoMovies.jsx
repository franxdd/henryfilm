import React from "react";

export default function PaginadoMovies({ pelisPerPage, allMovies, setCurrentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allMovies / pelisPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav>
        <ul>
          {pageNumbers &&
            pageNumbers.map((number) => (
              <li key={number}>
                <a onClick={() => setCurrentPage(number)}>{number}</a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
