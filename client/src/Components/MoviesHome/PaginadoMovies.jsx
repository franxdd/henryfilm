import React from "react";
import { useState } from "react";
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from "react-icons/fa";
import "../../Styles/components/_Paginado.scss";
export default function PaginadoMovies({ pelisPerPage, todasLasMovies, setCurrentPage, currentPage }) {
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
    if (currentPage === 1 || currentPage < 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
    setInput(parseInt(input) - 1);
  };
  const nextPage = () => {
    if (currentPage >= maximo) {
      return;
    }
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
      <span className="buttonClass" disabled={currentPage === 1 || currentPage < 1} onClick={priPage}>
        <FaAngleDoubleLeft />
      </span>
      <span className="buttonClass" onClick={previousPage}>
        <FaAngleLeft />
      </span>
      <p>Página {currentPage}</p>
      <span className="buttonClass" onClick={nextPage}>
        <FaAngleRight />
      </span>
      <span className="buttonClass" disabled={currentPage === maximo || currentPage > maximo} onClick={ultPage}>
        <FaAngleDoubleRight />
      </span>
    </div>
  );
}
