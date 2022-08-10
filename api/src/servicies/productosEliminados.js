const axios = require("axios");
require("dotenv").config();
const { parseador } = require("../utils/utils.js");
const {
  Comentarios,
  Usuarios,
  Peliculas,
  Series,
  Carros,
  Historials,
  ProductosEliminados,
} = require("../DB/db.js");
const { renderSync } = require("sass");


const getProductoEliminado = async (req, res) => {
  try {
    let productosEliminados = await ProductosEliminados.findAll();
    
    res.status(200).json(productosEliminados);
  } catch (error) {
    res.status(400).json(error);
  }
};

const postProductoEliminado = async (req, res) => {
  let payload = req.body;

  // console.log(payload[0])
  // console.log(payload[1])
  
  
  let id = payload[0]+""
  let tipo = payload[1]

  try {
    
    if (tipo === "pelicula") {
      
      
      let pelicula = await Peliculas.findAll({
        where: {
          id: id,
        },
      });
      
      
      
      if (pelicula.length !== 0) {
        
        
        let eliminado = await Peliculas.destroy({
          where: {
            id: id,
          },
        });

        return res.status(200).json(eliminado);

      } else {


        
        let peliculaEliminada = await ProductosEliminados.create({
          idProducto: id,
        });
        
        return res.status(200).json(peliculaEliminada);
      }
      
      
    } else if (tipo === "serie") {

        let serie = await Series.findAll({
          where: {
            id: id,
          },
        });

      console.log(serie)

      if (serie.length !== 0) {


        let eliminado = await Series.destroy({
          where: {
            id: id,
          },
        });
        
        // console.log(eliminado);
        return res.status(200).json(eliminado);
      } else {


        let serieEliminada = await ProductosEliminados.create({
          idProducto: id,
        });

        // console.log(serieEliminada);
        return res.status(200).json(serieEliminada);
      }
    } else {
      return res.status(200).json("No se modifico nada");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getProductoEliminado,
  postProductoEliminado,
};
