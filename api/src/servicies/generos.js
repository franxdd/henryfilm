const axios = require("axios");
require("dotenv").config();
const { parseador } = require("../utils/utils.js");
const { API_KEY } = process.env;

const getGeneros = async (req, res) => {
    
    var generosData = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );

    
    res.status(200).json(generosData.data)
}

module.exports = {
    getGeneros,
 
  };
  