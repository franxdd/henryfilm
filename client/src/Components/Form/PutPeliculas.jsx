// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useState } from "react";
// import {
//   getTodo,
//   putPeliculas,
//   getGenerosMovies,
//   getGenerosSeries,
//   willunmont2,
// } from "../../Redux/Actions/Actions";
// import validate from "../../util/validate.js";
// import poster from "../../img/poster.jpg";
// import back from "../../img/backdrop.jpg";
// import "../../Styles/components/_FormPeliculas.scss";
// import { useParams } from "react-router-dom";

// const PutPeliculas = ({ info }) => {
//   let dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getGenerosMovies());
//     dispatch(getGenerosSeries());
//   }, [dispatch]);
//   const auxGenerosMovie = useSelector((state) => state.generosMovies);
//   const auxGenerosSerie = useSelector((state) => state.generosSeries);
//   const [tipo, setTipo] = useState("");
//   const [generos, setGeneros] = useState();

//   useEffect(() => {
//     console.log(tipo);

//     if (tipo === "serie") {
//       // generos = auxGenerosSerie.slice()
//       setGeneros(auxGenerosSerie);
//     } else if (tipo === "pelicula") {
//       // generos = auxGenerosMovie.slice()
//       setGeneros(auxGenerosMovie);
//     }
//   }, [tipo]);

//   let { id } = useParams();

//   let todos = useSelector((state) => state.todo);
//   // let generosPelis = useSelector((state) => state.generosMovies);
//   // let generosSerie = useSelector((state) => state.generosSeries);

//   // console.log("GenerosPelis", generosPelis)
//   // console.log("GenerosSerie", generosSerie)

//   var aux;
//   var auxId;

//   // if(id.includes("A-Z")){
//   //   auxId = id + ""
//   // }else{
//   //   auxId = Number(id)
//   // }

//   for (let i = 0; i < todos.length; i++) {
//     if (todos[i].id === Number(id)) {
//       aux = todos[i];
//     } else if (todos[i].id === id) {
//       aux = todos[i];
//     }
//   }
//   // console.log(aux)
//   // console.log(auxId)

//   // const generos = useSelector((state) => state.generosMovies);
//   // console.log("generosMovies", generos)
//   const [error, setError] = useState({ " ": " " });
//   const [data, setdata] = useState({
//     id: aux.id,
//     name: "",
//     genre_ids: [],
//     overview: "",
//     cast: [],
//     runtime: "",
//     release_date: "",
//     posterImagen: "",
//     backDropImagen: "",
//     vote_average: "",
//     popularity: "",
//     tipo: "",
//   });
//   console.log(data);

//   const HandleSubmit = (e) => {
//     e.preventDefault();
//     if (data.backDropImagen === "Alt") {
//       data.backDropImagen = poster;
//     }
//     if (data.posterImagen === "Alt") {
//       data.posterImagen = poster;
//     }

//     dispatch(putPeliculas(data));
//     alert("Pelicula Modificada");
//     setdata({
//       id: "",
//       name: "",
//       genre_ids: [],
//       overview: "",
//       cast: [],
//       runtime: "",
//       release_date: "",
//       posterImagen: "",
//       backDropImagen: "",
//       vote_average: "",
//       popularity: "",
//       tipo: "",
//     });
//     setError({ " ": " " });

//     for (let i = 0; i < e.target.length - 1; i++) {
//       if (e.target[i].localName === "input") {
//         if (e.target[i].id !== "elencobutton") {
//           e.target[i].value = "";
//         }
//       } else if (e.target[i].localName === "textarea") {
//         e.target[i].value = "";
//       } else if (e.target[i].localName === "select") {
//         e.target[i].selectedIndex = 0;
//       }
//     }
//   };

//   const HandleChangeGeneros = (e) => {
//     if (e.target.value !== " ") {
//       let arrset = [...new Set([e.target.value, ...data.genre_ids])];

//       setdata({
//         ...data,
//         genre_ids: arrset,
//       });
//       setError(
//         validate({
//           ...data,
//           genre_ids: arrset,
//         })
//       );
//     }
//   };

//   const HandleChangeTipos = (e) => {
//     setdata({
//       ...data,
//       tipo: e.target.value,
//     });
//     setError(
//       validate({
//         ...data,
//         tipo: e.target.value,
//       })
//     );
//   };

//   const HandleElenco = (e) => {
//     if (e.value !== "") {
//       setdata({ ...data, cast: [...data.cast, e.value] });
//       setError(validate({ ...data, cast: [...data.cast, e.value] }));
//       e.value = "";
//     }
//   };
//   const HandleInput = (e) => {
//     setdata({ ...data, [e.target.name]: e.target.value });
//     setError(validate({ ...data, [e.target.name]: e.target.value }));
//   };

//   const eliminarGenero = (g) => {
//     var arrAux = data.genre_ids.filter((fil) => fil !== g);
//     setdata({
//       ...data,
//       genre_ids: arrAux,
//     });
//   };

//   return (
//     <>
//       <div className="ContainerForm2">
//         <div className="FormPeliculas">
//           <form className="form2" onSubmit={HandleSubmit}>
//             <div className="pageTitle title"> Editar Producto </div>
//             {/* <div className="nombreconteiner">
//           <input
//             id="id"
//             type="text"
//             name="id"
//             placeholder="Id:"
//             className="name formEntry2"
//             onChange={(e) => HandleInput(e)}
//           />
//         </div> */}
//             <div className="nombreconteiner">
//               <input
//                 id="name"
//                 type="text"
//                 name="name"
//                 placeholder={aux.name}
//                 className="name formEntry2"
//                 onChange={(e) => HandleInput(e)}
//               />
//             </div>

//             <div className="descripcionconteiner">
//               <textarea
//                 id="Overview"
//                 type="text"
//                 name="overview"
//                 rows="5"
//                 placeholder={aux.overview}
//                 className="name formEntry2"
//                 maxLength="140"
//                 onChange={(e) => HandleInput(e)}
//               />
//             </div>
//             <section className="containerSelect">
//               <div className="dropdown">
//                 <select
//                   name="tipo"
//                   onChange={(e) => HandleChangeTipos(e)}
//                   className="dropdown-select"
//                 >
//                   <option value=" ">Tipos..</option>
//                   <option value="serie">serie</option>
//                   <option value="pelicula">pelicula</option>
//                 </select>
//               </div>
//             </section>
//             {aux.tipo === "pelicula" ? (
//               <div className="relasedconteiner">
//                 <input
//                   id="release_date"
//                   type="text"
//                   name="release_date"
//                   placeholder={aux.release_date}
//                   className="name formEntry2"
//                   onChange={(e) => HandleInput(e)}
//                 />
//               </div>
//             ) : (
//               <div className="relasedconteiner">
//                 <input
//                   id="release_date"
//                   type="text"
//                   name="release_date"
//                   placeholder={aux.first_air_date}
//                   className="name formEntry2"
//                   onChange={(e) => HandleInput(e)}
//                 />
//               </div>
//             )}

//             <div className="vote_averageconteiner">
//               <input
//                 id="vote_average"
//                 type="text"
//                 name="vote_average"
//                 placeholder={aux.vote_average}
//                 className="name formEntry2"
//                 onChange={(e) => HandleInput(e)}
//               />
//             </div>

//             <div className="popularityconteiner">
//               <input
//                 id="popularity"
//                 type="text"
//                 name="popularity"
//                 placeholder={aux.popularity}
//                 className="name formEntry2"
//                 onChange={(e) => HandleInput(e)}
//               />
//             </div>

//             {aux.tipo === "pelicula" ? (
//               <div className="duracionconteiner">
//                 <input
//                   id="runtime"
//                   type="text"
//                   name="runtime"
//                   placeholder="Duracion:"
//                   className="name formEntry2"
//                   onChange={(e) => HandleInput(e)}
//                 />
//               </div>
//             ) : (
//               <div className="duracionconteiner">
//                 <input
//                   id="runtime"
//                   type="text"
//                   name="runtime"
//                   placeholder={aux.episode_run_time}
//                   className="name formEntry2"
//                   onChange={(e) => HandleInput(e)}
//                 />
//               </div>
//             )}

//             <div className="elencoconteiner">
//               <input
//                 id="elenco"
//                 type="text"
//                 name="elenco"
//                 placeholder={aux.cast}
//                 className="name formEntry2"
//               />
//               <button
//                 className="submit formEntry2"
//                 id="elencobutton"
//                 value="Agregar"
//                 type="button"
//                 onClick={() => HandleElenco(document.getElementById("elenco"))}
//               >
//                 Agregar{" "}
//               </button>
//             </div>

//             <div className="nombreconteiner">
//               <input
//                 id="backDropImagen"
//                 type="text"
//                 name="backDropImagen"
//                 onChange={(e) => HandleInput(e)}
//                 placeholder={aux.backDropImagen}
//                 className="name formEntry2"
//               />
//             </div>

//             <div className="nombreconteiner">
//               <input
//                 id="posterImagen"
//                 type="text"
//                 name="posterImagen"
//                 onChange={(e) => HandleInput(e)}
//                 placeholder={aux.posterImagen}
//                 className="name formEntry2"
//               />
//             </div>

//             <section className="containerSelect">
//               <div className="dropdown">
//                 <select
//                   name="generos"
//                   onChange={(e) => HandleChangeGeneros(e)}
//                   className="dropdown-select"
//                 >
//                   <option value=" ">Generos..</option>
//                   {generos?.map((t) => (
//                     <option key={t.id} value={t.name}>
//                       {t.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </section>
//             {data.genre_ids?.map((g) => (
//               <div style={{ color: "white" }} onClick={() => eliminarGenero(g)}>
//                 {g}
//               </div>
//             ))}

//             <button
//               className="submit formEntry2"
//               type="submit"
//               value="Enviar"
//               disabled={Object.keys(error).length}
//             >
//               Enviar
//             </button>
//           </form>
//           <div className="erroresconteiner">
//             <h2 style={{ color: "white" }}>{error.name}</h2>
//             <h2 style={{ color: "white" }}>{error.genre_ids}</h2>
//             <h2 style={{ color: "white" }}>{error.overview}</h2>
//             <h2 style={{ color: "white" }}>{error.release_date}</h2>
//             <h2 style={{ color: "white" }}>{error.vote_average}</h2>
//             <h2 style={{ color: "white" }}>{error.cast}</h2>
//             <h2 style={{ color: "white" }}>{error.posterImagen}</h2>
//             <h2 style={{ color: "white" }}>{error.backDropImagen}</h2>
//             <h2 style={{ color: "white" }}>{error.popularity}</h2>
//             <h2 style={{ color: "white" }}>{error.tipo}</h2>
//           </div>

//           <div className="conteinerbackDropImagen">
//             <div className="backDropImagen" style={{ color: "white" }}>
//               Image back-drop
//             </div>

//             {data.backDropImagen.length === 0 ? (
//               <>
//                 <img
//                   className="imgconteinerbackDropImagen"
//                   src={back}
//                   alt="img"
//                 />
//               </>
//             ) : data.backDropImagen === "Alt" ? (
//               <>
//                 <img
//                   className="imgconteinerbackDropImagen"
//                   src={poster}
//                   alt="Debe ingresar una URL"
//                 />
//               </>
//             ) : (
//               <>
//                 <img
//                   className="imgconteinerbackDropImagen"
//                   src={data.backDropImagen}
//                   alt="Debe ingresar una URL"
//                 />
//               </>
//             )}
//           </div>

//           <div className="conteinerposterImagen">
//             <div className="posterImagen" style={{ color: "white" }}>
//               Image poster
//             </div>

//             {data.posterImagen.length === 0 ? (
//               <>
//                 <img
//                   className="imgconteinerposterImagen"
//                   src={poster}
//                   alt="img"
//                 />
//               </>
//             ) : data.posterImagen === "Alt" ? (
//               <>
//                 <img
//                   className="imgconteinerposterImagen"
//                   src={poster}
//                   alt="Debe ingresar una URL"
//                 />
//               </>
//             ) : (
//               <>
//                 <img
//                   className="imgconteinerposterImagen"
//                   src={data.posterImagen}
//                   alt="Debe ingresar una URL"
//                 />
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PutPeliculas;

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  putPeliculas,
  getGenerosMovies,
  getGenerosSeries,
  getMoviesDetail,
  getSeriesDetail,
  modificarMovie,
  modificarSerie,
} from "../../Redux/Actions/Actions";
import validate from "../../util/validate.js";
import poster from "../../img/poster.jpg";
import back from "../../img/backdrop.jpg";
import "../../Styles/components/_FormPeliculas.scss";

const PutPeliculas = () => {
  let { id, tipos } = useParams();
  let todos = useSelector((state) => state.todo);
  console.log(tipos)
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    dispatch(getGenerosMovies());
    if(tipos === 'pelicula'){

      dispatch(getMoviesDetail(id));

    }else if(tipos === 'serie'){

      dispatch(getSeriesDetail(id));

    }
    dispatch(getGenerosSeries());
  }, []);

  // var generos; // 343
  const auxGenerosMovie = useSelector((state) => state.generosMovies);
  const auxGenerosSerie = useSelector((state) => state.generosSeries);
  let thePelis = useSelector((state) => state.movieDetail);
  let theSeries = useSelector((state) => state.seriesDetail);
  // console.log("aaaaaaaaaaaaaaaaaa", thePelis);
  const [generos, setGeneros] = useState();
  const [tipo, setTipo] = useState("");
  const [error, setError] = useState({ " ": " " });
  const [data, setdata] = useState({
    id: id,
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
    // console.log(tipo);

    if (tipo === "serie") {
      // generos = auxGenerosSerie.slice()
      setGeneros(auxGenerosSerie);
    } else if (tipo === "pelicula") {
      // generos = auxGenerosMovie.slice()
      setGeneros(auxGenerosMovie);
    }
  }, [tipo]);

  const HandleSubmit = (e) => {

    e.preventDefault();
    // console.log("entre al inicio del submit");
    if (data.backDropImagen === "Alt") {
      data.backDropImagen = back;
    }
    if (data.posterImagen === "Alt") {
      data.posterImagen = poster;
    }
    // const reader = new FileReader();
    // reader.readAsDataURL(data.backDropImagen);

    // console.log(thePelis)

    if( thePelis.length !== 0 && !thePelis[0].creado && tipo === 'pelicula'){

      dispatch(modificarMovie(data))

    }else if(theSeries.length !== 0 && !theSeries[0].creado && tipo === 'serie'){

      dispatch(modificarSerie(data))
    }else{

      dispatch(putPeliculas(data));

    }


    // console.log(data);
    alert("Producto modificado");
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

  var aux;
  var auxId;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === Number(id)) {
      aux = todos[i];
    } else if (todos[i].id === id) {
      aux = todos[i];
    }
  }
  // console.log("Este es el aux", aux);

  return (
    <>
      <div className="ContainerForm2">
        <div className="FormPeliculas">
          <form className="form2" onSubmit={HandleSubmit}>
            <div className="pageTitle title"> Modificar producto </div>
            <div className="nombreconteiner">
              <h1></h1>
              <h6>Nombre</h6>
              <input
                id="name"
                type="text"
                name="name"
                placeholder={aux.name}
                className="name formEntry2"
                onChange={(e) => HandleInput(e)}
              />
            </div>
            <h6>Descripcion</h6>
            <textarea
              id="Overview"
              type="text"
              name="overview"
              rows="5"
              maxLength="140"
              className="message formEntry2"
              placeholder={aux.overview}
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
                <h6>Duracion</h6>
                <input
                  id="runtime"
                  type="text"
                  name="runtime"
                  placeholder={thePelis[0].runtime}
                  className="name formEntry2"
                  onChange={(e) => HandleInput(e)}
                />
              </div>
            ) : (
              <div>
                <div className="nombreconteiner">
                  <h6>Numero de episodios</h6>
                  <input
                    id="number_of_episodes"
                    type="text"
                    name="number_of_episodes"
                    placeholder={aux.number_of_episodes}
                    className="name formEntry2"
                    onChange={(e) => HandleInput(e)}
                  />
                </div>
                <div className="nombreconteiner">
                  <h6>Duracion del episodio</h6>
                  <input
                    id="episode_run_time"
                    type="text"
                    name="episode_run_time"
                    placeholder={aux.episode_run_time}
                    className="name formEntry2"
                    onChange={(e) => HandleInput(e)}
                  />
                </div>
                <div className="nombreconteiner">
                  <h6>Numero de temporadas</h6>
                  <input
                    id="number_of_seasons"
                    type="text"
                    name="number_of_seasons"
                    placeholder={aux.number_of_seasons}
                    className="name formEntry2"
                    onChange={(e) => HandleInput(e)}
                  />
                </div>
              </div>
            )}

            {data && data.tipo === "pelicula" ? (
              <div className="nombreconteiner">
                <h6>Fecha de lanzamiento</h6>
                <input
                  id="release_date"
                  type="text"
                  name="release_date"
                  placeholder={thePelis[0].release_date}
                  className="name formEntry2"
                  onChange={(e) => HandleInput(e)}
                />
              </div>
            ) : (
              <></>
            )}

            <div className="nombreconteiner">
              <h6>Promedio de puntuacion</h6>
              <input
                id="vote_average"
                type="text"
                name="vote_average"
                placeholder={aux.vote_average}
                className="name formEntry2"
                onChange={(e) => HandleInput(e)}
              />
            </div>

            <div className="nombreconteiner">
              <h6>Popularidad</h6>
              <input
                id="popularity"
                type="text"
                name="popularity"
                placeholder={aux.popularity}
                className="name formEntry2"
                onChange={(e) => HandleInput(e)}
              />
            </div>

            <div className="nombreconteiner">
              <h6>Elenco</h6>
              {data && data.tipo === "pelicula" ? (
                <input
                  id="elenco"
                  type="text"
                  name="elenco"
                  placeholder={thePelis[0].cast}
                  className="name formEntry2"
                />
              ) : (
                <input
                  id="elenco"
                  type="text"
                  name="elenco"
                  placeholder={aux.cast}
                  className="name formEntry2"
                />
              )}
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
              <h6>Poster</h6>
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
              <h6>Imagen de fondo</h6>
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

export default PutPeliculas;
