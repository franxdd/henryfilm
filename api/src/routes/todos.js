const { Router } = require("express");
const route = Router();
const { todos } = require("../servicies/todos.js");
require("dotenv").config();


route.get("/", todos); //  /todos?name=peliculas (todas las pelis)  /todos?name=series (todas las series)   /todos (todas las series y peliculas)


module.exports = route;