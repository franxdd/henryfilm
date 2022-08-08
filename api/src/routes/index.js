const { Router } = require("express");
const router = Router();
const peliculas = require("./peliculas");
const series = require("./series");
const usuarios = require("./usuarios");
const todos = require("./todos");
const generos = require("./generos")
const languages = require("./languages")
const comentarios = require("./comentarios")
const carro = require("./carro")
const deseados = require("./deseados")
const pasarelaDePagos = require("./pasarelaDePagos")

router.use("/peliculas", peliculas);
router.use("/series", series);
router.use("/usuarios", usuarios);
router.use("/todos", todos);
router.use("/generos", generos);
router.use("/languages", languages);
router.use("/comentarios", comentarios);
router.use("/carro", carro);
router.use("/deseados", deseados);
router.use("/pagos", pasarelaDePagos);

module.exports = router;
