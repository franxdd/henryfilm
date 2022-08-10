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
    let ProductosModificados = await ProductosModificados.findAll();

    res.status(200).json(ProductosModificados);
  } catch (error) {
    res.status(400).json(error);
  }
};

const postProductoModificado = async (req, res) => {
  
  let {contenido, id} = req.body;
  console.log(contenido)

  try {

    let prod = await ProductosModificados.findOne({
      where: {
        idProducto: id
      }
    })

    if(prod){

      var producto = await ProductosModificados.update(
        {contenido : contenido},
        {where: {
          idProducto: id
        }}

      )
     

    }else{

      var producto = await ProductosModificados.create({
  
        idProducto: id,
        contenido: contenido,
  
      })


    }

    res.status(200).json(producto)


  } catch (error) {

    res.status(400).json(error)

  }
};

module.exports = {
    getProductoModificado,
    postProductoModificado,
};
