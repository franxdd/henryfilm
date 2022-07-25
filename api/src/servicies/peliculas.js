const axios = require("axios");
require("dotenv").config();
const { Peliculas } = require("../DB/db.js");
const { parseador, validate } = require("../utils/utils.js");
const { API_KEY } = process.env;

const getAllMovies = async (req, res) => {
  try {
    const cantidad = 5;
    var urlImg;
    var datosParseadosMovies = "";
    var newGetMovies = "";

    var imagenesConfig = await axios.get(
      `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
    );
    urlImg = imagenesConfig.data.images.base_url + "original";

    var generosData = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=es-SP`
    );

    for (let i = 0; i < cantidad; i++) {
      var listaGetMovies = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=es-SP&page=${
          i + 1
        }`
      );

      newGetMovies = [...newGetMovies, ...listaGetMovies.data.results];
      listaGetMovies = "";
    }

    const peliculasBd = await Peliculas.findAll();

    datosParseadosMovies = parseador(newGetMovies, urlImg, generosData);

    var datosAEnviar = [...datosParseadosMovies, ...peliculasBd];

    return datosAEnviar;

  } catch (error) {
    console.log("hubo un error con la API", error);
  }
}; // TERMINADO

const infoMovie = async (req, res) => {
  var resultado = [];

  try {
    resultado = await getAllMovies();
    let { name } = req.query;

    const peliculasBd = await Peliculas.findAll();
    resultado = [...peliculasBd, ...resultado];

    if (name) {
      const pelicula = resultado.filter((p) =>
        p.title.toLowerCase().includes(name.toLowerCase())
      );

      pelicula.length
        ? res.status(200).json(pelicula)
        : res.status(404).send("No hay peliculas");
    } else {
      res.status(200).json(resultado);
    }
  } catch (error) {
    console.log("hubo un error con la API", error);
  }
}; // TERMINADO

//Detalles
const getMovieDetail = async (req, res) => {
  try {
    let { id } = req.query;

    let movie = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-SP`
    );
    var imagenesConfig = await axios.get(
      `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
    );
    urlImg = imagenesConfig.data.images.base_url + "original";

    var generosData = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=es-SP`
    );

    var data_parseado = [movie.data];

    var datosAEnviar = parseador(data_parseado, urlImg, generosData);

    res.status(200).json(datosAEnviar);
  } catch (error) {
    console.log("hubo un error con la API", error);
  }
}; // TERMINADO

const getMovieDetailParams = async (req, res) => {
  let { idPelicula } = req.params;

  try {
    let movie = await axios.get(
      `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=${API_KEY}&language=es-SP`
    );
    var imagenesConfig = await axios.get(
      `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
    );
    urlImg = imagenesConfig.data.images.base_url + "original";

    var generosData = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=es-SP`
    );

    var data_parseado = [movie.data];

    var datosAEnviar = parseador(data_parseado, urlImg, generosData);

    res.status(200).json(datosAEnviar);
  } catch (error) {
    console.log("hubo un error con la API", error);
  }
}; // TERMINADO

//Posteo
const postPeliculas = async (req, res) => {
  let {
    name, //*
    genre_ids,
    overview, //*
    cast,//*
    runtime,//*
    release_date,//*
    posterImagen,//*
    backDropImagen,//*
    vote_average,//*
    popularity,//*
    tipo
  } = req.body;

  var errores = validate(name,
    genre_ids,
    overview,
    cast,
    runtime,
    release_date,
    posterImagen,
    backDropImagen,
    vote_average,
    popularity,
    tipo)

  if(errores) res.json(errores)

  try {
    if (
      !name ||
      !genre_ids ||
      !overview ||
      !cast ||
      !runtime ||
      !release_date ||
      !posterImagen
    )
      return res.status(404).send("Falta completar un dato..");

    const response = await Peliculas.create({
      name,
      genre_ids,
      overview,
      cast,
      runtime,
      release_date,
      posterImagen,
      backDropImagen,
      vote_average,
      popularity,
      tipo
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.log("hubo un error con la API", error);
  }
}; // TERMINADO

module.exports = {
  getAllMovies,
  infoMovie,
  getMovieDetail,
  getMovieDetailParams,
  postPeliculas,
};
