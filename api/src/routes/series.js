const { Router } = require("express");
const route = Router();
const { infoQuery, seriePorId, serieTranslate } = require("../servicies/series.js");
require("dotenv").config();

route.get("/", infoQuery);
route.get("/detalleDeSerie", infoQuery);
route.get("/seriePorId/:id", seriePorId);
route.get("/traductor/:id", serieTranslate)

module.exports = route;
