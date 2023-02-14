const { Router } = require("express");
const route = Router();
const { getHistorial, posthistorial, getTodosHistorial } = require("../servicies/historial.js");
require("dotenv").config();

route.post("/agregar", posthistorial);
route.get("/:idUsuario", getHistorial);
route.get("/todos/traer", getTodosHistorial);


module.exports = route;
