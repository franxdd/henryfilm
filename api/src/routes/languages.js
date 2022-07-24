const { Router } = require("express");
const route = Router();
const { getLanguages } = require("../servicies/languages.js");
require("dotenv").config();

route.get("/:id", getLanguages);

module.exports = route;
