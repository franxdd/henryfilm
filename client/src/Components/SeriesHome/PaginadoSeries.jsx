import { React, useState } from "react";
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from "react-icons/fa";

function Paginacion({ pagina, setPagina, maximo }) {
  const [input, setInput] = useState(1);
  const previousPage = () => {
    if (pagina === 1 || pagina < 1) {
      return;
    }
    setPagina(pagina - 1);
    setInput(parseInt(input) - 1);
  };
  const nextPage = () => {
    if (pagina >= maximo) {
      return;
    }
    setPagina(pagina + 1);
    setInput(parseInt(input) + 1);
  };
  const ultPage = () => {
    setPagina(Math.ceil(maximo));
    setInput(parseInt(maximo) + 1);
  };
  const priPage = () => {
    setPagina(Math.ceil(1));
    setInput(parseInt(0) + 1);
  };
  const onKeyDown = (e) => {
    if (e.keyCode == 13) {
      setPagina(parseInt(e.target.value));
      if (
        parseInt(e.target.value < 1) ||
        parseInt(e.target.value) > Math.ceil(maximo) ||
        isNaN(parseInt(e.target.value))
      ) {
        setPagina(1);
        setInput(1);
      } else {
        setPagina(parseInt(e.target.value));
      }
    }
  };
  const onChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="contenedor-paginado">
      <span className="buttonClass" disabled={pagina === 1 || pagina < 1} onClick={priPage}>
        <FaAngleDoubleLeft />
      </span>
      <span className="buttonClass" disabled={pagina === 1 || pagina < 1} onClick={previousPage}>
        <FaAngleLeft />
      </span>
      {/* <input
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        name="page"
        autoComplete="off"
        value={input}
        min="1"
      /> */}
       <p>Página {pagina}</p>
      <span className="buttonClass"
        disabled={pagina === maximo || pagina > maximo}
        onClick={nextPage}
      >
        <FaAngleRight />
      </span>
      <span className="buttonClass"
        disabled={pagina === maximo || pagina > maximo} onClick={ultPage}>
        <FaAngleDoubleRight />
      </span>
    </div>
  );
}

export default Paginacion;
