const { Router } = require("express");
const route = Router();
const { validateToken} = require("../utils/JWT.js")
const { postUser, postLogin,getProfile ,getAllUsers, putModificarAdmin, putElminar, postgoogleuser, putProfile } = require("../servicies/usuarios.js");
require("dotenv").config();

route.get("/", getAllUsers)
route.post("/register", postUser);
route.post("/login", postLogin);
route.get("/profile", validateToken, getProfile);
route.put("/cambiar", putModificarAdmin)
route.put("/eliminar", putElminar)
route.post("/google", postgoogleuser)
route.put("/IProfile", putProfile)

module.exports = route;
