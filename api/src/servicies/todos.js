const axios = require("axios");
require("dotenv").config();
const { parseador } = require("../utils/parseador.js");
const { API_KEY } = process.env;

const todos = async (req, res) => {
  let { name } = req.query;

  try {
    const cantidadDeMovies = 5;
    var urlImg;
    var datosParseadosMovies = "";
    var datosParseadosSeries = "";
    var newGetMovies = "";
    var newGetSeries = "";

    var imagenesConfig = await axios.get(
      `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
    );
    urlImg = imagenesConfig.data.images.base_url + "original";

    var generosData = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );

    for (let i = 0; i < cantidadDeMovies; i++) {
      var listaGetMovies = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${
          i + 1
        }`
      );

      newGetMovies = [...newGetMovies, ...listaGetMovies.data.results];
      listaGetMovies = "";
    }

    for (let j = 0; j < cantidadDeMovies; j++) {
      var listaGetSeries = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${
          j + 1
        }`
      );

      newGetSeries = [...newGetSeries, ...listaGetSeries.data.results];
      listaGetSeries = "";
    }

    datosParseadosMovies = parseador(newGetMovies, urlImg, generosData);
    datosParseadosSeries = parseador(newGetSeries, urlImg, generosData);

    var datosAEnviar = [...datosParseadosMovies, ...datosParseadosSeries];

    if (name === "peliculas") {
      res.status(200).json(datosParseadosMovies);
    } else if (name === "series") {
      res.status(200).json(datosParseadosSeries);
    } else {
      res.status(200).json(datosAEnviar);
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  todos,
};
