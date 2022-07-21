const { Router } = require("express");
const route = Router();
const { postUser, getAllUsers } = require("../servicies/usuarios.js");
require("dotenv").config();

route.get("/", getAllUsers)
route.post("/create", postUser);

module.exports = route;
