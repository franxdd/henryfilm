const { Router } = require("express");
const route = Router();
const { postUser } = require("../servicies/usuarios.js");
require("dotenv").config();

route.post("/create", postUser);

module.exports = route;
