const { Router } = require("express");
const route = Router();
const { getHistorial, posthistorial } = require("../servicies/historial.js");
require("dotenv").config();

route.post("/agregar", posthistorial);
route.get("/:idUsuario", getHistorial);


module.exports = route;
