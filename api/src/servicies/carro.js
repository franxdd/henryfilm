const axios = require("axios");
require("dotenv").config();
const { parseador } = require("../utils/utils.js");
const { verify } = require("jsonwebtoken");
const { Comentarios, Usuarios, Peliculas, Carros } = require("../DB/db.js");
const { API_KEY } = process.env;

const postCarrito = async (req, res) => {
  let body = req.body;
  let idParseado;

  let token = body[0];
  let contenido = body[1];
  // console.log(contenido.length);
  try {
    if (!token || !contenido) return res.status(404).send("Falta un dato..");
    // if (contenido.length === 0) return res.status(200).send("Carro vacio");

    let tokenParseado = JSON.parse(token);
    const dataUser = verify(tokenParseado, "jwtsecretcambiar");

    const verificacionCarro = await Carros.findAll({
      where: {
        UsuarioId: dataUser.id,
      },
    });
    // console.log(verificacionCarro)
    if (verificacionCarro.length !== 0) {
      
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

      const carro = await Carros.update(
        { contenido: contenido },
        {
          where: {
            UsuarioId: dataUser.id,
          },
        }
      );

      return res.status(200).json(carro);
      
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

      const carro = await Carros.create({
        contenido: contenido,
      });

      user[0].setCarro(carro);

      const carrito = await Carros.findAll({
        where: {
          UsuarioId: dataUser.id,
        },
      });

      // console.log("aca llego 44");
      return res.status(200).json(carrito);
    }
  } catch (error) {
    console.log("hubo un error con la API", error);
    res.status(400).json(error);
  }
};

module.exports = {
  postCarrito,
};
