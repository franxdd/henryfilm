import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getSeriesDetail,
  willunmont,
  setdetailLenguage,
  createReview,
  addToWishlist,
  getReview,
} from "../../Redux/Actions/Actions";
import "../../Styles/components/_DetailsMovies.scss";
import { estrellas } from "../../auxiliares/Funciones.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdAddShoppingCart as ShopIcon } from "react-icons/md";
import "../../Styles/components/_ComentariosForm.scss";
import { TiHeart as HeartIcon } from "react-icons/ti";
import "../../Styles/components/_Modal.scss";
import { AiFillCloseSquare as CloseIcon } from "react-icons/ai";
import Rating2 from "../Details/Rating2.jsx";
import Rating from "@mui/material/Rating";
import "../../Styles/components/_CardComentarios.scss";
import { FaCommentDots as ComentIcon } from "react-icons/fa";

function DetailsSeries() {
  let navigate = useNavigate();
  let { id } = useParams();
  let token = sessionStorage.getItem("token");

  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.user);
  let seriesDetail = useSelector((state) => state.seriesDetail);
  let { comentarios } = useSelector((state) => state);
  const [input, setInput] = useState({
    contenido: "",
    puntuacion: "",
    idserie: id,
    token: token,
  });

  useEffect(() => {
    dispatch(getSeriesDetail(id));
    dispatch(getReview(input2));
    return () => dispatch(willunmont());
  }, [dispatch]);

  // console.log(seriesDetail);

  // let video = seriesDetail[0]?.videosAMostrar[0];

  function addCart(id) {
    let idParseado = parseInt(id);
    dispatch(addToCart(idParseado));
  }

  function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  }

  const input2 = {
    id: id,
    tipo: "serie",
  };

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

  function handleRegister(e) {
    e.preventDefault();
    alert("debes registrarte");
    navigate("/home/Login");
  }

  return seriesDetail.length === 0 ? (
    <div className="Loading">
      <div className="loader"></div>
    </div>
  ) : (
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
            <p className="descripcion">{seriesDetail[0]?.overview}</p>
            <p className="item-descripcion">
              Duracion: {seriesDetail[0]?.episode_run_time} min
            </p>

            {seriesDetail[0]?.production_companies ? (
              <ul className="item-descripcion">
                Producción:{" "}
                {seriesDetail[0]?.production_companies?.map((e) => {
                  return <div className="divGeneros">{seriesDetail[0].production_companies[seriesDetail[0].production_companies.length-1].name === e.name ? `${e.name }` : `${e.name },` } </div>;
                })}
              </ul>
            ) : (
              <>
              <br></br>
              </>
            )}

            <ul className="lista-generos">
              Géneros: {" "}
              {seriesDetail &&
                seriesDetail[0]?.genre_ids.map((e, index) => {
                  return <div key={index} className="divGeneros">{seriesDetail[0].genre_ids[seriesDetail[0].genre_ids.length-1] === e ? `${e}` : `${e},` }  </div>;
                })}
            </ul>
            <p>
              Numero de episodios:{" "}{seriesDetail && seriesDetail[0]?.number_of_episodes}
            </p>
            <ul>
              Numero de Temporadas:{" "}
              {seriesDetail && seriesDetail[0]?.number_of_seasons}
            </ul>
            {/* <div className="contenedor-links">
              <Link to={`/videos`}>
                <button>Trailer</button>
              </Link> */}
            <div className="contenedor-links">
              {seriesDetail[0]?.videosAMostrar ? (
                <div>
                  <a href="#miModal">
                    <button>Trailer</button>
                  </a>
                  <div id="miModal" className="modal">
                    <div className="modal-contenido">
                      <a href="#">
                        {" "}
                        <CloseIcon className="iconoClose" />{" "}
                      </a>
                      <br></br>
                      <div className="iframe-container">
                        <iframe
                          className="video"
                          width="100%"
                          height="100%"
                          src={seriesDetail[0]?.videosAMostrar[0]}
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <Link to={`/videos`}>
                <button>Reparto</button>
              </Link>
              <div className="Iconos">
                <abbr title="Añade al carrito">
                  <span onClick={() => addCart(id)}>
                    <ShopIcon className="iconoShop" />
                  </span>
                </abbr>
                <abbr title="Agrega a Favoritos">
                  <span onClick={() => addWishlist(id)}>
                    <HeartIcon className="iconoHeart" />
                  </span>
                </abbr>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Rating2 className="ratingStyle" id={id} token={token} />
      {/* <Rating className="ratingStyle" /> */}
      <br></br>

      <div className="ComentariosCard">
        <h2>Comentarios:</h2>
        {comentarios &&
          comentarios.map((e) => {
            return (
              <div className="review">
                <div className="email">Usuario: {e.username}</div>
                <div className="infoRev">
                  <Rating name="read-only" value={e.puntuacion} />
                </div>
                <div className="p">Comentario: {e.contenido}</div>
                <br />
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default DetailsSeries;
