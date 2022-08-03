const axios = require("axios");
require("dotenv").config();
const { parseador } = require("../utils/utils.js");
const { Comentarios, Usuarios, Peliculas, Carro } = require("../DB/db.js");
const { API_KEY } = process.env;

const postCarrito = async (req, res) => {
  let { username, idUsuario, contenido } = req.body;

  try {
    if (!username || !contenido || idUsuario)
      return res.status(404).send("Falta completar un dato..");

    const carro = await Carro.create({
      contenido,
    });
    

    Carro.setUsuario(idUsuario);


    res.status(200).json(carro);

  } catch (error) {
    console.log("hubo un error con la API", error);
    res.status(400).json(error)
  }
};

module.exports = {
  postCarrito,
};
