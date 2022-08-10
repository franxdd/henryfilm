import axios from "axios";
import { toast } from "react-toastify";
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
export const PUT_PELICULA = "PUT_PELICULA";
export const POST_COMENTARIO = "POST_COMENTARIO";
export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const REMOVE_TO_WISHLIST = "REMOVE_TO_WISHLIST";
// export const POST_PAGOS = "POST_PAGOS"
export const GET_REVIEW = "GET_REVIEW";
export const POST_REVIEW = "POST_REVIEW";
export const GOOGLE_USER = "GOOGLE_USER";
export const GOOGLE_LOG_OUT = "GOOGLE_LOG_OUT";
export const POST_HISTORIAL = "POST_HISTORIAL";
export const PUT_PROFILE = "PUT_PROFILE";
export const USER_MODIFICADO = "USER_MODIFICADO";
export const GET_HISTORIAL = "GET_HISTORIAL";
export const DELETED_MOVIE = "DELETED_MOVIE";
export const DELETED_SERIE = "DELETED_SERIE";
export const MODIFICAR_MOVIE = "MODIFICAR_MOVIE";
export const MODIFICAR_SERIE = "MODIFICAR_SERIE";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const PUT_ADMIN = "PUT_ADMIN";

function a(error) {
  return toast.error(error, {
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
function b(mensaje) {
  return toast.success(mensaje, {
    position: "bottom-left",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
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

export const postHistorial = (payload) => {
  // console.log(payload)
  return async function (dispatch) {
    try {
      let postHistorial = await axios.post(`/historial/agregar`, payload);
      return dispatch({
        type: POST_HISTORIAL,
        payload: postHistorial.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getHistorial = (id) => {
  // console.log(id)
  return async function (dispatch) {
    try {
      let getHistorial = await axios.get(`/historial/${id}`);
      // console.log(getHistorial.data)
      return dispatch({
        type: GET_HISTORIAL,
        payload: getHistorial.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteMovie = (payload) => {
  console.log(payload);
  return async function (dispatch) {
    let deleted = await axios.post(`/productosEliminados/postProd`, payload);


    return dispatch({
      type: DELETED_MOVIE,
      payload: payload[0],
    });
  };
};

export const deleteSerie = (payload) => {
  console.log(payload);
  return async function (dispatch) {
    let deleted = await axios.post(`/productosEliminados/postProd`, payload);
    console.log(deleted);
    return dispatch({
      type: DELETED_SERIE,
      payload: payload[0],
    });
  };
};

export const modificarMovie = (payload) => {
  return async function (dispatch) {
    let deleted = await axios.post(`/productosModificados/postProd`, payload);

    return dispatch({
      type: MODIFICAR_MOVIE,
      payload: payload[0],
    });
  };
};

export const modificarSerie = (payload) => {
  return async function (dispatch) {
    let deleted = await axios.post(`/productosModificados/postProd`, payload);

    return dispatch({
      type: MODIFICAR_SERIE,
      payload: payload[0],
    });
  };
};

export const getAllSeries = () => {
  return async function (dispatch) {
    let getAllSeries = await axios(`/series`);
    return dispatch({
      type: GET_ALL_SERIES,
      payload: getAllSeries.data,
    });
  };
};

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
      let json = await axios.get("/series/detalleDeSerie?name=" + name);
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
      let json = await axios.get("/peliculas?name=" + name);
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
  return async function (dispatch) {
    let getMoviesDetail = await axios(`/peliculas/${id}`);
    return dispatch({
      type: GET_MOVIES_DETAIL,
      payload: getMoviesDetail.data,
    });
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
    try {
      let created = await axios.post("/usuarios/register", payload);
      // console.log(created.data)
      return dispatch({ type: POST_USUARIOS });
    } catch (error) {
      console.log(error);
    }
  };
};
export const checkState = () => {
  return {
    type: CHECK_STATE,
  };
};

export const PostLogin = (payload) => {
  return async function (dispatch) {
    try {
      let created = await axios.post("/usuarios/login", payload);
      // {
      //   // withCredentials: true,
      // });

      sessionStorage.setItem("token", JSON.stringify(created.data[0]));

      return dispatch(
        { type: POST_LOGIN, payload: created.data },
        b(created.data[3])
      );
    } catch (error) {
      console.log("lelele", error);
      a(error.response.data);
      return error;
    }
  };
};

export const logOut = (payload) => {
  return async function (dispatch) {
    try {
      // console.log(payload)
      await axios.post("/carro/post", payload);
      await axios.post("/deseados/agregar", payload);
    } catch (error) {
      console.log(error);
    }
    // {
    //   // withCredentials: true,
    // });

    // sessionStorage.setItem("token", JSON.stringify(created.data));

    return dispatch({ type: LOG_OUT });
  };
};
export const signInUser = (payload) => {
  return async function (dispatch) {
    try {
      console.log("entro a al action");
      var user = await axios.post("/usuarios/google", payload);
    } catch (error) {
      console.log(error);
    }
    // {
    //   // withCredentials: true,
    // });
    // console.log(user);
    // sessionStorage.setItem("token", JSON.stringify(user.data));

    return dispatch({ type: GOOGLE_USER, payload: user.data });
  };
};

export const googleLogOut = () => {
  return {
    type: GOOGLE_LOG_OUT,
  };
};
export const getUser = (token) => {
  return async function (dispatch) {
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

export const getGenerosSeries = (payload) => {
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
    let created = await axios.post("/peliculas/postPelicula", payload);
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
  return async function (dispatch) {
    try {
      let json = await axios.get(`/series/traductor/${id}/${string} `);
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
  return async (dispatch) => {
    let created = await axios.put(
      `/${payload.tipo}s/modificar/${payload.id}`,
      payload
    );
    dispatch({
      type: PUT_PELICULA,
      payload: created,
    });
  };
};
export const createReview = (payload) => {
  return async (dispatch) => {
    let creado = await axios.post("/comentarios/agregar", payload);
    return dispatch({
      type: POST_REVIEW,
      payload: creado.data,
    });
  };
};

export const getReview = (payload) => {
  return async (dispatch) => {
    let creado = await axios.get(
      `/comentarios?id=${payload.id}&tipo=${payload.tipo}`
    );
    return dispatch({
      type: GET_REVIEW,
      payload: creado.data,
    });
  };
};

export const addToWishlist = (payload) => {
  return (dispatch) =>
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: payload,
    });
};

export const removeToWishlist = (id) => {
  return (dispatch) =>
    dispatch({
      type: REMOVE_TO_WISHLIST,
      payload: id,
    });
};

export const putProfile = (payload) => {
  console.log(payload);
  return async (dispatch) => {
    try {
      let profile = await axios.put(`/usuarios/IProfile`, payload);

      dispatch({
        type: PUT_PROFILE,
        payload: profile.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const usermodificado = (payload) => {
  return {
    type: USER_MODIFICADO,
    payload: payload,
  };
};

export const allusers = () => {
  console.log("estoy entrando en la action");
  return async function (dispatch) {
    try {
      let getUsers = await axios.get(`/usuarios`);

      return dispatch({
        type: GET_ALL_USERS,
        payload: getUsers.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const putAdmin = (payload) => {
  console.log(payload);
  return async (dispatch) => {
    try {
      let profileA = await axios.put(`/usuarios/cambiar`, payload);

      dispatch({
        type: PUT_ADMIN,
        payload: profileA.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};