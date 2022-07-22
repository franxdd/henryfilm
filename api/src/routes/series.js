const { Router } = require("express");
const route = Router();
const { infoQuery, seriePorId, seriePorIdParms } = require("../servicies/series.js");
require("dotenv").config();

route.get("/", infoQuery);
route.get("/detalleDeSerie", seriePorId);
route.get("/seriePorId/:id", seriePorIdParms);

module.exports = route;
