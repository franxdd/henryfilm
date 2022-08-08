const { Router } = require("express");
const route = Router();
const { infoQuery, seriePorId, seriePorIdParms, seriePorIdParmsTrad, languages } = require("../servicies/series.js");
const {  modificarSerie } = require("../servicies/nuevaSerie")
require("dotenv").config();

route.get("/", infoQuery);
route.get("/detalleDeSerie", seriePorId);
route.get("/seriePorId/:id", seriePorIdParms);
// route.post("/postNuevaSerie", postNuevaSerie);
route.put("/modificarSerie/:id", modificarSerie)
route.get("/traductor/:id/:iso1/:iso2", seriePorIdParmsTrad)
// route.get("/test/:id", languages)

module.exports = route;
