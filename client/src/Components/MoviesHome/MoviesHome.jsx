// import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CardMovies from "../CardMovies/CardMovies";
import {
  getAllMovies,
  orderNameASC,
  orderNameDES,
  orderVoteAvgASC,
  orderVoteAvgDES,
  getGenerosMovies,
} from "../../Redux/Actions/Actions";
import { useEffect, useState } from "react";

import {
  filtradoGeneroMovies,
  filtradoGeneroMoviesReversa,
} from "../../Redux/Actions/Actions.js";
import PaginadoMovies from "./PaginadoMovies";
import "../../Styles/components/_MoviesHome.scss";
import "../../Styles/components/_Filter.scss";
import "../../Styles/components/_Loading.scss";
import { AiOutlineClear as ClearIcon } from "react-icons/ai";
import { VscChromeClose as CloseIcon } from "react-icons/vsc";


function MoviesHome() {
  useEffect(() => {
    dispatch(getGenerosMovies());
  }, []);
  const dispatch = useDispatch();

  const allMovies = useSelector((state) => state.allMovies);
  const generos = useSelector((state) => state.generosMovies);

  const [generosCache, setgenerosCache] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pelisPerPage = 12;
  const indexOfLastMovies = currentPage * pelisPerPage; //10
  const indexOfFirstMovies = indexOfLastMovies - pelisPerPage; //0
  const currentMovies = allMovies?.slice(indexOfFirstMovies, indexOfLastMovies);

  const FiltradoGenero = (e) => {
    let arrsetgenero = [...new Set([e.target.value, ...generosCache])];
    // console.log(e.target.value)
    let notinclude = allMovies?.map(e=> e.genre_ids)
    let notinclude2 = notinclude?.map(a=> a.includes(e.target.value))
    setgenerosCache(arrsetgenero);
    // console.log(notinclude2)
    dispatch(filtradoGeneroMovies(e.target.value));
    if(!notinclude2.includes(true)){
      // console.log("entre al if");
      setgenerosCache([])
    }
  };
  const FiltradoReversa = (g) => {
    var auxArr = generosCache.filter((fil) => fil !== g);
    dispatch(filtradoGeneroMoviesReversa(auxArr));
    setgenerosCache(auxArr);
  };
  const HandleClickClear = () => {
    setgenerosCache([]);
    // dispatch(clear('peliculas'))
    dispatch(filtradoGeneroMoviesReversa([]));
  };
  const HandleClickASC = (e) => {
    e.preventDefault();
    dispatch(orderNameASC(allMovies));
  };
  const HandleClickDES = (e) => {
    e.preventDefault();
    dispatch(orderNameDES(allMovies));
  };
  const HandleClickVoteASC = (e) => {
    e.preventDefault();
    dispatch(orderVoteAvgASC(allMovies));
  };
  const HandleClickVoteDES = (e) => {
    e.preventDefault();
    dispatch(orderVoteAvgDES(allMovies));
  };

  return allMovies.length === 0 ? (
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
        <span className="hover-underline-animation">
          <strong> + </strong> Puntuación
        </span>
      </button>
      <button className="cta" onClick={(e) => HandleClickVoteDES(e)}>
        <span className="hover-underline-animation">
          <strong> - </strong> Puntuación{" "}
        </span>
      </button>
      <span>Filtrar por:</span>

    <div class="select2">
      <div class="select">
      <select      
        name="format" id="format"
        onChange={(e) => FiltradoGenero(e)}
        defaultValue={"Default"}
      >
        <option  selected disabled value={"Default"}>Generos..</option>
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
          {currentMovies?.map((r) => {
            return (
              <CardMovies
                key={r.id}
                tipo={r.tipo}
                id={r.id}
                name={r.name}
                poster={r.posterImagen}
              />
            );
          })}
        </div>
      </div>
      <div className="containerPag">
        <PaginadoMovies
          pelisPerPage={pelisPerPage}
          todasLasMovies={allMovies?.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        {/* {currentMovies?.map((r) => {
          return (
            <CardMovies
              key={r.id}
              id={r.id}
              name={r.title}
              poster={r.posterImagen}
            />
          );
        })} */}
      </div>
    </div>
  );
}

export default MoviesHome;
