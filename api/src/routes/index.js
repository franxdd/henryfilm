const {Router} = require("express");
const peliculas = require("./peliculas.js")

const routes = Router();

routes.use("/peliculas", peliculas);
// routes.use("usuarios", usuarios) //falta hacer e importar


module.exports = routes;
