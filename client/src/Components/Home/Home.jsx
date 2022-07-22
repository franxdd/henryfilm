import React from "react";
import Carousel from "../Carousel/Carousel";
import { useContext, useEffect } from "react";
import Context from "../../contexto/Context";
import {
  titulosSeries,
  titulosPeliculas,
  urlBase,
  apiKey,
} from "../../auxiliares/Variables";
import "./_Home.scss";
import { useSelector, useDispatch  } from "react-redux";
import { getAllSeries, getAllMovies } from "../../Redux/Actions/Actions";


const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSeries());
    dispatch(getAllMovies());
  }, []);

 let movies = useSelector((state)=> state.allMovies)
console.log (movies)
  const lenguajeSeleccionado = useContext(Context).lenguaje;

  return (
    <section className="contenedor-carousels">
      <Carousel
        url={`https://api.themoviedb.org/3/tv/top_rated?api_key=3832b93c32749d817ba7fc39076d3398&language=en-US&page=1`}
        tipo="movies"
        categoria="trending"
        titulo={titulosPeliculas[lenguajeSeleccionado].tendencia}
        clase="peliculas"
      />
      <Carousel
        url={`${urlBase}/trending/tv/week?api_key=${apiKey}&language=${lenguajeSeleccionado}`}
        tipo="tv"
        categoria="trending"
        titulo={titulosSeries[lenguajeSeleccionado].tendencia}
        clase="series"
      />
    </section>
  );
};

export default Home;

