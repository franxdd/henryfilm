const {Router} = require("express");
const router = Router();
const peliculas  = require("./peliculas")
const series = require('./series')


router.use("/peliculas", peliculas);
router.use("/series", series)
// routes.use("usuarios", usuarios) //falta hacer e importar


module.exports = router;
