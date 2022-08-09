const axios = require("axios");
require("dotenv").config();
const { parseador } = require("../utils/utils.js");
const {
  Comentarios,
  Usuarios,
  Peliculas,
  Carros,
  Historials,
  ProductosEliminados,
} = require("../DB/db.js");
const { renderSync } = require("sass");


const getProductoEliminado = async (req, res) => {


  try {
    
  } catch (error) {
 
  }
};

const postProductoEliminado = async (req, res) => {
  
  try {

  } catch (error) {

  }
};

module.exports = {
    getProductoEliminado,
    postProductoEliminado,
};
