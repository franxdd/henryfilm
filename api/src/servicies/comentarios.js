const axios = require("axios");
require("dotenv").config();
const { parseador } = require("../utils/utils.js");
const { Comentarios, Usuarios, Peliculas } = require("../DB/db.js");
const { API_KEY } = process.env;
const { sign, verify, decode } = require("jsonwebtoken");

const getComentarios = async (req, res) => {
  let { id } = req.params;
  // console.log(id)
  // console.log(idSerie)

  if (id) {
    var comentarios = await Comentarios.findAll({ where: { PeliculaId: id } });
  }
  //  else if(id){

  //     var comentarios = await Comentarios.findAll({where: {SerieId : idSerie }})
  // }

  res.status(200).json(comentarios);
};

const postComentario = async (req, res) => {
  let { contenido, puntuacion, idPelicula, token } = req.body;
  console.log(typeof idPelicula);
  try {
    if (!token || !contenido || !puntuacion)
      return res.status(404).send("Falta completar un dato..");

    let tokenParsado = JSON.parse(token);

    const validToken = verify(tokenParsado, "jwtsecretcambiar");
    console.log(contenido);
    console.log("paso el verify, ale puto");
    const comentario = await Comentarios.create({
      username: validToken.username,
      contenido,
      puntuacion,
    });

    comentario.setUsuario(validToken.id);
    comentario.setPelicula(idPelicula);

    res.status(200).json(comentario);
  } catch (error) {
    console.log("hubo un error con la API", error);
  }
};

module.exports = {
  getComentarios,
  postComentario,
};
