const { Router } = require("express");
const route = Router();
const {
  infoMovie,
  getMovieDetail,
  getMovieDetailParams,
  postPeliculas,
  modificarPeli,
} = require("../servicies/peliculas.js");
require("dotenv").config();

route.get("/", infoMovie); // /peliculas --> te trae todas las peliculas || /peliculas?name=nombreDePeli --> te trae coincidencias por query
route.get("/pelicula/detalle", getMovieDetail); // /peliculas/pelicula/detalle  esto es con query
route.get("/:idPelicula", getMovieDetailParams); // /peliculas/:idPelicula   esto es con params
route.post("/postPelicula", postPeliculas);
route.put("/modificar/:id", modificarPeli);

module.exports = route;
