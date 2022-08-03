import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getSeriesDetail,
  willunmont,
  setdetailLenguage,
  createReview,
} from "../../Redux/Actions/Actions";
import { useParams } from "react-router-dom";
import "../../Styles/components/_DetailsMovies.scss";
import { estrellas } from "../../auxiliares/Funciones.js";
import { Link } from "react-router-dom";
import { MdAddShoppingCart as ShopIcon } from "react-icons/md";
function DetailsSeries() {
  let { id } = useParams();
  const dispatch = useDispatch();
  let lenguaje = useSelector((state) => state.lenguaje);
  let asd = useSelector((state) => state.idioma);
  let seriesDetail = useSelector((state) => state.seriesDetail);

  function addCart(id) {
    let idParseado = parseInt(id);
    dispatch(addToCart(idParseado));
  }

  useEffect(() => {
    dispatch(setdetailLenguage(id, asd));
    return () => dispatch(willunmont());
  }, [dispatch]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  let token = sessionStorage.getItem("token");
  console.log(token);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createReview(id, {
        rating,
        comment,
      })
    );
  };

  return (
    <section>
      <header
        className="header-info"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${lenguaje && lenguaje[0]?.backDropImagen})`,
        }}
      >
        <div className="contenedor-info">
          <div className="contenedor-descripcion">
            <h3>{lenguaje && lenguaje[0]?.name}</h3>
            <div className="contenedor-estrellas">
              {estrellas(Math.round(lenguaje && lenguaje[0]?.vote_average))}
            </div>
            <p className="descripcion">{lenguaje && lenguaje[0]?.overview}</p>
            <p>
              {" "}
              {lenguaje &&
                lenguaje[0]?.episode_run_time?.map((e) => {
                  return <p>Duracion: {e} min</p>;
                })}
            </p>
            <ul>
              Producción:{" "}
              {lenguaje &&
                lenguaje[0]?.production_companies.map((e) => {
                  return <div>{e.name}</div>;
                })}
            </ul>
            <ul>
              {" "}
              Géneros:{" "}
              {lenguaje &&
                lenguaje[0]?.genres.map((e) => {
                  return <div>{e.name}</div>;
                })}
            </ul>
            <p>
              Numero de episodios: {lenguaje && lenguaje[0]?.number_of_episodes}
            </p>
            <p>
              Numero de Temporadas: {lenguaje && lenguaje[0]?.number_of_seasons}
            </p>
            <div className="contenedor-links">
              <Link to={`/videos`}>
                <button>Trailer</button>
              </Link>
              <Link to={`/videos`}>
                <button>Reparto</button>
              </Link>
              <span className="spanCompras" onClick={() => addCart(id)}>
                <ShopIcon className="iconoShop" />
              </span>
            </div>
            <form onSubmit={submitHandler}>
              <label>Escribe tu comentario</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <label>Rating</label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="">Select</option>
                <option value="1">1- Bad</option>
                <option value="2">2- Fair</option>
                <option value="3">3- Good</option>
                <option value="4">4- Very good</option>
                <option value="5">5- Excelent</option>
              </select>
            </form>
            <h2>comentarios:</h2>
          </div>
        </div>
      </header>
    </section>
  );
}
export default DetailsSeries;
