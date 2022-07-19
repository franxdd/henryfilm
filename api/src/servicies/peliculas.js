const { Peliculas, Usuarios } = require("../DB/db.js");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getAllMovies = async (req, res) => {
    
  const cantidadDeMovies = 5;

  try {
    var resultado = [];
    var newGet;
    for (let i = 0; i < cantidadDeMovies; i++) {
      newGet = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${
          i + 1
        }`
      );

      console.log(resultado)
      resultado = [...resultado, newGet.data];
      
      newGet = "";
    }
    
    res.status(200).json(resultado);
    // newGet = axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=2`)
    // newGet = axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=3`)
    // newGet = axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=4`)
    // newGet = axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=5`)
  } catch (error) {
    console.log("hubo un error con la API", error);
  }
};

console.log('prueba')

module.exports = {
  getAllMovies,
};
