import React from "react";
import Carousel from "../Carousel/Carousel";
import { useContext, useEffect } from "react";
import Context from "../../contexto/Context";
import { titulosSeries, titulosPeliculas, urlBase, apiKey } from "../../auxiliares/Variables";
import "./_Home.scss";
import { useSelector, useDispatch } from "react-redux";
import { getAllSeries, getAllMovies, getGenerosMovies, getGenerosSeries, getTodo } from "../../Redux/Actions/Actions";
import Footer from "../Footer/Footer";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSeries());
    dispatch(getAllMovies());
    dispatch(getGenerosSeries());
    dispatch(getGenerosMovies());
    dispatch(getTodo());
  }, []);

  //let movies = useSelector((state)=> state.allMovies)
  const lenguajeSeleccionado = useContext(Context).lenguaje;
  return (
    <section className="contenedor-carousels">
      <Carousel
        url={`${urlBase}/trending/movie/week?api_key=${apiKey}&language=${lenguajeSeleccionado}`}
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
      <Footer />
    </section>
  );
};

export default Home;
