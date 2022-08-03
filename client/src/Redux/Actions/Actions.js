import axios from "axios";

export const DETAIL = "DETAIL";
export const GET_ALL_SERIES = "GET_ALL_SERIES";
export const GET_ALL_MOVIES = "GET_ALL_MOVIES";
export const GET_NAME_SERIES = "GET_NAME_SERIES";
export const GET_NAME_MOVIES = "GET_NAME_MOVIES";
export const WILLUNMOUNT = "WILLUNMOUNT";
export const WILLUNMOUNT2 = "WILLUNMOUNT2";
export const GET_NAME = "GET_NAME";
export const GET_SERIES_DETAIL = "GET_SERIES_DETAIL";
export const GET_MOVIES_DETAIL = "GET_MOVIES_DETAIL";
export const ORDER_NAME_ASC = "ORDER_NAME_ASC";
export const ORDER_NAME_DES = "ORDER_NAME_DES";
export const ORDER_VOTE_AVG_ASC = "ORDER_VOTE_AVG_ASC";
export const ORDER_VOTE_AVG_DES = "ORDER_VOTE_AVG_DES";
export const GET_GENEROS = "GET_GENEROS";
export const FILTRO_GENERO_MOVIES = "FILTRO_GENERO_MOVIES";
export const FILTRO_GENERO_SERIES = "FILTRO_GENERO_SERIES";
export const FILTRO_GENERO_MOVIES_REVERSA = "FILTRO_GENERO_MOVIES_REVERSA";
export const FILTRO_GENERO_SERIES_REVERSA = "FILTRO_GENERO_SERIES_REVERSA";
export const GET_TODO = "GET_TODO";
export const GET_CARUSEL = "GET_CARUSEL";
export const FILTER_NAME = "FILTER_NAME";
export const CLEAR = "CLEAR";
export const GET_GENEROS_MOVIES = "GET_GENEROS_MOVIES";
export const GET_GENEROS_SERIES = "GET_GENEROS_SERIES";
export const POST_PELICULAS = "POST_PELICULAS";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_TO_CART = "REMOVE_TO_CART";
export const ADJUST_QTY = "ADJUST_QTY";
export const LOAD_CURRENT_ITEM = "LOAD_CURRENT_ITEM";
export const GET_LENGUAJE = "GET_LENGUAJE";
export const ENGLISH = "ENGLISH";
export const GET_ISOS = "GET_ISOS";
export const POST_USUARIOS = "POST_USUARIOS";
export const POST_LOGIN = "POST_LOGIN";
export const GET_USER = "GET_USER";
export const CHECK_STATE = "CHECK_STATE";
export const LOG_OUT = "LOG_OUT";
<<<<<<< HEAD

=======
export const PUT_PELICULA = "PUT_PELICULA";

// export const getAllSeries = () => {
//   return (dispatch) => {
//     return fetch("http://localhost:3001/series")
//       .then((r) => r.json())
//       .then((series) => {
//         dispatch({
//           type: GET_ALL_SERIES,
//           payload: series,
//         });
//       });
//   };
// };
>>>>>>> 38c4b7b4acfb6ad9cf5b3b39aba432374b44338a
export const getAllSeries = () => {
  return async function (dispatch) {
    let getAllSeries = await axios(`/series`);
    return dispatch({
      type: GET_ALL_SERIES,
      payload: getAllSeries.data,
    });
  };
};

// export function getAllMovies() {
//   return function (dispatch) {
//     return fetch("http://localhost:3001/peliculas")
//       .then((r) => r.json())
//       .then((rjson) =>
//         dispatch({
//           type: GET_ALL_MOVIES,
//           payload: rjson,
//         })
//       );
//   };
// }
export const getAllMovies = () => {
  return async function (dispatch) {
    let getAllMovies = await axios(`/peliculas`);
    return dispatch({
      type: GET_ALL_MOVIES,
      payload: getAllMovies.data,
    });
  };
};

export const getnameSeries = (name) => {
  return async function (dispatch) {
    try {
<<<<<<< HEAD
      let json = await axios.get("http://localhost:3001/series/detalleDeSerie?name=" + name);
=======
      let json = await axios.get("/series/detalleDeSerie?name=" + name);
>>>>>>> 38c4b7b4acfb6ad9cf5b3b39aba432374b44338a
      return dispatch({
        type: GET_NAME_SERIES,
        payload: json.data,
      });
    } catch (error) {
      alert("No se existe!!");
    }
  };
};
export const getnameMovies = (name) => {
  return async function (dispatch) {
    try {
<<<<<<< HEAD
      let json = await axios.get("http://localhost:3001/peliculas?name=" + name);
=======
      let json = await axios.get("/peliculas?name=" + name);
>>>>>>> 38c4b7b4acfb6ad9cf5b3b39aba432374b44338a
      return dispatch({
        type: GET_NAME_MOVIES,
        payload: json.data,
      });
    } catch (error) {
      alert("No se existe!!");
    }
  };
};
export const getSeriesDetail = (id) => {
  return async function (dispatch) {
    let getSeriesDetail = await axios(`/series/seriePorId/${id}`);
    return dispatch({
      type: GET_SERIES_DETAIL,
      payload: getSeriesDetail.data,
    });
  };
};

export const getMoviesDetail = (id) => {
<<<<<<< HEAD
  return (dispatch) => {
    return fetch(`http://localhost:3001/peliculas/${id}`)
      .then((r) => r.json())
      .then((data) => {
        dispatch({
          type: GET_MOVIES_DETAIL,
          payload: data,
        });
      });
=======
  return async function (dispatch) {
    let getMoviesDetail = await axios(`/peliculas/${id}`);
    return dispatch({
      type: GET_MOVIES_DETAIL,
      payload: getMoviesDetail.data,
    });
>>>>>>> 38c4b7b4acfb6ad9cf5b3b39aba432374b44338a
  };
};
export const willunmont = () => {
  return function (dispatch) {
    return dispatch({
      type: WILLUNMOUNT,
    });
  };
};

export const PostUsuario = (payload) => {
  return async function (dispatch) {
<<<<<<< HEAD
    let created = await axios.post("http://localhost:3001/usuarios/register", payload);
=======
    let created = await axios.post("/usuarios/register", payload);
>>>>>>> 38c4b7b4acfb6ad9cf5b3b39aba432374b44338a
    // console.log(created.data)
    return dispatch({ type: POST_USUARIOS });
  };
};
<<<<<<< HEAD
=======

>>>>>>> 38c4b7b4acfb6ad9cf5b3b39aba432374b44338a
export const checkState = () => {
  return {
    type: CHECK_STATE,
  };
};

export const PostLogin = (payload) => {
  console.log(payload);
  return async function (dispatch) {
<<<<<<< HEAD
    let created = await axios.post("http://localhost:3001/usuarios/login", payload, { withCredentials: true });
=======
    let created = await axios.post("/usuarios/login", payload);
    // {
    //   // withCredentials: true,
    // });
>>>>>>> 38c4b7b4acfb6ad9cf5b3b39aba432374b44338a

    sessionStorage.setItem("token", JSON.stringify(created.data));
    console.log(created.data);

    return dispatch({ type: POST_LOGIN, payload: created.data });
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};

export const getUser = (token) => {
  return async function (dispatch) {
    // console.log("access-token=" + token);
    var obj = {
      "access-token": token,
    };

    let created = await axios.get(
      "/usuarios/profile",

      {
        headers: {
          Cookies: JSON.stringify(obj),
        },
      }
    );
    return dispatch({ type: GET_USER, payload: created.data });

    // ).then((response)=>{
    //   console.log(response)
    //   return dispatch({ type: GET_USER, payload: response.data })

    // }).catch((err)=>{
    //   console.log(err)
    //   return 'Error'
    // })
  };
};

//Agrego aca abajo las accions para los ordenamiento y los filtros

//ordenamiento sin hacer

export const orderNameASC = (array) => {
  return {
    type: ORDER_NAME_ASC,
    payload: array,
  };
};

export const orderNameDES = (array) => {
  return {
    type: ORDER_NAME_DES,
    payload: array,
  };
};

export const orderVoteAvgASC = (array) => {
  return {
    type: ORDER_VOTE_AVG_ASC,
    payload: array,
  };
};

export const orderVoteAvgDES = (array) => {
  return {
    type: ORDER_VOTE_AVG_DES,
    payload: array,
  };
};

export const getGenerosMovies = () => {
  return async function (dispatch) {
    let getGenerosMovies = await axios("/generos/peliculas");
    return dispatch({
      type: GET_GENEROS_MOVIES,
      payload: getGenerosMovies.data,
    });
  };
};

export const getGenerosSeries = () => {
  return async function (dispatch) {
    let getGenerosSeries = await axios("/generos/series");
    return dispatch({
      type: GET_GENEROS_SERIES,
      payload: getGenerosSeries.data,
    });
  };
};

export const postPeliculas = (payload) => {
  return async function (dispatch) {
<<<<<<< HEAD
    let created = await axios.post("http://localhost:3001/peliculas/postPelicula", payload);
=======
    let created = await axios.post("/peliculas/postPelicula", payload);
>>>>>>> 38c4b7b4acfb6ad9cf5b3b39aba432374b44338a
    return dispatch({ type: POST_PELICULAS, payload: created.data });
  };
};

export const filtradoGeneroMovies = (arrGenerosMovies) => {
  return {
    type: FILTRO_GENERO_MOVIES,
    payload: [arrGenerosMovies],
  };
};

export const filtradoGeneroSeries = (arrGenerosSeries) => {
  return {
    type: FILTRO_GENERO_SERIES,
    payload: [arrGenerosSeries],
  };
};

export const filtradoGeneroMoviesReversa = (arrGenerosMovies) => {
  return {
    type: FILTRO_GENERO_MOVIES_REVERSA,
    payload: arrGenerosMovies,
  };
};

export const filtradoGeneroSeriesReversa = (arrGenerosSeries) => {
  return {
    type: FILTRO_GENERO_SERIES_REVERSA,
    payload: arrGenerosSeries,
  };
};

// export const clear = (tipo) => {
//   return {
//     type: CLEAR,
//     payload: tipo,
//   };
// };

export const willunmont2 = () => {
  return function (dispatch) {
    return dispatch({
      type: WILLUNMOUNT2,
    });
  };
};

export const getTodo = () => {
  return async function (dispatch) {
    let getTodo = await axios("/todos");
    return dispatch({
      type: GET_TODO,
      payload: getTodo.data,
    });
  };
};

export const filterName = (payload) => {
  return (dispatch) =>
    dispatch({
      type: FILTER_NAME,
      payload: payload,
    });
};
export const addToCart = (payload) => {
  return (dispatch) =>
    dispatch({
      type: ADD_TO_CART,
      payload: payload,
    });
};
export const removeCart = (id) => {
  return (dispatch) =>
    dispatch({
      type: REMOVE_TO_CART,
      payload: id,
    });
};
export const adjusq = (id, value) => {
  return (dispatch) =>
    dispatch({
      type: ADJUST_QTY,
      payload: {
        id: id,
        value: value,
      },
    });
};

export const setdetailLenguage = (id, string) => {
  console.log(string);
  return async function (dispatch) {
    try {
<<<<<<< HEAD
      let json = await axios.get(`http://localhost:3001/series/traductor/${id}/${string} `);
=======
      let json = await axios.get(`/series/traductor/${id}/${string} `);
>>>>>>> 38c4b7b4acfb6ad9cf5b3b39aba432374b44338a
      return dispatch({
        type: GET_LENGUAJE,
        payload: json.data,
      });
    } catch (error) {
      alert("No se existe!!");
    }
  };
};
export const getIso = (id) => {
  return async function (dispatch) {
    let getIso = await axios(`/languages/${id}`);
    return dispatch({
      type: GET_ISOS,
      payload: getIso.data,
    });
  };
};
export const getIdioma = (payload) => {
  return (dispatch) =>
    dispatch({
      type: ENGLISH,
      payload: payload,
    });
};

export const loadCurren = (payload) => {
  return (dispatch) =>
    dispatch({
      type: LOAD_CURRENT_ITEM,
      payload: payload,
    });
};

export const putPeliculas = (payload) => {
  console.log(payload);
  return async (dispatch) => {
    let created = await axios.put(
      `/peliculas/modificarPeli/${payload.id}`,
      payload
    );
    dispatch({
      type: PUT_PELICULA,
      payload: created,
    });
  };
};
