import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getSeriesDetail,
  willunmont,
} from "../../Redux/Actions/Actions";
import { useParams } from "react-router-dom";
import "../../Styles/components/_DetailsMovies.scss";
import { estrellas } from "../../Auxiliares/Funciones";
import { Link } from "react-router-dom";
import { MdAddShoppingCart as ShopIcon } from "react-icons/md";
function DetailsSeries() {
  let { id } = useParams();
  const dispatch = useDispatch();

  function addCart(id) {
    let idParseado = parseInt(id);
    dispatch(addToCart(idParseado));
  }
  let seriesDetail = useSelector((state) => state.seriesDetail);
  useEffect(() => {
    dispatch(getSeriesDetail(id));
    return () => dispatch(willunmont());
  }, []);

  console.log(seriesDetail);
  return (
    <section>
      <header
        className="header-info"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${seriesDetail[0]?.backDropImagen})`,
        }}
      >
        <div className="contenedor-info">
          <div className="contenedor-descripcion">
            <h3>{seriesDetail[0]?.name}</h3>
            <div className="contenedor-estrellas">
              {estrellas(Math.round(seriesDetail[0]?.vote_average))}
            </div>
            <p className="descripcion">{seriesDetail[0]?.overview}</p>
            <p>
              {" "}
              {seriesDetail[0]?.episode_run_time?.map((e) => {
                return <p>Duracion: {e} min</p>;
              })}
            </p>
            <ul>
              Producción:{" "}
              {seriesDetail[0]?.production_companies.map((e) => {
                return <div>{e.name}</div>;
              })}
            </ul>
            <ul>
              {" "}
              Géneros:{" "}
              {seriesDetail[0]?.genres.map((e) => {
                return <div>{e.name}</div>;
              })}
            </ul>
            <p>Numero de episodios: {seriesDetail[0]?.number_of_episodes}</p>
            <p>Numero de Temporadas: {seriesDetail[0]?.number_of_seasons}</p>
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
export default DetailsSeries;
