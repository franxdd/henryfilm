import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  createReview,
  getMoviesDetail,
  willunmont2,
  addToWishlist,
} from "../../Redux/Actions/Actions";
import "../../Styles/components/_DetailsMovies.scss";
import { estrellas } from "../../auxiliares/Funciones";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdAddShoppingCart as ShopIcon } from "react-icons/md";

function DetailMovie() {
  const userReducer = useSelector((state) => state.user);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();
  let movieDetail = useSelector((state) => state.movieDetail);
  let token = sessionStorage.getItem("token");
  let video = movieDetail[0]?.videosAMostrar[0];
  // .replace("watch?v=", "embed/")
  function addCart(id) {
    let idParseado = parseInt(id);
    dispatch(addToCart(idParseado));
  }
  const [input, setInput] = useState({
    contenido: "",
    puntuacion: "",
    idPelicula: id,
    token: token,
  });

  function handdleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
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
  function addWishlist(id) {
    let idParseado2 = parseInt(id);
    dispatch(addToWishlist(idParseado2));
  }

  useEffect(() => {
    dispatch(getMoviesDetail(id));
    return () => dispatch(willunmont2());
  }, []);

  console.log(movieDetail);
  return (
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
            {/* <div className="contenedor-links">
              <button>Trailer</button>
              <div>
                <iframe width="420" height="315" src={video}></iframe>
              </div> */}
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

              <Link to={`/home/videos`}>
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

export default DetailMovie;
