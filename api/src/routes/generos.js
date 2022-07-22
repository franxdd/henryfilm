const { Router } = require("express");
const route = Router();
const { getGeneros } = require("../servicies/generos.js");
require("dotenv").config();

route.get("/", getGeneros);

module.exports = route;
