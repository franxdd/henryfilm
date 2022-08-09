import  { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { getTodo, putPeliculas, getMoviesDetail, getSeriesDetail, willunmont2 } from "../../Redux/Actions/Actions";
import validate from "../../util/validate.js";
import poster from "../../img/poster.jpg";
import back from "../../img/backdrop.jpg";
import "../../Styles/components/_FormPeliculas.scss";
import { useParams } from "react-router-dom";

const PutPeliculas = ({info}) => {
  let dispatch = useDispatch();
  let { id } = useParams();

  let todos = useSelector((state) => state.todo);
  // console.log(movieDetail)
  var aux;
  var auxId;

  // if(id.includes("A-Z")){
  //   auxId = id + ""
  // }else{
  //   auxId = Number(id)
  // }

  for (let i = 0; i < todos.length; i++) {
    if(todos[i].id === Number(id)){
      aux = todos[i]
    }else if(todos[i].id === id){
      aux = todos[i]
    }
  }
  console.log(aux)
  console.log(auxId)


  const generos = useSelector((state) => state.generosMovies);
  const [error, setError] = useState({ " ": " " });
  const [data, setdata] = useState({
    id: "",
    name: "",
    genre_ids: [],
    overview: "",
    cast: [],
    runtime: "",
    release_date: "",
    posterImagen: "",
    backDropImagen: "",
    vote_average: "",
    popularity: "",
    tipo: "",
  });
  console.log(data)

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (data.backDropImagen === "Alt") {
      data.backDropImagen = poster;
    }
    if (data.posterImagen === "Alt") {
      data.posterImagen = poster;
    }

    dispatch(putPeliculas(data));
    alert("Pelicula Modificada");
    setdata({
      id: "",
      name: "",
      genre_ids: [],
      overview: "",
      cast: [],
      runtime: "",
      release_date: "",
      posterImagen: "",
      backDropImagen: "",
      vote_average: "",
      popularity: "",
      tipo: "",
    });
    setError({ " ": " " });

    for (let i = 0; i < e.target.length - 1; i++) {
      if (e.target[i].localName === "input") {
        if (e.target[i].id !== "elencobutton") {
          e.target[i].value = "";
        }
      } else if (e.target[i].localName === "textarea") {
        e.target[i].value = "";
      } else if (e.target[i].localName === "select") {
        e.target[i].selectedIndex = 0;
      }
    }
  };

  const HandleChangeGeneros = (e) => {
    if (e.target.value !== " ") {
      let arrset = [...new Set([e.target.value, ...data.genre_ids])];

      setdata({
        ...data,
        genre_ids: arrset,
      });
      setError(
        validate({
          ...data,
          genre_ids: arrset,
        })
      );
    }
  };

  const HandleChangeTipos = (e) => {
    setdata({
      ...data,
      tipo: e.target.value,
    });
    setError(
      validate({
        ...data,
        tipo: e.target.value,
      })
    );
  };

  const HandleElenco = (e) => {
    if (e.value !== "") {
      setdata({ ...data, cast: [...data.cast, e.value] });
      setError(validate({ ...data, cast: [...data.cast, e.value] }));
      e.value = "";
    }
  };
  const HandleInput = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    setError(validate({ ...data, [e.target.name]: e.target.value }));
  };

  const eliminarGenero = (g) => {
    var arrAux = data.genre_ids.filter((fil) => fil !== g);
    setdata({
      ...data,
      genre_ids: arrAux,
    });
  };

  return (
    <>
    <div className="ContainerForm2">
    <div className="FormPeliculas">
      <form className ="form2" onSubmit={HandleSubmit}>
      <div className="pageTitle title"> Editar Producto </div>
        {/* <div className="nombreconteiner">
          <input
            id="id"
            type="text"
            name="id"
            placeholder="Id:"
            className="name formEntry2"
            onChange={(e) => HandleInput(e)}
          />
        </div> */}
        <div className="nombreconteiner">
          <input
            id="name"
            type="text"
            name="name"
            placeholder={aux.name}
            className="name formEntry2"
            onChange={(e) => HandleInput(e)}
          />
        </div>

        <div className="descripcionconteiner">
          <textarea
            id="Overview"
            type="text"
            name="overview"
            rows="5"
            placeholder={aux.overview}
            className="name formEntry2"
            maxLength="140"
            onChange={(e) => HandleInput(e)}
          />
        </div>

        {
        aux.tipo === "pelicula" ? 
        <div className="relasedconteiner">
          <input
            id="release_date"
            type="text"
            name="release_date"
            placeholder={aux.release_date}
            className="name formEntry2"
            onChange={(e) => HandleInput(e)}
          />
        </div>
        :
        <div className="relasedconteiner">
        <input
          id="release_date"
          type="text"
          name="release_date"
          placeholder={aux.first_air_date}
          className="name formEntry2"
          onChange={(e) => HandleInput(e)}
        />
      </div>
        }

        <div className="vote_averageconteiner">
          <input
            id="vote_average"
            type="text"
            name="vote_average"
            placeholder={aux.vote_average}
            className="name formEntry2"
            onChange={(e) => HandleInput(e)}
          />
        </div>

        <div className="popularityconteiner">
          <input
            id="popularity"
            type="text"
            name="popularity"
            placeholder={aux.popularity}
            className="name formEntry2"
            onChange={(e) => HandleInput(e)}
          />
        </div>

        <div className="duracionconteiner">
          <input
            id="runtime"
            type="text"
            name="runtime"
            placeholder="Duracion:"
            className="name formEntry2"
            onChange={(e) => HandleInput(e)}
          />
        </div>

        <div className="elencoconteiner">
          <input
            id="elenco"
            type="text"
            name="elenco"
            placeholder="Elenco:"
            className="name formEntry2"
          />
            <button className="submit formEntry2" 
            id="elencobutton"
            value="Agregar"
            type="button"
            onClick={() => HandleElenco(document.getElementById("elenco"))}
          >Agregar </button>
        </div>

        <div className="nombreconteiner">
          <input
            id="backDropImagen"
            type="text"
            name="backDropImagen"
            onChange={(e) => HandleInput(e)}
            placeholder="Imagen back-drop:"
            className="name formEntry2"
          />
        </div>

        <div className="nombreconteiner">
          <input
            id="posterImagen"
            type="text"
            name="posterImagen"
            onChange={(e) => HandleInput(e)}
            placeholder="Imagen poster:"
            className="name formEntry2"
          />
        </div>

        <section className="containerSelect">
        <div className="dropdown">
          <select
            name="generos"
            onChange={(e) => HandleChangeGeneros(e)}
            className="dropdown-select"
          >
            <option value=" ">Generos..</option>
            {generos?.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        </section>
        {data.genre_ids?.map((g) => (
          <div style={{ color: "white" }} onClick={() => eliminarGenero(g)}>
            {g}
          </div>
        ))}
      <section className="containerSelect">
          <div className="dropdown">
            <select name="tipo"
            onChange={(e) => HandleChangeTipos(e)}
            className="dropdown-select">
              {/* <option value=" ">Tipos..</option> */}
              {
                aux.tipo === "pelicula" ? 
                <option value="pelicula">pelicula</option> :
            <option value="serie">serie</option>
              }
          </select>
          </div>
        </section>

        <button className="submit formEntry2" 
            type="submit"
            value="Enviar"
            disabled={Object.keys(error).length}
            >Enviar</button>
       
      </form>
      <div className="erroresconteiner">
        <h2 style={{ color: "white" }}>{error.name}</h2>
        <h2 style={{ color: "white" }}>{error.genre_ids}</h2>
        <h2 style={{ color: "white" }}>{error.overview}</h2>
        <h2 style={{ color: "white" }}>{error.release_date}</h2>
        <h2 style={{ color: "white" }}>{error.vote_average}</h2>
        <h2 style={{ color: "white" }}>{error.cast}</h2>
        <h2 style={{ color: "white" }}>{error.posterImagen}</h2>
        <h2 style={{ color: "white" }}>{error.backDropImagen}</h2>
        <h2 style={{ color: "white" }}>{error.popularity}</h2>
        <h2 style={{ color: "white" }}>{error.tipo}</h2>
      </div>

      <div className="conteinerbackDropImagen">
        <div className="backDropImagen" style={{ color: "white" }}>
          Image back-drop
        </div>

        {data.backDropImagen.length === 0 ? (
          <>
            <img
              className="imgconteinerbackDropImagen"
              src={back}
              alt="img"
            />
          </>
        ) : data.backDropImagen === "Alt" ? (
          <>
            <img
              className="imgconteinerbackDropImagen"
              src={poster}
              alt="Debe ingresar una URL"
            />
          </>
        ) : (
          <>
            <img
              className="imgconteinerbackDropImagen"
              src={data.backDropImagen}
              alt="Debe ingresar una URL"
            />
          </>
        )}
      </div>

      <div className="conteinerposterImagen">
        <div className="posterImagen" style={{ color: "white" }}>
          Image poster
        </div>

        {data.posterImagen.length === 0 ? (
          <>
            <img
              className="imgconteinerposterImagen"
              src={poster}
              alt="img"
            />
          </>
        ) : data.posterImagen === "Alt" ? (
          <>
            <img
              className="imgconteinerposterImagen"
              src={poster}
              alt="Debe ingresar una URL"
            />
          </>
        ) : (
          <>
            <img
              className="imgconteinerposterImagen"
              src={data.posterImagen}
              alt="Debe ingresar una URL"
            />
          </>
        )}
      </div>
      </div>
      </div>
    </>
  );
};

export default PutPeliculas;
