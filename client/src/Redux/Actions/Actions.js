import axios from "axios";

export const DETAIL = "DETAIL";
export const GET_ALL_SERIES = "GET_ALL_SERIES";
export const GET_ALL_MOVIES = "GET_ALL_MOVIES";
export const GET_NAME = "GET_NAME";

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
<<<<<<< HEAD
export const getnameSeries = (name) => {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        "http://localhost:3001/series/detalleDeSerie?name=" + name
      );
      return dispatch({
        type: GET_NAME,
        payload: json.data,
      });
    } catch (error) {
      alert(error.response.data);
    }
  };
};
=======


export function getMovie(id) {

  return function (dispatch) {
    return fetch(`http://localhost:3001/peliculas/pelicula?${id}`)
      .then((r) => r.json())
      .then((rjson) =>
        dispatch({
          type: GET_ALL_MOVIES,
          payload: rjson,
        })
      );
  };
}



>>>>>>> 6190bda2ea512fa4845e49a54a8ed2b7828a084b
