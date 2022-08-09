const axios = require("axios");
require("dotenv").config();
const { parseador } = require("../utils/utils.js");
const {
  Comentarios,
  Usuarios,
  Peliculas,
  Carros,
  Historials,
  ProductosModificados
} = require("../DB/db.js");
const { renderSync } = require("sass");


const getProductoModificado = async (req, res) => {


  try {
    
  } catch (error) {
 
  }
};

const postProductoModificado = async (req, res) => {
  
  try {

  } catch (error) {

  }
};

module.exports = {
    getProductoModificado,
    postProductoModificado,
};
