import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getMoviesDetail,
  willunmont2,
} from "../../Redux/Actions/Actions";
import { useParams } from "react-router-dom";
import "../../Styles/components/_DetailsMovies.scss";
import { estrellas } from "../../auxiliares/Funciones";
import { Link } from "react-router-dom";
import { MdAddShoppingCart as ShopIcon } from "react-icons/md";

function DetailMovie() {
  let { id } = useParams();
  const dispatch = useDispatch();
  function addCart(id) {
    let idParseado = parseInt(id);
    dispatch(addToCart(idParseado));
  }
  let movieDetail = useSelector((state) => state.movieDetail);

  useEffect(() => {
    dispatch(getMoviesDetail(id));
    return () => dispatch(willunmont2());
  }, []);




  return movieDetail.length === 0 ? (

    <h1>LOADER</h1>


  ) :(
    <section>
      <header
        className="header-info"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetail[0]?.backdrop_path})`,
        }}
      >
        <div className="contenedor-info">
          <div className="contenedor-descripcion">
            <h3>{movieDetail[0]?.name}</h3>
            <div className="contenedor-estrellas">
              {estrellas(Math.round(movieDetail[0]?.vote_average))}
            </div>
            <p className="descripcion">{movieDetail[0]?.overview}</p>
            <p className="item-descripcion">
              Duracion: {movieDetail[0]?.runtime} min
            </p>
            <ul className="item-descripcion">
              Producción:{" "}
              {movieDetail[0]?.production_companies?.map((e) => {
                return <div>{e.name}</div>;
              })}
            </ul>
            <ul className="lista-generos">
              Géneros:{" "}
              {movieDetail[0]?.genres?.map((e) => {
                return <div>{e.name}</div>;
              })}
            </ul>
            <div className="contenedor-links">
              <Link to={`/videos`}>
                <button>Trailer</button>
              </Link>
              <Link to={`/videos`}>
                <button>Reparto</button>
              </Link>
              <span onClick={() => addCart(id)}>
                <ShopIcon className="iconoShop" />
              </span>
            </div>
          </div>
        </div>
      </header>
    </section>
  );
}

export default DetailMovie;
