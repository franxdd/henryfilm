import { useState, useEffect } from "react";
import { useContext } from "react";
import Context from "../contexto/Context";

const useFetch = (url) => {
  const lenguajeSeleccionado = useContext(Context).lenguaje;
  const [resultados, setResultados] = useState([]);

  const [data, setData] = useState({});

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setResultados(data.results);
        setData(data);
      });
  }, [lenguajeSeleccionado, url]);

  return {
    resultados: resultados,
    data: data,
  };
};

export default useFetch;
