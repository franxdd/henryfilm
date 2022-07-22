import React from "react";
import { useState } from "react";

export default function PaginadoMovies({ pelisPerPage, todasLasMovies, setCurrentPage, currentPage }) {
  const maximo = todasLasMovies / pelisPerPage;
  // const previousPage = () => {
  //   setCurrentPage(currentPage - 1);
  // };
  // const nextPage = () => {
  //   setCurrentPage(currentPage + 1);
  // };
  const onKeyDown = (e) => {
    if (e.keyCode == 13) {
      setCurrentPage(parseInt(e.target.value));
      if (
        parseInt(e.target.value < 1) ||
        parseInt(e.target.value) > Math.ceil(maximo) ||
        isNaN(parseInt(e.target.value))
      ) {
        setCurrentPage(1);
        setInput(1);
      } else {
        setCurrentPage(parseInt(e.target.value));
      }
    }
  };
  const [input, setInput] = useState(1);
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
    setInput(parseInt(input) - 1);
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    setInput(parseInt(input) + 1);
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div>
      <div>
        <button disabled={currentPage === 1 || currentPage < 1} onClick={previousPage}>
          Previus
        </button>
        <input
          onChange={(e) => onChange(e)}
          onKeyDown={(e) => onKeyDown(e)}
          name="page"
          autoComplete="off"
          value={input}
          type="number"
        />
        <button disabled={currentPage === maximo || currentPage > maximo} onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
}
