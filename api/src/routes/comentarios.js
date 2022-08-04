const { Router } = require("express");
const route = Router();
const { getComentarios, postComentario } = require("../servicies/comentarios.js");
require("dotenv").config();

route.get("/", getComentarios);
route.post("/agregar", postComentario);


module.exports = route;
