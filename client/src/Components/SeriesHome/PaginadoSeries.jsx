import React from "react";
function Paginacion({ pagina, setPagina, maximo }) {
  const previousPage = () => {
    setPagina(pagina - 1);
  };
  const nextPage = () => {
    setPagina(pagina + 1);
  };
  return (
    <div>
      <button disabled={pagina === 1 || pagina < 1} onClick={previousPage}>
        Previus
      </button>

      <button
        disabled={pagina === maximo || pagina > maximo}
        onClick={nextPage}
      >
        Next
      </button>
    </div>
  );
}

export default Paginacion;
