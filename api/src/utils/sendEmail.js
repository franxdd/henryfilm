const axios = require("axios");
require("dotenv").config();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const mandarEmail = async (username, email, password) => {
  // console.log("lalala");
  let contenidoHTML = `
          <h1>User Information</h1>
          <ul>
            <li>Username: ${username} </li>
            <li>User Email: ${email}</li>
            <li>Password: ${password}</li>
          </ul>
        `;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "edgarlrossi@gmail.com",
      pass: "wegxylmdhctayabq",
    },
  });

  let info = await transporter.sendMail({
    from: '"Remitente" <edgarlrossi@gmail.com>',
    to: email,
    subject: "Formulario de contacto de HenryFilms",
    text: "Hola espero que este muy bien",
    html: contenidoHTML,
  });

  console.log("Message sent", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

const mandarEmailCompra = async (amount, description, currency) => {
  // console.log("lalala");
  let contenidoHTML = `
          <h1>User Information</h1>
          <ul>
            <li>Currency: ${currency} </li>
            <li>Amount: ${amount}</li>
            <li>Description: ${description}</li>
          </ul>
        `;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "edgarlrossi@gmail.com",
      pass: "wegxylmdhctayabq",
    },
  });

  let info = await transporter.sendMail({
    from: '"Remitente" <edgarlrossi@gmail.com>',
    to: email,
    subject: "Formulario de compra a HenryFilms",
    text: "Hola espero que este muy bien",
    html: contenidoHTML,
  });

  console.log("Message sent", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = {
  mandarEmail,
  mandarEmailCompra
};
