import React from "react";
import Carousel from "../Carousel/Carousel";
import Header from "../Header/Header";
import { useContext, useEffect } from "react";
import Context from "../../contexto/Context";
import {
  seriesName,
  moviesName,
  urlBase,
  apiKey,
} from "../../Auxiliares/Variables";
import "../../Styles/components/_Home.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllSeries,
  getAllMovies,
  getGenerosMovies,
  getGenerosSeries,
  getTodo,
} from "../../Redux/Actions/Actions";
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
  const idioma = useContext(Context).lenguaje;

  return (
    <section className="contenedor-carousels">
      <Header />
      <Carousel
        url={`${urlBase}/trending/movie/week?api_key=${apiKey}&language=${idioma}`}
        tipo="movies"
        categoria="trending"
        titulo={moviesName[idioma].tendencia}
        clase="peliculas"
      />
      <Carousel
        url={`${urlBase}/trending/tv/week?api_key=${apiKey}&language=${idioma}`}
        tipo="tv"
        categoria="trending"
        titulo={seriesName[idioma].tendencia}
        clase="series"
      />
      <Footer />
    </section>
  );
};

export default Home;
