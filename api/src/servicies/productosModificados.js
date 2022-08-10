const axios = require("axios");
require("dotenv").config();
const { parseador } = require("../utils/utils.js");
const {
  Comentarios,
  Usuarios,
  Peliculas,
  Carros,
  Historials,
  ProductosModificados,
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
  var payload = req.body;

  var id = payload.id;
  var contenido = payload;
  // console.log(payload)

  try {
    let prod = await ProductosModificados.findOne({
      where: {
        idProducto: id,
      },
    });
    console.log(prod);
    if (prod !== null) {
      var producto = await ProductosModificados.update(
        { contenido: [payload] },
        {
          where: {
            idProducto: id,
          },
        }
      );
    } else {
      var producto = await ProductosModificados.create({
        idProducto: id,
        contenido: [payload],
      });
    }

    res.status(200).json(producto);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getProductoModificado,
  postProductoModificado,
};
