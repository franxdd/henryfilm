const axios = require("axios");
require("dotenv").config();
const { parseador } = require("../utils/utils.js");
const { API_KEY } = process.env;

const getLanguages = async (req, res) => {
  var idioma = {};
  var iso;

  try {
    console.log("Hola?");
    const { id } = req.params;
    const tvLanguages = await axios(
      `https://api.themoviedb.org/3/tv/${id}/translations?api_key=${API_KEY}`
    );
    const languages = tvLanguages.data.translations;
    // console.log(languages)
    res.status(200).json(languages);
  } catch (error) {
    //  console.log(error);
  }
};

module.exports = {
  getLanguages,
};
