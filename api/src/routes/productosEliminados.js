const { Router } = require("express");
const route = Router();
const {
  postProductoEliminado,
  getProductoEliminado
} = require("../servicies/productosEliminados.js");
require("dotenv").config();

route.get("/", getProductoEliminado); 
route.post("/postProd", postProductoEliminado);


module.exports = route;