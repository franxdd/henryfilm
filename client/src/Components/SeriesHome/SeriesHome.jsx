import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardSeries from "../CardSeries/CardSeries";
import {
  orderNameASC,
  orderNameDES,
  orderVoteAvgASC,
  orderVoteAvgDES,
  filtradoGeneroSeries,
  filtradoGeneroSeriesReversa,
  getAllSeries,
  clear,
} from "../../Redux/Actions/Actions";
import NavBar from "../NavBar/NavBar.jsx";
import Paginacion from "./PaginadoSeries";
import "../../Styles/components/_SeriesHome.scss";
import "../../Styles/components/_Filter.scss"
import {AiOutlineClear as ClearIcon} from "react-icons/ai";
import {FaWindowClose} from "react-icons/fa";

function SeriesHome() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllSeries());
  // }, []);
  let allSeries = useSelector((state) => state.allSeries);
  const generos = useSelector((state) => state.generosSeries);

  const [generosCache, setgenerosCache] = useState([]);
  const [pagina, setPagina] = useState(1);
  const porPagina = 12;
  const ultPag = pagina * porPagina;
  const priPag = ultPag - porPagina;
  let allpSeries = allSeries?.slice(priPag, ultPag);

  const maximo = allSeries?.length / porPagina;

  const FiltradoGenero = (e) => {
    let arrsetgenero = [...new Set([e.target.value, ...generosCache])];
    setgenerosCache(arrsetgenero);
    dispatch(filtradoGeneroSeries(e.target.value));
  };
  const FiltradoReversa = (g) => {
    var auxArr = generosCache.filter((fil) => fil !== g);
    dispatch(filtradoGeneroSeriesReversa(auxArr));
    setgenerosCache(auxArr);
  };
  const HandleClickClear = () => {
    setgenerosCache([]);
    // dispatch(clear('series'))
    dispatch(filtradoGeneroSeriesReversa([]));
  };

  const HandleClickASC = (e) => {
    e.preventDefault();
    dispatch(orderNameASC(allSeries));
  };
  const HandleClickDES = (e) => {
    e.preventDefault();
    dispatch(orderNameDES(allSeries));
  };
  const HandleClickVoteASC = (e) => {
    e.preventDefault();
    dispatch(orderVoteAvgASC(allSeries));
  };
  const HandleClickVoteDES = (e) => {
    e.preventDefault();
    dispatch(orderVoteAvgDES(allSeries));
  };

  return allSeries.length === 0 ? (
    <h1>LOADER</h1>
  ) : (
    <div className="filter">
    <span>Ordenar por:</span>
    <button class="cta" onClick={(e) => HandleClickASC(e)}>
    <span class="hover-underline-animation"> A - Z </span>
    </button>
    <button class="cta" onClick={(e) => HandleClickDES(e)} > 
    <span class="hover-underline-animation"> Z - A </span>
    </button>
      <button class="cta" onClick={(e) => HandleClickVoteASC(e)}>
      <span class="hover-underline-animation"> + Puntuación</span>
      </button>
      <button class="cta" onClick={(e) => HandleClickVoteDES(e)}>
      <span class="hover-underline-animation"> - Puntuación </span>
      </button>
      <span>Filtrar por:</span>
      <div className="Selects">
        <div className="select-genero">
          <select
            name="FiltroGenero"
            onChange={(e) => FiltradoGenero(e)}
            defaultValue={"Default"}
            className="selectgenero"
          >
            <option value={"Default"}>Generos..</option>
            {generos?.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <span onClick={() => HandleClickClear()}><ClearIcon className="icono-clear" /></span>

      {generosCache?.map((g) => {
        return (
          <button onClick={() => FiltradoReversa(g)}>
          {" "}
          {g} <FaWindowClose/>
        </button>
        );
      })}

      <div className="contenedor-seccion">
        <div className="contenedor-resultados">
          {allpSeries.map((e) => {
            return (
              <CardSeries
                key={e.id}
                id={e.id}
                name={e.name}
                poster={e.posterImagen}
              />
            );
          })}
        </div>
      </div>
      <div className="containerPag">
        <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
      </div>
    </div>
  );
}
export default SeriesHome;
