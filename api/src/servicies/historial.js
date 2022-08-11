const axios = require("axios");
require("dotenv").config();
const { parseador } = require("../utils/utils.js");
const {
  Comentarios,
  Usuarios,
  Peliculas,
  Carros,
  Historials,
} = require("../DB/db.js");
const { renderSync } = require("sass");


const posthistorial = async (req, res) => {
  let payload = req.body;
  var historialContent = payload[0]
  var idUsuario = payload[1].id



  try {
    if(historialContent.length === 0) return res.status(400).json("Debe seleccionar un elemento a comprar")

    let histoUser = await Historials.findOne({
      where: {
        UsuarioId: idUsuario,
      },
    });


    if (histoUser) {

      var auxContent = [...historialContent, ...histoUser.dataValues.compras];

      var histo = await Historials.update(
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

      var histo = await Historials.create({
        compras: historialContent,
      });

      user.setHistorial(histo);
    }

    res.status(200).json(histo);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const getHistorial = async (req, res) => {
  let { idUsuario } = req.params;
  // console.log("id de params",idUsuario)
  try {


    // console.log('antes del find one')
    let histoUser = await Historials.findOne({
      where: {
        UsuarioId: idUsuario,
      },
    })
    // console.log(histoUser)
    if(!histoUser) return res.status(200).json(false)

    // console.log('devuelve')
    res.status(200).json(histoUser)


  } catch (error) {

    res.status(400).json("Error en obtencion de historial")


  }
};



const getTodosHistorial = async (req, res) => {
  
  console.log('antes del find one')
 
  try {


    let histoUser = await Historials.findAll()

    console.log(histoUser)

    if(!histoUser) return res.status(200).json(false)

    console.log('devuelve')

    res.status(200).json(histoUser)


  } catch (error) {
    console.log(error)
    // res.status(400).json("Error en obtencion de historial")


  }
};

module.exports = {
  posthistorial,
  getHistorial,
  getTodosHistorial
};
