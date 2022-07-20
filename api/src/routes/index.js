const {Router} = require("express");
const router = Router();
const peliculas  = require("./peliculas")
const series = require('./series')
const usuarios = require('./usuarios')


router.use("/peliculas", peliculas);
router.use("/series", series);
router.use("/usuarios", usuarios);


module.exports = router;
