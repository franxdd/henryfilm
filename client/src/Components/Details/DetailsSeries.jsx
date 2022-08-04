import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getSeriesDetail,
  willunmont,
  setdetailLenguage,
  createReview,
  addToWishlist,
} from "../../Redux/Actions/Actions";
import "../../Styles/components/_DetailsMovies.scss";
import { estrellas } from "../../auxiliares/Funciones.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdAddShoppingCart as ShopIcon } from "react-icons/md";

function DetailsSeries() {
  const userReducer = useSelector((state) => state.user);
  let navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();
  // let lenguaje = useSelector((state) => state.lenguaje);
  // let asd = useSelector((state) => state.idioma);
  let seriesDetail = useSelector((state) => state.seriesDetail);
  let video = seriesDetail[0]?.videosAMostrar[0];
  // .replace("watch?v=", "embed/");
  function addCart(id) {
    let idParseado = parseInt(id);
    dispatch(addToCart(idParseado));
  }
  function addWishlist(id) {
    let idParseado2 = parseInt(id);
    dispatch(addToWishlist(idParseado2));
  }

  useEffect(() => {
    // dispatch(setdetailLenguage(id, asd));
    dispatch(getSeriesDetail(id));

    return () => dispatch(willunmont());
  }, [dispatch]);
  let token = sessionStorage.getItem("token");

  const [input, setInput] = useState({
    contenido: "",
    puntuacion: "",
    idserie: id,
    token: token,
  });

  function handdleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  console.log(input);
  const submitHandler = (e) => {
    e.preventDefault();
    if (!input.token) {
      alert("Debes loguearte");
      navigate("/home/Login");
    } else {
      dispatch(createReview(input));
    }
  };
  function handleRegister(e) {
    e.preventDefault();
    alert("debes registrarte");
    navigate("/home/Login");
  }

  console.log(seriesDetail);
  return (
    <section>
      <header
        className="header-info"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${
            seriesDetail && seriesDetail[0]?.backDropImagen
          })`,
        }}
      >
        <div className="contenedor-info">
          <div className="contenedor-descripcion">
            <h3>{seriesDetail && seriesDetail[0]?.name}</h3>
            <div className="contenedor-estrellas">
              {estrellas(
                Math.round(seriesDetail && seriesDetail[0]?.vote_average)
              )}
            </div>
            <p className="descripcion">
              {seriesDetail && seriesDetail[0]?.overview}
            </p>
            <p>
              {" "}
              {seriesDetail &&
                seriesDetail[0]?.episode_run_time?.map((e) => {
                  return <p>Duracion: {e} min</p>;
                })}
            </p>
            <ul>
              Producción:{" "}
              {seriesDetail &&
                seriesDetail[0]?.production_companies.map((e) => {
                  return <div>{e.name}</div>;
                })}
            </ul>
            <ul>
              {" "}
              Géneros:{" "}
              {seriesDetail &&
                seriesDetail[0]?.genres.map((e) => {
                  return <div>{e.name}</div>;
                })}
            </ul>
            <p>
              Numero de episodios:{" "}
              {seriesDetail && seriesDetail[0]?.number_of_episodes}
            </p>
            <p>
              Numero de Temporadas:{" "}
              {seriesDetail && seriesDetail[0]?.number_of_seasons}
            </p>
            {/* <div className="contenedor-links">
              <Link to={`/videos`}>
                <button>Trailer</button>
              </Link> */}
            <div className="contenedor-links">
              {userReducer.username ? (
                <div>
                  <button>Trailer</button>
                  <div>
                    <iframe width="200" height="200" src={video}></iframe>
                  </div>
                </div>
              ) : (
                <button onClick={handleRegister}>Trailer</button>
              )}
              <Link to={`/videos`}>
                <button>Reparto</button>
              </Link>
              <span className="spanCompras" onClick={() => addCart(id)}>
                <ShopIcon className="iconoShop" />
              </span>
              <button onClick={() => addWishlist(id)}>Wishlist</button>
            </div>
            <form onSubmit={submitHandler}>
              <label>Escribe tu comentario</label>
              <textarea
                id="comment"
                value={input.contenido}
                onChange={(e) => handdleChange(e)}
                name="contenido"
              ></textarea>
              <label>Rating</label>
              <select
                id="puntuacion"
                value={input.puntuacion}
                name="puntuacion"
                onChange={(e) => handdleChange(e)}
              >
                <option value="1">Select</option>
                <option value="1">1- Bad</option>
                <option value="2">2- Fair</option>
                <option value="3">3- Good</option>
                <option value="4">4- Very good</option>
                <option value="5">5- Excelent</option>
              </select>
              <button type="submit">Comentar</button>
            </form>
            <h2>comentarios:</h2>
          </div>
        </div>
      </header>
    </section>
  );
}
export default DetailsSeries;
