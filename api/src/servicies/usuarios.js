const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Usuarios } = require('../DB/db')

const postUser = async (req, res) => {
  try {
    const { telefono, nombre, apellido, email, pass } = req.body
    if (!telefono || !nombre || !apellido || !email || !pass) return res.status(404).send("Falta completar un dato..")
    const response = await Usuarios.findOrCreate({
        where: { email },
        defaults: { telefono, nombre, apellido, email, pass }
    })
    res.status(200).send(`Se creo el usuario ${response[0].dataValues.nombre}`)
  } catch (error) {
    res.status(404).send(error)
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Usuarios.findAll()
    res.status(200).send(users)
  } catch (error) { 
    res.status(404).send(error)
  }
}

module.exports = {
  postUser,
  getAllUsers
};
