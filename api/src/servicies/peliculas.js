const { Peliculas, Usuarios } = require("../DB/db.js");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getAllMovies = async (req, res) => {
  const cantidadDeMovies = 5;

  try {
    var resultado = [];
    var generos = {};
    var num;
    var newGet = "";

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

    res.status(200).json(resultado);
  } catch (error) {
    console.log("hubo un error con la API", error);
  }
};

const getMovie = async (req, res) => {
  try {
    let { id } = req.query;

    var movie = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=3832b93c32749d817ba7fc39076d3398&language=en-US`
    );

    res.status(200).json(movie.data);
  } catch (error) {
    console.log("hubo un error con la API", error);
  }
};

const getMovieDetail = async (req, res) => {
  const cantidadDeMovies = 5;

  try {
    var generosData = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=3832b93c32749d817ba7fc39076d3398&language=en-US`
    );

    res.status(200).json(resultado);
  } catch (error) {
    console.log("hubo un error con la API", error);
  }
};

module.exports = {
  getAllMovies,
  getMovie,
};
