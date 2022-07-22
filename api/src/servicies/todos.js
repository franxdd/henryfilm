const axios = require("axios");
require("dotenv").config();
const { parseador } = require("../utils/utils.js");
const { Peliculas } = require("../DB/db.js");
const { Series } = require("../DB/db.js");
const { API_KEY } = process.env;

const todos = async (req, res) => {
  let { name, tipo } = req.query;

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

    const peliculasBd = await Peliculas.findAll();
    const seriesBd = await Series.findAll();

    datosParseadosMovies = parseador(newGetMovies, urlImg, generosData);
    datosParseadosSeries = parseador(newGetSeries, urlImg, generosData);
    var datosAEnviar = [
      ...datosParseadosMovies,
      ...peliculasBd,
      ...seriesBd,
      ...datosParseadosSeries,
    ];

    if (name === "peliculas") {
      var datosPeliculas = [...peliculasBd, ...datosParseadosMovies];

      res.status(200).json(datosPeliculas);
    } else if (name === "series") {
      var datosSeries = [...seriesBd, ...datosParseadosSeries];

      res.status(200).json(datosSeries);
    } else if (name === "caruselPeliculas") {
      var auxobj = {
        results: datosParseadosMovies,
      };

      res.status(200).json(auxobj);
    } else if (name === "caruselSeries") {
      var auxobj = {
        results: datosParseadosSeries,
      };

      res.status(200).json(auxobj);
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
