const { Router } = require("express");
const route = Router();
const { getSeriesInfo } = require("../servicies/Series.js")
require("dotenv").config();

route.get("/", getSeriesInfo);

module.exports = route;
