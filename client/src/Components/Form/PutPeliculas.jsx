import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { postPeliculas, putPeliculas } from "../../Redux/Actions/Actions";
import validate from "../../util/validate.js";
import joystick from "../Img/joystick.jpg";

const PutPeliculas = () => {
  let dispatch = useDispatch();
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

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (data.backDropImagen === "Alt") {
      data.backDropImagen = joystick;
    }
    if (data.posterImagen === "Alt") {
      data.posterImagen = joystick;
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
      <form onSubmit={HandleSubmit}>
        <div className="nombreconteiner">
          <label style={{ color: "white" }} className="label">
            id:
          </label>
          <input
            id="id"
            type="text"
            name="id"
            className="inputconteiner"
            onChange={(e) => HandleInput(e)}
          />
        </div>
        <div className="nombreconteiner">
          <label style={{ color: "white" }} className="label">
            Nombre:
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="inputconteiner"
            onChange={(e) => HandleInput(e)}
          />
        </div>

        <div className="descripcionconteiner">
          <label style={{ color: "white" }} className="label">
            Description:
          </label>
          <textarea
            id="Overview"
            type="text"
            name="overview"
            rows="5"
            maxLength="140"
            className="textareaconteiner"
            onChange={(e) => HandleInput(e)}
          />
        </div>

        <div className="relasedconteiner">
          <label style={{ color: "white" }} className="label">
            Released:
          </label>
          <input
            id="release_date"
            type="text"
            name="release_date"
            className="inputconteiner"
            onChange={(e) => HandleInput(e)}
          />
        </div>

        <div className="vote_averageconteiner">
          <label style={{ color: "white" }} className="label">
            Rating:
          </label>
          <input
            id="vote_average"
            type="text"
            name="vote_average"
            className="inputconteiner"
            onChange={(e) => HandleInput(e)}
          />
        </div>

        <div className="popularityconteiner">
          <label style={{ color: "white" }} className="label">
            Popularidad:
          </label>
          <input
            id="popularity"
            type="text"
            name="popularity"
            className="inputconteiner"
            onChange={(e) => HandleInput(e)}
          />
        </div>

        <div className="duracionconteiner">
          <label style={{ color: "white" }} className="label">
            Duracion:
          </label>
          <input
            id="runtime"
            type="text"
            name="runtime"
            className="inputconteiner"
            onChange={(e) => HandleInput(e)}
          />
        </div>

        <div className="elencoconteiner">
          <label style={{ color: "white" }} className="label">
            Elenco:
          </label>
          <input
            id="elenco"
            type="text"
            name="elenco"
            className="inputconteiner"
          />
          <input
            id="elencobutton"
            value="Agregar"
            type="button"
            onClick={() => HandleElenco(document.getElementById("elenco"))}
          />
        </div>

        <div className="imagenbackdropconteiner">
          <label style={{ color: "white" }} className="label">
            Imagen back-drop:
          </label>
          <input
            id="backDropImagen"
            type="text"
            name="backDropImagen"
            onChange={(e) => HandleInput(e)}
            className="inputconteiner"
          />
        </div>

        <div className="posterconteiner">
          <label style={{ color: "white" }} className="label">
            Imagen poster:
          </label>
          <input
            id="posterImagen"
            type="text"
            name="posterImagen"
            onChange={(e) => HandleInput(e)}
            className="inputconteiner"
          />
        </div>

        <div className="generos-select">
          <select
            name="generos"
            onChange={(e) => HandleChangeGeneros(e)}
            className="generosconteiner"
          >
            <option value=" ">Generos..</option>
            {generos?.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {data.genre_ids?.map((g) => (
          <div style={{ color: "white" }} onClick={() => eliminarGenero(g)}>
            {g}
          </div>
        ))}

        <div className="tipo-select">
          <select
            name="tipo"
            onChange={(e) => HandleChangeTipos(e)}
            className="generosconteiner"
          >
            <option value=" ">Tipos..</option>
            <option value="serie">serie</option>
            <option value="pelicula">pelicula</option>
          </select>
        </div>

        <div className="conteinerbutton">
          <input
            type="submit"
            value="Enviar"
            disabled={Object.keys(error).length}
          />
        </div>
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
              src={joystick}
              alt="img"
            />
          </>
        ) : data.backDropImagen === "Alt" ? (
          <>
            <img
              className="imgconteinerbackDropImagen"
              src={joystick}
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
              src={joystick}
              alt="img"
            />
          </>
        ) : data.posterImagen === "Alt" ? (
          <>
            <img
              className="imgconteinerposterImagen"
              src={joystick}
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
    </>
  );
};

export default PutPeliculas;
