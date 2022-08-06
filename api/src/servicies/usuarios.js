const axios = require("axios");
const express = require("express");
const { verify } = require("jsonwebtoken");
const app = express();
require("dotenv").config();
const { API_KEY } = process.env;
const { Usuarios, Carros, Deseados } = require("../DB/db");

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens } = require("../utils/JWT.js");
const { mandarEmail } = require("../utils/sendEmail");

// app.use(express.json());
// app.use(cookieParser());

const getAllUsers = async (req, res) => {
  try {
    const users = await Usuarios.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

const postUser = async (req, res) => {
  var arrAux = [];
  try {
    const { username, email, password, isAdmin } = req.body;

    if (!username || !email || !password)
      return res.status(404).send("Falta completar un dato..");
    bcrypt
      .hash(password, 10)

      .then(async (hash) => {
        const response = await Usuarios.create({
          username: username,
          password: hash,
          email: email,
          isAdmin,
        })
          .then((response) => {
            res.status(200).send("Usuario creado con exito");
          })
          .then(mandarEmail(username, email, password));
      })
      .catch((err) => {
        // console.log(err);
        if (err) {
          res.status(400).send("El usuario ya existe");
        }
      });
  } catch (error) {
    res.status(404).send(error);
  }
};

const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Usuarios.findOne({
      where: {
        username: username,
      },
    });

    // console.log(user)

    if (!user) {
      return res.status(400).send("Usuario no existente");
    }

    const carrito = await Carros.findOne({
      where: {
        UsuarioId: user.dataValues.id,
      },
    });

    const deseados = await Deseados.findOne({
      where: {
        UsuarioId: user.dataValues.id,
      },
    });

    // console.log("carrito.dataValues.contenido")

    if (user.length === 0)
      res.status(400).json({ error: "El usuario no existe" });

    const dbPass = user.dataValues.password;

    bcrypt
      .compare(password, dbPass)
      .then((match) => {
        if (!match) {
          res
            .status(400)
            .json({ error: "Combinacions de usuario y password erroneo" });
        } else {
          const accessToken = createTokens(user);

          res.status(200).cookie("access-token", accessToken, {
            maxAge: 60 * 60 * 60,
          });

          if (carrito && deseados) {
            arrAux = [
              accessToken,
              carrito.dataValues.contenido,
              deseados.dataValues.contenido,"Te logueaste con exito"
            ];
          } else if (carrito) {
            arrAux = [accessToken, carrito.dataValues.contenido, [], "Te logueaste con exito"];
          } else if (deseados) {
            arrAux = [accessToken, [], deseados.dataValues.contenido, "Te logueaste con exito"];
          } else {
            arrAux = [accessToken, [], [], "Te logueaste con exito"];
          }
console.log(arrAux)
          res.status(200).json(arrAux);
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getProfile = async (req, res) => {
  const data = JSON.parse(req.headers.cookies);
  const accessToken = data["access-token"];
  const dataUser = verify(accessToken, "jwtsecretcambiar");
  const users = await Usuarios.findOne({
    where: { username: dataUser.username },
  });

  try {
    res.status(200).json(users.dataValues);
  } catch (error) {
    res.status(400).json(error);
  }
};

const putModificarAdmin = async (req, res) => {
  let { id } = req.body;

  try {
    const userValidate = await Usuarios.findOne({
      where: { id: id },
    });
    console.log(userValidate);

    if (!userValidate.dataValues.isAdmin) {
      var user = await Usuarios.update(
        { isAdmin: true },
        {
          where: {
            id: id,
          },
        }
      );
    } else {
      var user = await Usuarios.update(
        { isAdmin: false },
        {
          where: {
            id: id,
          },
        }
      );
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const putElminar = async (req, res) => {
  let { id } = req.body;

  try {
    var eliminado = await Usuarios.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json(eliminado);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  postUser,
  getAllUsers,
  postLogin,
  getProfile,
  putModificarAdmin,
  putElminar,
};
