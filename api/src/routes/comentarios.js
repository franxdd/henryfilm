const { Router } = require("express");
const route = Router();
const { getComentario, postComentario } = require("../servicies/comentarios.js");
require("dotenv").config();

route.get("/devolver", getComentario);
route.post("/agregar", postComentario);


module.exports = route;
