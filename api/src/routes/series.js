<<<<<<< HEAD
console.log("entro")
=======
const { Router } = require("express");
const route = Router();
const { getSeriesInfo } = require("../servicies/series.js")
require("dotenv").config();

route.get("/", getSeriesInfo);

module.exports = route;
>>>>>>> dev-back
