import  { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  postPeliculas,
  getGenerosMovies,
  getGenerosSeries,
} from "../../Redux/Actions/Actions";
import validate from "../../util/validate.js";
import poster from "../../img/poster.jpg";
import back from "../../img/backdrop.jpg";
import "../../Styles/components/_FormPeliculas.scss";

const FormPeliculas = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    dispatch(getGenerosMovies());
    dispatch(getGenerosSeries());
  }, []);

  // var generos; // 343
  const auxGenerosMovie = useSelector((state) => state.generosMovies);
  const auxGenerosSerie =useSelector((state) => state.generosSeries);
  const [generos, setGeneros] = useState();
  const [tipo, setTipo] = useState("");
  const [error, setError] = useState({ " ": " " });
  const [data, setdata] = useState({
    name: "",
    genre_ids: [],
    overview: "",
    cast: [],
    runtime: "",
    release_date: "",
    number_of_episodes: "",
    episode_run_time: "",
    number_of_seasons: "",
    posterImagen: null,
    backDropImagen: null,
    vote_average: "",
    popularity: "",
    tipo: "",
  });

  useEffect(() => {

    console.log(tipo)

    if (tipo === "serie") {
      // generos = auxGenerosSerie.slice()
      setGeneros(auxGenerosSerie)
    } else if (tipo === "pelicula") {
      // generos = auxGenerosMovie.slice()
      setGeneros(auxGenerosMovie)
      
    }
  }, [tipo]);

  const HandleSubmit = (e) => {
    e.preventDefault();
    console.log("entre al inicio del submit");
    if (data.backDropImagen === "Alt") {
      data.backDropImagen = back;
    }
    if (data.posterImagen === "Alt") {
      data.posterImagen = poster;
    }
    // const reader = new FileReader();
    // reader.readAsDataURL(data.backDropImagen);
    
    dispatch(postPeliculas(data));
    console.log(data);
    alert("Pelicula creada");
    setdata({
      name: "",
      genre_ids: [],
      overview: "",
      cast: [],
      runtime: "",
      release_date: "",
      number_of_episodes: "",
      episode_run_time: "",
      number_of_seasons: "",
      posterImagen: null,
      backDropImagen: null,
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

    navigate("/home", { replace: true });
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
    setTipo(e.target.value);
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
    if (e.target.id === "posterImagen") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setdata({
          ...data,
          posterImagen: reader.result,
        });
        // setImagenformulario({
        //   ...imagenformulario,
        // posterImagen: reader.result,
        // });
      };
    } else if (e.target.id === "backDropImagen") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setdata({
          ...data,
          backDropImagen: reader.result,
        });
      };
    } else {
      setdata({
        ...data,
        [e.target.name]: e.target.value,
      });
    }

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
          <form className="form2" onSubmit={HandleSubmit}>
            <div className="pageTitle title"> Agregar nuevo: </div>
            <div className="nombreconteiner">
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Nombre:"
                className="name formEntry2"
                onChange={(e) => HandleInput(e)}
              />
            </div>
            <textarea
              id="Overview"
              type="text"
              name="overview"
              rows="5"
              maxLength="140"
              className="message formEntry2"
              placeholder="Descripción:"
              onChange={(e) => HandleInput(e)}
            />
            <section className="containerSelect">
              <div className="dropdown">
                <select
                  name="tipo"
                  onChange={(e) => HandleChangeTipos(e)}
                  className="dropdown-select"
                >
                  <option value=" ">Tipos..</option>
                  <option value="serie">serie</option>
                  <option value="pelicula">pelicula</option>
                </select>
              </div>
            </section>
            {data && data.tipo === "pelicula" ? (
              <div className="nombreconteiner">
                <input
                  id="runtime"
                  type="text"
                  name="runtime"
                  placeholder="Duración:"
                  className="name formEntry2"
                  onChange={(e) => HandleInput(e)}
                />
              </div>
            ) : (
              <div>
                <div className="nombreconteiner">
                  <input
                    id="number_of_episodes"
                    type="text"
                    name="number_of_episodes"
                    placeholder="Episodios:"
                    className="name formEntry2"
                    onChange={(e) => HandleInput(e)}
                  />
                </div>
                <div className="nombreconteiner">
                  <input
                    id="episode_run_time"
                    type="text"
                    name="episode_run_time"
                    placeholder="Duración:"
                    className="name formEntry2"
                    onChange={(e) => HandleInput(e)}
                  />
                </div>
                <div className="nombreconteiner">
                  <input
                    id="number_of_seasons"
                    type="text"
                    name="number_of_seasons"
                    placeholder="Temporadas:"
                    className="name formEntry2"
                    onChange={(e) => HandleInput(e)}
                  />
                </div>
              </div>
            )}
            {data && data.tipo === "pelicula" ? (


            <div className="nombreconteiner">
              <input
                id="release_date"
                type="text"
                name="release_date"
                placeholder="Released:"
                className="name formEntry2"
                onChange={(e) => HandleInput(e)}
              />
            </div>



            ):(
              <></>
            )}

            <div className="nombreconteiner">
              <input
                id="vote_average"
                type="text"
                name="vote_average"
                placeholder="Rating:"
                className="name formEntry2"
                onChange={(e) => HandleInput(e)}
              />
            </div>

            <div className="nombreconteiner">
              <input
                id="popularity"
                type="text"
                name="popularity"
                placeholder="Popularidad:"
                className="name formEntry2"
                onChange={(e) => HandleInput(e)}
              />
            </div>

            <div className="nombreconteiner">
              <input
                id="elenco"
                type="text"
                name="elenco"
                placeholder="Elenco:"
                className="name formEntry2"
              />
              <button
                className="submit formEntry2"
                id="elencobutton"
                value="Agregar"
                type="button"
                onClick={() => HandleElenco(document.getElementById("elenco"))}
              >
                Agregar{" "}
              </button>
            </div>

            <div className="nombreconteiner">
              <input
                id="posterImagen"
                type="file"
                name="posterImagen"
                onChange={(e) => HandleInput(e)}
                // onChange={(e) => HandleImageInput(e)}
                placeholder="Imagen poster:"
                className="name formEntry2"
              />
            </div>
            <div className="nombreconteiner">
              <input
                id="backDropImagen"
                type="file"
                name="backDropImagen"
                onChange={(e) => HandleInput(e)}
                placeholder="Imagen backDrop  :"
                className="name formEntry2"
              />
            </div>
            {data.tipo !== "" ? (
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
            ) : (
              <></>
            )}

            {data.genre_ids?.map((g) => (
              <div style={{ color: "white" }} onClick={() => eliminarGenero(g)}>
                {g}
              </div>
            ))}

            <button
              className="submit formEntry2"
              type="submit"
              value="Enviar"
              disabled={Object.keys(error).length}
            >
              Enviar
            </button>
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
            <h2 style={{ color: "white" }}>{error.runtime}</h2>
            <h2 style={{ color: "white" }}>{error.episode_run_time}</h2>
            <h2 style={{ color: "white" }}>{error.number_of_episodes}</h2>
          </div>

          <div className="conteinerbackDropImagen">
            <div className="backDropImagen" style={{ color: "white" }}>
              Image back-drop
            </div>

            {!data.backDropImagen ? (
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
                  src={back}
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

            {!data.posterImagen ? (
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

export default FormPeliculas;
