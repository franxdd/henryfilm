import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CardMovies from "../CardMovies/CardMovies";
import {
  getAllMovies,
  orderNameASC,
  orderNameDES,
  orderVoteAvgASC,
  orderVoteAvgDES,
  clear,
} from "../../Redux/Actions/Actions";
import { useEffect, useState } from "react";
import {
  filtradoGeneroMovies,
  filtradoGeneroMoviesReversa,
} from "../../Redux/Actions/Actions.js";
import PaginadoMovies from "./PaginadoMovies";
import "./_MoviesHome.scss";
import SearchBar from "../SearchBar/SearchBar";

function MoviesHome() {
  // useEffect(() => {
  //   dispatch(getAllMovies());
  // }, []);
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
    setgenerosCache(arrsetgenero);
    dispatch(filtradoGeneroMovies(e.target.value));
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
    <h1 style={{ color: "white" }}>LOADER</h1>
  ) : (
    <div>
      <button onClick={(e) => HandleClickASC(e)}>
        BOTON PRUEBA ORDENADO ASC
      </button>

      <button onClick={(e) => HandleClickDES(e)}>
        BOTON PRUEBA ORDENADO DES
      </button>

      <button onClick={(e) => HandleClickVoteASC(e)}>
        BOTON PRUEBA ORDENADO VOTE AVG ASC
      </button>

      <button onClick={(e) => HandleClickVoteDES(e)}>
        BOTON PRUEBA ORDENADO VOTE AVG DES
      </button>

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
      <button onClick={() => HandleClickClear()}>CLEAR</button>

      {generosCache?.map((g) => {
        return (
          <div style={{ color: "white" }} onClick={() => FiltradoReversa(g)}>
            {" "}
            {g}
          </div>
        );
      })}

      <div className="contenedor-seccion">
        <div className="contenedor-resultados">
          {currentMovies?.map((r) => {
            return (
              <CardMovies
                key={r.id}
                id={r.id}
                name={r.title}
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
