const axios = require("axios");
const express = require("express");
const { sign, verify, decode } = require("jsonwebtoken");
const app = express();
require("dotenv").config();
const { API_KEY } = process.env;
const { Usuarios, Carros, Deseados } = require("../DB/db");
const { cloudinary } = require("../utils/cloudinary");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens } = require("../utils/JWT.js");
const { mandarEmail } = require("../utils/sendEmail");
const perfil =
  "https://res.cloudinary.com/dwcgf7wdr/image/upload/v1660076263/dev_setups/perfil2_mdv75w.png";
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
    const { username, email, password, isAdmin, nickname } = req.body;

    if (!username || !email || !password || !nickname)
      return res.status(404).send("Falta completar un dato..");
    bcrypt
      .hash(password, 10)

      .then(async (hash) => {
        console.log("entre de las promesas");
        console.log(username, email, password, nickname);
        const response = await Usuarios.create({
          username: username,
          password: hash,
          email: email,
          isAdmin,
          nickname: nickname,
        })
          .then((response) => {
            console.log("entre de las promesas 2");
            res.status(200).send("Usuario creado con exito");
          })
          .then(() => {
            try {
              mandarEmail(username, email, password, nickname);
            } catch (error) {
              console.log(error);
            }
          });
        console.log("sali de las promesas");
      })
      .catch((err) => {
        if (err) {
          res.status(400).send("El usuario ya existe");
        }
      });
  } catch (error) {
    console.log(error);
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
              deseados.dataValues.contenido,
              "Te logueaste con exito",
              user,
            ];
          } else if (carrito) {
            arrAux = [
              accessToken,
              carrito.dataValues.contenido,
              [],
              "Te logueaste con exito",
              user,
            ];
          } else if (deseados) {
            arrAux = [
              accessToken,
              [],
              deseados.dataValues.contenido,
              "Te logueaste con exito",
              user,
            ];
          } else {
            arrAux = [accessToken, [], [], "Te logueaste con exito", user];
          }

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
  if (users && users.dataValues.picture === null) {
    users.dataValues.picture = perfil;
    try {
      res.status(200).json(users.dataValues);
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    try {
      res.status(200).json(users.dataValues);
    } catch (error) {
      res.status(400).json(error);
    }
  }
};

const putProfile = async (req, res) => {
  console.log("estoy entrando");
  let { id, avatar, nickname } = req.body;
  console.log(id, nickname);
  try {
    console.log("estoy entrando try");
    // const upload = await cloudinary.uploader.upload(avatar, {
    //   upload_preset: "mf7vmjsa",
    // });
    if (!nickname) {
      console.log("estoy entrando en !nickname");
      console.log(avatar);
      const upload = await cloudinary.uploader.upload(avatar, {
        upload_preset: "mf7vmjsa",
      });
      console.log("estoy saliendo cloud");
      const response = await Usuarios.update(
        { picture: upload.url },
        {
          where: {
            id: id,
          },
        }
      );
      console.log("estoy saliendo update sin nickname");
    } else if (!avatar) {
      // console.log(id, nickname);
      console.log("estoy entrando en !avatar");
      const response = await Usuarios.update(
        { nickname: nickname },
        {
          where: {
            id: id,
          },
        }
      );
      console.log("estoy saliendo update sin foto");
    } else {
      const upload = await cloudinary.uploader.upload(avatar, {
        upload_preset: "mf7vmjsa",
      });
      console.log("estoy saliendo cloud");
      const response = await Usuarios.update(
        { nickname: nickname, picture: upload.url },
        {
          where: {
            id: id,
          },
        }
      );
      console.log("estoy saliendo update con ambos");
    }
    let user = await Usuarios.findByPk(id);
    console.log(user);
    return res.status(200).send(user);
    // const response = await Usuarios.update(
    //   { nickname: nickname, picture: upload.url },
    //   {
    //     where: {
    //       id: id,
    //     },
    //   }
    // );
    // console.log("estoy saliendo update");
    // console.log(response);
    // return res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
};
const putModificarAdmin = async (req, res) => {
  let { id, admin } = req.body;
  try {
    if (admin === "true") {
      const userValidate = await Usuarios.findOne({
        where: { id: id },
      });

      if (!userValidate.dataValues.isAdmin) {
        var user = await Usuarios.update(
          { isAdmin: true },
          {
            where: {
              id: id,
            },
          }
        );
      }
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
    let userasd = await Usuarios.findByPk(id);
    console.log(userasd);
    res.status(200).json(userasd);
  } catch (error) {
    res.status(400).json(error);
  }
};

const putElminar = async (req, res) => {
  let { id } = req.body;
console.log(id);
  try {
    var eliminado = await Usuarios.destroy({
      where: {
        id: id,
      },
    });
    let userasd = await Usuarios.findByPk(id);
    res.status(200).json(userasd);
  } catch (error) {
    res.status(400).json(error);
  }
};

const postgoogleuser = async (req, res) => {
  try {
    let { email, name, jti, picture } = req.body;
    const jwtPass = sign(
      JSON.stringify({
        username: name,
        email: email,
      }),
      "jwtsecretcambiar"
    );

    var user = await Usuarios.findOne({
      where: { username: name },
    });

    if (!user) {
      var user = await bcrypt
        .hash(jwtPass, 10)

        .then(async (hash) => {
          var user = await Usuarios.create({
            username: name,
            nickname: name,
            password: hash,
            email: email,
            picture: picture,
          }).then(mandarEmail(name, email, jti));
          console.log("salio del create al service");
          return user;
        })
        .catch((err) => {
          if (err) {
            res.status(400).send("El usuario ya existe");
          }
        });
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

    if (user.length === 0)
      res.status(400).json({ error: "El usuario no existe" });

    const dbPass = user.dataValues.password;

    bcrypt
      .compare(jwtPass, dbPass)
      .then((match) => {
        // console.log("antes del if del match");
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
              deseados.dataValues.contenido,
            ];
          } else if (carrito) {
            arrAux = [accessToken, carrito.dataValues.contenido, []];
          } else if (deseados) {
            arrAux = [accessToken, [], deseados.dataValues.contenido];
          } else {
            arrAux = [accessToken, [], []];
          }
          return res.status(200).json(arrAux);
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
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
  postgoogleuser,
  putProfile,
};
