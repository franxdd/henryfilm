import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

const FormPeliculas = () => {
  const generos = useSelector((state) => state.generosMovies);
  const [data, setdata] = useState({
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
  });
  const HandleElenco = (e, elenco)=>{
    e.preventDefault();
    console.log(e)
    // console.log(elenco)
    // console.log(data)

    setdata({ ...data, cast : [...data.cast ,e.target.value]   });

  }
  const HandleInput = (e) => {

    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  return (
    <form>
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
          id="Description"
          type="text"
          name="description"
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
          id="released_date"
          type="text"
          name="released_date"
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
          id="duracion"
          type="text"
          name="duracion"
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
        //   onChange={(e) => HandleElenco(e)}
        />
        <button id="elenco" onClick={(e) => HandleElenco(e)}>AGREGAR</button>
      </div>

      <div className="imagenbackdropconteiner">
        <label style={{ color: "white" }} className="label">
          Imagen back-drop:
        </label>
        <input
          id="backdrop"
          type="text"
          name="backdrop"
          onChange={(e) => HandleInput(e)}
          className="inputconteiner"
        />
      </div>

      <div className="posterconteiner">
        <label style={{ color: "white" }} className="label">
          Imagen poster:
        </label>
        <input
          id="poster"
          type="text"
          name="poster"
          onChange={(e) => HandleInput(e)}
          className="inputconteiner"
        />
      </div>

      <div className="generos-select">
        <select
          name="generos"
          // onChange={(e) => HandleChangeGeneros(e)}
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

      <div className="conteinerbutton">
        <input
          type="submit"
          value="Enviar"
          // disabled={Object.keys(error).length}
          // className={
          //   Object.keys(error).length
          //     ? "buttonformdisabled"
          //     : "buttonform"
          // }
        />
      </div>
    </form>
  );
};

export default FormPeliculas;
