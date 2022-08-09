const { Router } = require("express");
const route = Router();
const {
 
  postProductoModificado,
  getProductoModificado
} = require("../servicies/productosModificados.js");
require("dotenv").config();

route.get("/", getProductoModificado); // /peliculas --> te trae todas las peliculas || /peliculas?name=nombreDePeli --> te trae coincidencias por query
route.post("/postProd", postProductoModificado);


module.exports = route;