const { Router } = require("express");
const route = Router();
const {
  getAllMovies,
  getMovie,
  getMovieDetail,
} = require("../servicies/peliculas.js");
require("dotenv").config();

route.get("/", getAllMovies);
route.get("/pelicula", getMovie);
route.get("/:idPelicula", getMovieDetail);

module.exports = route;
