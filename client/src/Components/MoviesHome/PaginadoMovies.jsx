import React from "react";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "./_Paginado.scss";
export default function PaginadoMovies({
  pelisPerPage,
  todasLasMovies,
  setCurrentPage,
  currentPage,
}) {
  const maximo = todasLasMovies / pelisPerPage;

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
  const ultPage = () => {
    setCurrentPage(Math.ceil(maximo));
    setInput(parseInt(maximo) + 1);
  };
  const priPage = () => {
    setCurrentPage(Math.ceil(1));
    setInput(parseInt(0) + 1);
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="contenedor-paginado">
      <button disabled={currentPage === 1 || currentPage < 1} onClick={priPage}>
        <FaAngleLeft />
      </button>
      <button
        disabled={currentPage === 1 || currentPage < 1}
        onClick={previousPage}
      >
        <FaAngleLeft />
      </button>
      <input
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        name="page"
        autoComplete="off"
        value={input}
        min="1"
      />
      <button
        disabled={currentPage === maximo || currentPage > maximo}
        onClick={nextPage}
      >
        <FaAngleRight />
      </button>
      <button
        disabled={currentPage === maximo || currentPage > maximo}
        onClick={ultPage}
      >
        <FaAngleRight />
      </button>
    </div>
  );
}
