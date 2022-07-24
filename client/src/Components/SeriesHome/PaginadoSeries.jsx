import { React, useState } from "react";
import { FaAngleLeft, FaAngleRight} from "react-icons/fa";

function Paginacion({ pagina, setPagina, maximo }) {
  const [input, setInput] = useState(1);
  const previousPage = () => {
    setPagina(pagina - 1);
    setInput(parseInt(input) - 1);
  };
  const nextPage = () => {
    setPagina(pagina + 1);
    setInput(parseInt(input) + 1);
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
      <button disabled={pagina === 1 || pagina < 1} onClick={previousPage}>
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
      <p> de {Math.ceil(maximo)} </p>
      <button disabled={pagina === maximo || pagina > maximo} onClick={nextPage}>
      <FaAngleRight />
      </button>
    </div>
  );
}

export default Paginacion;
