const axios = require("axios");
require("dotenv").config();
const { Comentarios, Usuarios, Peliculas, Deseados } = require("../DB/db.js");
const { API_KEY } = process.env;
const { sign, verify, decode } = require("jsonwebtoken");

const postDeseados = async (req, res) => {
    let body = req.body;
    let idParseado;

    // console.log(body)

    let token = body[0];
    let contenido = body[2];
    // console.log(contenido);
    try {
      if (!token || !contenido) return res.status(404).send("Falta un dato..");
    //   if (contenido.length === 0) return res.status(200).send("Carro vacio");
  
      let tokenParseado = JSON.parse(token);
      const dataUser = verify(tokenParseado, "jwtsecretcambiar");
  
      const verificacionDeseados = await Deseados.findAll({
        where: {
          UsuarioId: dataUser.id,
        },
      });
      // console.log(verificacionCarro)
      if (verificacionDeseados.length !== 0) {
        
        // console.log("entro al ya creado");
  
        // const user = await Usuarios.findAll({
        //   where: {
        //     id: dataUser.id,
        //   },
        // });
  
        // const carrito = await Carros.findAll({
        //   where: {
        //     UsuarioId: dataUser.id,
        //   },
        // });
        // console.log(contenido)
        const deseado = await Deseados.update(
          { contenido: contenido },
          {
            where: {
              UsuarioId: dataUser.id,
            },
          }
        );
  
        return res.status(200).json(deseado);
        
      } else {
        // console.log("entro al crear");
        const user = await Usuarios.findAll({
          where: {
            id: dataUser.id,
          },
        });
  
        // idParseado = String(dataUser.id)
        // console.log(dataUser.id)
        // console.log(idParseado)
  
        const deseado = await Deseados.create({
          contenido: contenido,
        });
  
        user[0].addDeseado(deseado);
  
        const deseados = await Deseados.findAll({
          where: {
            UsuarioId: dataUser.id,
          },
        });
  
        // console.log("aca llego 44");
        return res.status(200).json(deseados);
      }
    } catch (error) {
      console.log("hubo un error con la API", error);
      res.status(400).json(error);
    }
  };
  

module.exports = {
    postDeseados,
};
