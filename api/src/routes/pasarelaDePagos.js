const { Router } = require("express");
const route = Router();
const { pasarelaDePagos } = require("../servicies/pasarelaDePagos");
require("dotenv").config();

route.post("/api/checkout", pasarelaDePagos);

module.exports = route;
