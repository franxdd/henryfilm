const axios = require("axios");
require("dotenv").config();
const { parseador } = require("../utils/utils.js");
const { Comentarios, Usuarios, Peliculas } = require("../DB/db.js");
const { API_KEY } = process.env;
const { sign, verify, decode } = require("jsonwebtoken");

const getComentarios = async (req, res) => {
  let { id, tipo } = req.query;

  if (tipo === "pelicula") {
    var comentarios = await Comentarios.findAll({ where: { idpelicula: id } });
  } else if (tipo === "serie") {
    var comentarios = await Comentarios.findAll({ where: { idserie: id } });
  }
  //  else if(id){

  //     var comentarios = await Comentarios.findAll({where: {SerieId : idSerie }})
  // }

  res.status(200).json(comentarios);
};

const postComentario = async (req, res) => {
  let { contenido, puntuacion, token, nickname, picture, id, tipo} = req.body;
  try {
    if (!token || !contenido || !puntuacion)
    return res.status(404).send("Falta completar un dato..");
    
    let tokenParsado = JSON.parse(token);
    
    const validToken = verify(tokenParsado, "jwtsecretcambiar");
    
    if (tipo === "pelicula") {
      console.log(validToken);
      var comentario = await Comentarios.create({
        username: validToken.username,
        contenido,
        puntuacion,
        idpelicula: id,
        nickname,
        picture,
      });
    } else if (tipo === "serie") {
      var comentario = await Comentarios.create({
        username: validToken.username,
        contenido,
        puntuacion,
        idserie:id,
        nickname,
        picture,
      });
    }
    
 
    comentario.setUsuario(validToken.id);
    // comentario.setPelicula(idPelicula);
    res.status(200).json(comentario);
  } catch (error) {
    console.log("hubo un error con la API", error);
  }
};

module.exports = {
  getComentarios,
  postComentario,
};
