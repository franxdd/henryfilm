const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getAllMovies = async (req, res) => {
  const cantidadDeMovies = 5;

  try {
    var resultado = [];
    var generos = {};
    var urlImg;
    var num;
    var newGet = "";

    var imagenesConfig = await axios.get(
      "https://api.themoviedb.org/3/configuration?api_key=3832b93c32749d817ba7fc39076d3398"
    );
    urlImg = imagenesConfig.data.images.base_url + "original";

    var generosData = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=3832b93c32749d817ba7fc39076d3398&language=en-US`
    );

    for (let j = 0; j < generosData.data.genres.length; j++) {
      for (const prop in generosData.data.genres[j]) {
        if (typeof generosData.data.genres[j][prop] === "number") {
          num = generosData.data.genres[j][prop];
        } else if (typeof generosData.data.genres[j][prop] === "string") {
          generos[num] = generosData.data.genres[j][prop];
        }
      }
    }

    for (let i = 0; i < cantidadDeMovies; i++) {
      newGet = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${
          i + 1
        }`
      );

      for (let index = 0; index < newGet.data.results.length; index++) {
        for (let g = 0; g < newGet.data.results[index].genre_ids.length; g++) {
          newGet.data.results[index].genre_ids[g] =
            generos[newGet.data.results[index].genre_ids[g] + ""];
        }

        resultado = [...resultado, newGet.data.results[index]];
      }

      newGet = "";
    }

    for (let img = 0; img < resultado.length; img++) {
      resultado[img].backDropImagen = urlImg + resultado[img].backdrop_path;
      resultado[img].posterImagen = urlImg + resultado[img].poster_path;
    }
    return resultado;
  } catch (error) {
    console.log("hubo un error con la API", error);
  }
}; // TERMINADO

const infoMovie = async (req, res) => {
  var resultado = [];

  try {
    resultado = await getAllMovies();

    let { name } = req.query;

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

const getMovieDetail = async (req, res) => {
  try {
    let { id } = req.query;

    let movie = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    );

    res.status(200).json(movie.data);
  } catch (error) {
    console.log("hubo un error con la API", error);
  }
}; // TERMINADO

const getMovieDetailParams = async (req, res) => {
  let { idPelicula } = req.params;

  try {
    let movie = await axios.get(
      `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=${API_KEY}&language=en-US`
    );

    res.status(200).json(movie.data);
  } catch (error) {
    console.log("hubo un error con la API", error);
  }
}; // TERMINADO

module.exports = {
  getAllMovies,
  infoMovie,
  getMovieDetail,
  getMovieDetailParams,
};
