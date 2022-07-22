<<<<<<< HEAD
import Carousel from "../Carousel/Carousel";
import { useContext } from "react";
import Context from "../../contexto/Context";
import {
  titulosSeries,
  titulosPeliculas,
  urlBase,
  apiKey,
} from "../../auxiliares/Variables";
import "./_Home.scss";

const Home = () => {
  const lenguajeSeleccionado = useContext(Context).lenguaje;

  return (
    <section className="contenedor-carousels">
      <Carousel
        url={`${urlBase}/trending/movie/week?api_key=${apiKey}&language=${lenguajeSeleccionado}`}
        tipo="movie"
        categoria="trending"
        titulo={titulosPeliculas[lenguajeSeleccionado].tendencia}
      />

      <Carousel
        url={`${urlBase}/trending/tv/week?api_key=${apiKey}&language=${lenguajeSeleccionado}`}
        tipo="tv"
        categoria="trending"
        titulo={titulosSeries[lenguajeSeleccionado].tendencia}
      />
    </section>
  );
};
=======
import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllSeries, getAllMovies } from "../../Redux/Actions/Actions";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSeries());
    dispatch(getAllMovies());
  }, []);
  let { all } = useSelector((state) => state);
  console.log(all);
  return <div>home</div>;
}
>>>>>>> a630283ffaa9ac0e0fc19e1c8ff70c839993bd35

export default Home;

