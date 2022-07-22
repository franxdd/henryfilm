const { Router } = require("express");
const router = Router();
const peliculas = require("./peliculas");
const series = require("./series");
const usuarios = require("./usuarios");
const todos = require("./todos");
const generos = require("./generos")

router.use("/peliculas", peliculas);
router.use("/series", series);
router.use("/usuarios", usuarios);
router.use("/todos", todos)
router.use("/generos", generos);

module.exports = router;
