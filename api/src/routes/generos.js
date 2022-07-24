const { Router } = require("express");
const route = Router();
const { getGenerosMovies, getGenerosSeries } = require("../servicies/generos.js");
require("dotenv").config();

route.get("/series", getGenerosSeries);
route.get("/peliculas", getGenerosMovies);


module.exports = route;
