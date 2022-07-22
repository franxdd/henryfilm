import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CardMovies from "../CardMovies/CardMovies";
import { getAllMovies } from "../../Redux/Actions/Actions";
import { useEffect, useState } from "react";
import PaginadoMovies from "./PaginadoMovies";

function MoviesHome() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  const allMovies = useSelector((state) => state.allMovies);
  console.log(allMovies);
  const [currentPage, setCurrentPage] = useState(1);
  const pelisPerPage = 10;
  const indexOfLastMovies = currentPage * pelisPerPage; //10
  const indexOfFirstMovies = indexOfLastMovies - pelisPerPage; //0
  const currentMovies = allMovies?.slice(indexOfFirstMovies, indexOfLastMovies);

  return (
    <div>
      <PaginadoMovies
        pelisPerPage={pelisPerPage}
        todasLasMovies={allMovies?.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      {currentMovies?.map((r) => {
        return <CardMovies key={r.id} id={r.id} name={r.title} poster={r.posterImagen} />;
      })}
    </div>
  );
}

export default MoviesHome;
