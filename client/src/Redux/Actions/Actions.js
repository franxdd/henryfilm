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

export const FILTER_NAME = "FILTER_NAME";
export const CLEAR = "CLEAR";
export const GET_GENEROS_MOVIES = "GET_GENEROS_MOVIES";
export const GET_GENEROS_SERIES = "GET_GENEROS_SERIES";
export const POST_PELICULAS = "POST_PELICULAS";

export const getAllSeries = () => {
  return (dispatch) => {
    return fetch("http://localhost:3001/series")
      .then((r) => r.json())
      .then((series) => {
        dispatch({
          type: GET_ALL_SERIES,
          payload: series,
        });
      });
  };
};
export function getAllMovies() {
  return function (dispatch) {
    return fetch("http://localhost:3001/peliculas")
      .then((r) => r.json())
      .then((rjson) =>
        dispatch({
          type: GET_ALL_MOVIES,
          payload: rjson,
        })
      );
  };
}
export const getnameSeries = (name) => {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        "http://localhost:3001/series/detalleDeSerie?name=" + name
      );
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
      let json = await axios.get(
        "http://localhost:3001/peliculas?name=" + name
      );
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
  return (dispatch) => {
    return fetch(`http://localhost:3001/series/seriePorId/${id}`)
      .then((r) => r.json())
      .then((data) => {
        dispatch({
          type: GET_SERIES_DETAIL,
          payload: data,
        });
      });
  };
};

export const getMoviesDetail = (id) => {
  return (dispatch) => {
    return fetch(`http://localhost:3001/peliculas/${id}`)
      .then((r) => r.json())
      .then((data) => {
        dispatch({
          type: GET_MOVIES_DETAIL,
          payload: data,
        });
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
  return function (dispatch) {
    return fetch("http://localhost:3001/generos/peliculas")
      .then((r) => r.json())
      .then((rjson) =>
        dispatch({
          type: GET_GENEROS_MOVIES,
          payload: rjson,
        })
      );
  };
};

export const getGenerosSeries = () => {
  return function (dispatch) {
    return fetch("http://localhost:3001/generos/series")
      .then((r) => r.json())
      .then((rjson) =>
        dispatch({
          type: GET_GENEROS_SERIES,
          payload: rjson,
        })
      );
  };
};

export const postPeliculas = (payload) => {
  return async function (dispatch) {
    let created = await axios.post(
      "http://localhost:3001/peliculas/postPelicula",
      payload
    );

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

export function getTodo() {
  return function (dispatch) {
    return fetch("http://localhost:3001/todos")
      .then((r) => r.json())
      .then((rjson) =>
        dispatch({
          type: GET_TODO,
          payload: rjson,
        })
      );
  };
}

export const filterName = (payload) => {
  return (dispatch) =>
    dispatch({
      type: FILTER_NAME,
      payload: payload,
    });
};
