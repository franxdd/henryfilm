const axios = require("axios");
require("dotenv").config();
const { parseador } = require("../utils/utils.js");
const { API_KEY } = process.env;

const getLanguages = async (req, res) => {
   var idioma = {}
   var iso;
 
   try {
   
     const { id } = req.params;
     const tvLanguages = await axios(
       `https://api.themoviedb.org/3/tv/${id}/translations?api_key=${API_KEY}`
     );
     const languages = tvLanguages.data.translations;

     res.status(200).json(languages)
   } catch (error) {
    console.log(error);
    res.status(400).json(error)
   }
 };

module.exports = {
  getLanguages,
};
