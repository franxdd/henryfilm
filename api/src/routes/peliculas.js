const { Router } = require("express");
const route = Router();
const {
  infoMovie,
  getMovieDetail,
  getMovieDetailParams,
} = require("../servicies/peliculas.js");
require("dotenv").config();


route.get("/", infoMovie);// /peliculas --> te trae todas las peliculas || /peliculas?name=nombreDePeli --> te trae coincidencias poir query

route.get("/pelicula/detalle", getMovieDetail);// /peliculas/pelicula/detalle  esto es con query
route.get("/:idPelicula", getMovieDetailParams);// /peliculas/:idPelicula   esto es con params

module.exports = route;
