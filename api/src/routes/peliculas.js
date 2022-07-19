const { Router } = require("express");
const route = Router();
const axios = require("axios");
const { Op } = require("sequelize");
const {getAllMovies} = require("../servicies/peliculas.js")
require("dotenv").config();

const { API_KEY } = process.env;


route.get("/", getAllMovies);

module.exports = route;