const { Router } = require("express");
const route = Router();
const { postDeseados } = require("../servicies/deseados.js");
require("dotenv").config();


route.post("/agregar", postDeseados);


module.exports = route;
