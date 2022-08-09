import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  createReview,
  getMoviesDetail,
  willunmont2,
  addToWishlist,
  getReview,
  getHistorial,

} from "../../Redux/Actions/Actions";
import "../../Styles/components/_DetailsMovies.scss";
import { estrellas } from "../../auxiliares/Funciones";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdAddShoppingCart as ShopIcon } from "react-icons/md";
import "../../Styles/components/_ComentariosForm.scss";
import {TiHeart as HeartIcon} from "react-icons/ti";
import "../../Styles/components/_Modal.scss";
import {AiFillCloseSquare as CloseIcon} from "react-icons/ai";
import Rating2 from "../Details/Rating2.jsx";
import Rating from '@mui/material/Rating';
import "../../Styles/components/_CardComentarios.scss";
import {FaCommentDots as ComentIcon} from "react-icons/fa"

function DetailMovie() {
  let navigate = useNavigate();
  let { id } = useParams();
  let token = sessionStorage.getItem("token");
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  let iduser = user.id
  let movieDetail = useSelector((state) => state.movieDetail);
  let { comentarios } = useSelector((state) => state);
  const [input, setInput] = useState({
    contenido: "",
    puntuacion: "",
    idPelicula: id,
    token: token,
  });
  
  useEffect(() => {
    dispatch(getMoviesDetail(id));
    dispatch(getReview(input2));
    if(iduser){ 
      console.log('entro aca')
      dispatch(getHistorial(iduser))
    }
    return () => dispatch(willunmont2());
  }, [dispatch]);
  
  
  // console.log(movieDetail)
  // if(!movieDetail[0].creado){
    
  //   var video = movieDetail[0]?.videosAMostrar[0]; // El problema del rederizado de details de los datos de la DB esta aca
    
  // }
  // console.log(movieDetail);

  
  // .replace("watch?v=", "embed/")
  function addCart(id) {
    let idParseado = parseInt(id);
    dispatch(addToCart(idParseado));
  }
  function BasicModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  }

  const input2 = {
    id: id,
    tipo: "pelicula",
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

  return movieDetail.length === 0 ? (
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
          backgroundImage: movieDetail[0]?.backdrop_path ?    `url(https://image.tmdb.org/t/p/original${movieDetail[0]?.backdrop_path})` : `url(${movieDetail[0]?.backDropImagen})` ,
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
            {movieDetail[0]?.production_companies ? (
            <ul className="item-descripcion">
              Producción:{" "}
              {movieDetail[0]?.production_companies?.map((e) => {
                return <div className="divGeneros">{movieDetail[0].production_companies[movieDetail[0].production_companies.length-1].name === e.name ? `${e.name}` : `${e.name},` }</div>;
              })}
            </ul>


            ):(
              <>
                <br></br>
              </>

            )}
            <ul className="lista-generos">
              Géneros: {" "}
              {movieDetail[0]?.genre_ids?.map((e) => {
                return <div className="divGeneros">{movieDetail[0].genre_ids[movieDetail[0].genre_ids.length-1] === e ? `${e}` : `${e},` } </div>;
              })}
            </ul>

            <div className="contenedor-links">
              {movieDetail[0]?.videosAMostrar ? (
                <div>
                <a href="#miModal"><button >Trailer</button></a>
                <div id="miModal" className="modal">
                  <div className="modal-contenido">
                    <a href="#"> <CloseIcon className="iconoClose"/> </a><br></br>
                    <div className="iframe-container">
                    <iframe className="video" width="100%" height="100%" src={movieDetail[0]?.videosAMostrar[0]}></iframe>
                    </div>
                  </div>  
                </div>
        
                {/* <button>Trailer</button>
                  <div>
                    <iframe width="200" height="200" src={video}></iframe>
                  </div>
                </div> */}
                {/* <button >Trailer</button> */}
                </div>
              ) : (
                <></>
              )}

              <Link to={`/home/videos`}>
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
      {/* <form className="form3" onSubmit={submitHandler}>
        <textarea
          id="comment"
          value={input.contenido}
          onChange={(e) => handdleChange(e)}
          name="contenido"
          placeholder="Escribe tu comentario:"
          className="name formEntry3"
        ></textarea> */}
        <Rating2 className="ratingStyle" id={id} token={token}/>
        {/* <Rating className="ratingStyle" /> */}
        <br></br>

      <div className="ComentariosCard">
        <h2>Comentarios:</h2>
        {comentarios &&
           comentarios.map((e) => {
          return (
            <div className= "review">
              <div className="email" >Usuario: {e.username}</div>
             <div className="infoRev"><Rating 
             name="read-only" value={e.puntuacion} /></div>
              <div className="p">Comentario: {e.contenido}</div>
              <br />
            </div>
          );
        })}
        </div>
    </section>
  );
}

export default DetailMovie;
