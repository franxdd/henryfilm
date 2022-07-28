const { Router } = require("express");
const route = Router();
const { infoQuery, seriePorId, seriePorIdParms, seriePorIdParmsTrad, languages } = require("../servicies/series.js");
const { postNuevaSerie } = require("../servicies/nuevaSerie")
require("dotenv").config();

route.get("/", infoQuery);
route.get("/detalleDeSerie", seriePorId);
route.get("/seriePorId/:id/:iso1/:iso2", seriePorIdParms);
route.post("/postNuevaSerie", postNuevaSerie);
route.get("/traductor/:id/:iso1/:iso2", seriePorIdParmsTrad)
// route.get("/test/:id", languages)

module.exports = route;
