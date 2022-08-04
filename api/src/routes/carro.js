const { Router } = require("express");
const route = Router();
const { postCarrito } = require("../servicies/carro.js");
require("dotenv").config();

route.post("/post", postCarrito);


module.exports = route;
