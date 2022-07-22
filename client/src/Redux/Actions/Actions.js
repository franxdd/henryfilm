import axios from "axios";

export const DETAIL = "DETAIL";
export const GET_ALL_SERIES = "GET_ALL_SERIES";
export const GET_ALL_MOVIES = "GET_ALL_MOVIES";
export const GET_NAME_SERIES = "GET_NAME_SERIES";
export const GET_NAME_MOVIES = "GET_NAME_MOVIES";

export const GET_NAME = "GET_NAME";
export const GET_SERIES_DETAIL = "GET_SERIES_DETAIL";
export const GET_MOVIES_DETAIL = "GET_MOVIES_DETAIL";

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
      let json = await axios.get("http://localhost:3001/series/detalleDeSerie?name=" + name);
      return dispatch({
        type: GET_NAME_SERIES,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getnameMovies = (name) => {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/peliculas?name=" + name);
      return dispatch({
        type: GET_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
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
