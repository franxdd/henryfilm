const { Router } = require("express");
const route = Router();
const { infoQuery, seriePorId } = require("../servicies/series.js");
require("dotenv").config();

// route.get("/", infoQuery);
// route.get("/detalleDeSerie", infoQuery);
// route.get("/seriePorId/:id", seriePorId);

module.exports = route;
