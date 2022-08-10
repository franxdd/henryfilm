// import React from "react";
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
  getGenerosSeries
} from "../../Redux/Actions/Actions";
import Paginacion from "./PaginadoSeries";
import "../../Styles/components/_SeriesHome.scss";
import "../../Styles/components/_Filter.scss"
import "../../Styles/components/_Loading.scss";
import {AiOutlineClear as ClearIcon} from "react-icons/ai";
import {FaWindowClose} from "react-icons/fa";
import { VscChromeClose as CloseIcon } from "react-icons/vsc";


function SeriesHome() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenerosSeries());
  }, []);
  
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
    let notinclude = allSeries?.map(e=> e.genre_ids)
    let notinclude2 = notinclude?.map(a=> a.includes(e.target.value))
    setgenerosCache(arrsetgenero);
    dispatch(filtradoGeneroSeries(e.target.value));
    if(!notinclude2.includes(true)){
      console.log("entre al if");
      setgenerosCache([])
    }
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
    <div className="Loading">
    <div className="loader"></div>
    </div>
  ) : (
    <div className="filter">
      <span>Ordenar por:</span>
      <button className="cta" onClick={(e) => HandleClickASC(e)}>
        <span className="hover-underline-animation"> A - Z </span>
      </button>
      <button className="cta" onClick={(e) => HandleClickDES(e)}>
        <span className="hover-underline-animation"> Z - A </span>
      </button>
      <button className="cta" onClick={(e) => HandleClickVoteASC(e)}>
        <span className="hover-underline-animation"> <strong> + </strong> Puntuación</span>
      </button>
      <button className="cta" onClick={(e) => HandleClickVoteDES(e)}>
        <span className="hover-underline-animation"> <strong> - </strong>Puntuación </span>
      </button>
      <span>Filtrar por:</span>
      
      <div class="select2">
        <div class="select">
        <select      
            name="format" id="format"
            onChange={(e) => FiltradoGenero(e)}
            defaultValue={"Default"}
          >
            <option selected disabled value={"Default"}>Generos..</option>
            {generos?.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      <abbr title="Limpiar Filtros">
      <span onClick={() => HandleClickClear()}>
        <ClearIcon className="icono-clear" />
      </span>
      </abbr>
      {generosCache?.map((g) => {
        return (
          <button classname="filterBoton" onClick={() => FiltradoReversa(g)}><span>
          {" "}
          {g} {" "}<CloseIcon color="yellow" size='14' /></span>
        </button>
        );
      })}
      </div>

      <div className="contenedor-seccion">
        <div className="contenedor-resultados">
          {allpSeries.map((e) => {
            return <CardSeries key={e.id} id={e.id} name={e.name} poster={e.posterImagen} tipo={e.tipo} />;
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
