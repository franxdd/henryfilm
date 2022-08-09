const axios = require("axios");
require("dotenv").config();
const { parseador } = require("../utils/utils.js");
const {
  Comentarios,
  Usuarios,
  Peliculas,
  Carros,
  Historial,
} = require("../DB/db.js");

const posthistorial = async (req, res) => {
  let { historialContent, idUsuario } = req.body;
  try {
    let histoUser = await Historial.findOne({
      where: {
        UsuarioId: idUsuario,
      },
    });

    console.log(histoUser);

    if (histoUser) {
      console.log(histoUser.dataValues);
      console.log(historialContent);
      var auxContent = [historialContent, histoUser.dataValues];
      console.log(auxContent);
      var histo = await Historial.update(
        { compras: auxContent },
        {
          where: {
            UsuarioId: idUsuario,
          },
        }
      );
    } else {
      var user = await Usuarios.findOne({
        where: {
          id: idUsuario,
        },
      });

      var histo = await Historial.create({
        compras: historialContent,
      });

      user[0].setHistorial(histo);
    }

    res.status(200).json(histo);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const getHistorial = async (req, res) => {
  let { idUsuario } = req.params;
  try {
  } catch (error) {}
};

module.exports = {
  posthistorial,
  getHistorial,
};
