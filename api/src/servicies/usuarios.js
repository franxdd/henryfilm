const axios = require("axios");
const express = require("express");
const app = express();
require("dotenv").config();
const { API_KEY } = process.env;
const { Usuarios } = require("../DB/db");

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens } = require("../utils/JWT.js");

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
  try {
    /* const { telefono, nombre, apellido, email, pass } = req.body */
    const { username, email, password } = req.body;
    /* if (!telefono || !nombre || !apellido || !email || !pass) return res.status(404).send("Falta completar un dato..") */
    if (!username || !email || !password)
      return res.status(404).send("Falta completar un dato..");
    bcrypt
      .hash(password, 10)

      .then(async (hash) => {
        const response = await Usuarios.create({
          username: username,
          password: hash,
          email: email,
        });

        return response;
      })
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          res.status(400).send(err);
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

          res.cookie("access-token", accessToken, {
            maxAge: 60 * 60 * 60,
          });

          res.send("postLogin");
        }
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (error) {
    res.json(error);
  }
};

const getProfile = (req, res) => {
  try {
    res.send("getProfile");
  } catch (error) {}
};

module.exports = {
  postUser,
  getAllUsers,
  postLogin,
  getProfile,
};
