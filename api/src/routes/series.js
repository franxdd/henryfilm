const { Router } = require("express");
const route = Router();
const { infoQuery, seriePorId, seriePorIdParms } = require("../servicies/series.js");
const { postNuevaSerie } = require("../servicies/nuevaSerie")
require("dotenv").config();

route.get("/", infoQuery);
route.get("/detalleDeSerie", seriePorId);
route.get("/seriePorId/:id", seriePorIdParms);
route.post("/postNuevaSerie", postNuevaSerie)

module.exports = route;
