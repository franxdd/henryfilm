const axios = require("axios");
require("dotenv").config();
const { Peliculas, Series } = require("../DB/db.js");
const { parseador, validate } = require("../utils/utils.js");
const { API_KEY } = process.env;
const { cloudinary } = require("../utils/cloudinary");
// const Series = require("../models/Series.js");
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

    var cast = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=es-SP`
    );

    var castAEnviar = cast.data.cast;

    var videos = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=es-SP`
    );

    var videosAEnviar = videos.data.results;

    var urlVideos = `https://www.youtube.com/embed/`;

    var data_parseado = [movie.data];

    var datosAEnviar = parseador(
      data_parseado,
      urlImg,
      generosData,
      castAEnviar,
      videosAEnviar,
      urlVideos
    );

    res.status(200).json(datosAEnviar);
  } catch (error) {
    console.log("hubo un error con la API", error);
  }
}; // TERMINADO

const getMovieDetailParams = async (req, res) => {
  let { idPelicula } = req.params;

  try {
    if (isNaN(idPelicula)) {
      const peliculasDb = await Peliculas.findOne({
        where: {
          id: idPelicula,
        },
      });

      var datosAEnviar = [peliculasDb];
    } else {
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
      var cast = await axios.get(
        `https://api.themoviedb.org/3/movie/${idPelicula}/credits?api_key=${API_KEY}&language=es-SP`
      );
      var videos = await axios.get(
        `https://api.themoviedb.org/3/movie/${idPelicula}/videos?api_key=${API_KEY}&language=es-SP`
      );

      var castAEnviar = cast.data.cast;

      var urlVideos = `https://www.youtube.com/embed/`;

      var videosAEnviar = videos.data.results;

      var data_parseado = [movie.data];

      var datosAEnviar = parseador(
        data_parseado,
        urlImg,
        generosData,
        castAEnviar,
        videosAEnviar,
        urlVideos
      );
    }
  
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
    cast, //*
    runtime, //*
    release_date, //*
    episode_run_time,
    number_of_episodes,
    number_of_seasons,
    posterImagen, //*
    backDropImagen, //*
    vote_average, //*
    popularity, //*
    tipo,
  } = req.body;

  var errores = validate({
    name,
    genre_ids,
    overview,
    cast,
    runtime,
    number_of_episodes,
    number_of_seasons,
    episode_run_time,
    release_date,
    posterImagen,
    backDropImagen,
    vote_average,
    popularity,
    tipo,
  });

  if (Object.keys(errores).length !== 0) res.status(400).json(errores);
  try {
    // if (
    //   !name ||
    //   !genre_ids ||
    //   !overview ||
    //   !cast ||
    //   !runtime ||
    //   !release_date ||
    //   !posterImagen
    // )
    //   return res.status(404).send("Falta completar un dato..");

    const upload = await cloudinary.uploader.upload(posterImagen, {
      upload_preset: "mf7vmjsa",
    });
    const upload2 = await cloudinary.uploader.upload(backDropImagen, {
      upload_preset: "mf7vmjsa",
    });

    console.log('antes del create')
    var number_of_episodesParse = parseInt(number_of_episodes)
    var number_of_seasonsParse = parseInt(number_of_seasons)
    if (tipo === "serie") {
      console.log(' create')
      const response = await Series.create({
        name,
        genre_ids,
        overview,
        cast,
        episode_run_time,
        number_of_episodes: number_of_episodesParse,
        number_of_seasons: number_of_seasonsParse,
        posterImagen: upload.url,
        backDropImagen: upload2.url,
        vote_average,
        popularity,
        tipo,
      });

      console.log(' salio')
      res.status(200).json(response.data);
    } else {
      const response = await Peliculas.create({
        name,
        genre_ids,
        overview,
        cast,
        runtime,
        release_date,
        posterImagen: upload.url,
        backDropImagen: upload2.url,
        vote_average,
        popularity,
        tipo,
      });
     
      res.status(200).json(response.data);
    }
  } catch (error) {
    console.log("hubo un error con la API", error);
  }
}; // TERMINADO

const modificarPeli = async (req, res) => {
  let {
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
    tipo,
  } = req.body;
  let { id } = req.params;
  try {
    let peliActualizada = await Peliculas.findByPk(id);
    let peliculitas = {
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
      tipo,
    };
    let nuevaPeli = await peliActualizada.update(peliculitas);
    return res.status(200).send(nuevaPeli);
  } catch (error) {

    res.status(400).json(error);
  }
};

module.exports = {
  getAllMovies,
  infoMovie,
  getMovieDetail,
  getMovieDetailParams,
  postPeliculas,
  modificarPeli,
};
