const { Router } = require("express");
const route = Router();
const { postUser } = require("../servicies/usuarios.js");
require("dotenv").config();

// route.post("/", postUser);

module.exports = route;
