const axios = require("axios");
require("dotenv").config();
const { Comentarios, Usuarios, Peliculas, Deseados } = require("../DB/db.js");
const { SECRET_KEY } = process.env;
const { sign, verify, decode } = require("jsonwebtoken");
const Stripe = require("stripe");
const stripe = new Stripe(SECRET_KEY);

const pasarelaDePagos = async (req, res) => {
  const { id, amount } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Compra de producto a HenryFilms",
      payment_method: id,
      confirm: true,
    });
    console.log(payment);
    return res.status(200).json({
      message: "Compra realizada con exito",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: error.raw.message,
    });
  }
};

module.exports = {
  pasarelaDePagos,
};
