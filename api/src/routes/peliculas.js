const { Router } = require("express");
const route = Router();
const {
  getAllMovies,
  getMovie,
  getMovieDetail,
  getMovieDetailParams,
} = require("../servicies/peliculas.js");
require("dotenv").config();

route.get("/", getAllMovies); //   /peliculas
route.get("/pelicula", getMovie);// /peliculas/pelicula  esto es con query
route.get("/pelicula/detalle", getMovieDetail);// /peliculas/pelicula/detalle  esto es con query
route.get("/:idPelicula", getMovieDetailParams);// /peliculas/:idPelicula   esto es con params

module.exports = route;
