const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const parseador = (data, urlImg, generosData) => {
  var num;
  let generos = {};
  var resultado = [];

  for (let j = 0; j < generosData.data.genres.length; j++) {
    for (const prop in generosData.data.genres[j]) {
      if (typeof generosData.data.genres[j][prop] === "number") {
        num = generosData.data.genres[j][prop];
      } else if (typeof generosData.data.genres[j][prop] === "string") {
        generos[num] = generosData.data.genres[j][prop];
      }
    }
  }

  for (let index = 0; index < data.length; index++) {
    if (data[index].genre_ids) {
      for (let g = 0; g < data[index].genre_ids.length; g++) {
        data[index].genre_ids[g] = generos[data[index].genre_ids[g] + ""];
      }
    } else if (data[index].genres) {
      data[index].genre_ids = [];

      for (let gd = 0; gd < data[index].genres.length; gd++) {
        data[index].genre_ids.push(data[index].genres[gd].name);
      }
    }

    resultado = [...resultado, data[index]];
  }
  for (let img = 0; img < resultado.length; img++) {
    if (resultado[img].hasOwnProperty("title")) {
      resultado[img].name = resultado[img].title;
      resultado[img].tipo = "pelicula";
    } else {
      resultado[img].tipo = "serie";
    }

    resultado[img].backDropImagen = urlImg + resultado[img].backdrop_path;
    resultado[img].posterImagen = urlImg + resultado[img].poster_path;
  }

  return resultado;
};

const validate = (
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
  number_of_episodes,
  episode_run_time,
  tipo
) => {
  let error = {};
  let regRating = new RegExp(/[0-9]{0,2}/);
  let regCaracteresEspeciales = new RegExp(
    /([@${}[<>,.:;#%^&()`~+=\*\]\-\.\'\"\\\/\|_])+/g
  );
  let regPrimerLetraMayus = new RegExp(/^[A-Z]/);
  let regRelease = new RegExp(
    /[0-9]{0,2}-[0-9]{0,2}-[2]{1,1}[0]{1,1}[2-9]{1,1}[0-9]{1,1}$/
  );

  if (!tipo) {
    error.tipo = "Se debe elegir un tipo";
  } else if (!name) {
    error.name = "Falta ingresar un nombre";
  } else if (!regPrimerLetraMayus.test(name)) {
    error.name = "La primer letra debe ser mayuscula";
  } else if (regCaracteresEspeciales.test(name)) {
    error.name = "Solo se permiten letras en el nombre";
  } else if (name.length > 20) {
    error.name = "Excedido cantidad de caracteres";
  } else if (!genre_ids.length) {
    error.genre_ids = "Debe existir un genero";
  } else if (genre_ids.length === 0) {
    error.genre_ids = "Se debe ingresar al menos un genero";
  } else if (!overview) {
    error.overview = "Falta ingresar una descripcion";
  } else if (!isNaN(overview)) {
    error.overview = "Solo se pueden ingresar letras";
  } else if (!release_date) {
    error.release_date = "Falta ingresar fecha de lanzamiento";
  } else if (!regRelease.test(release_date)) {
    error.released = "La fecha debe tener formato dd-mm-aaaa";
  } else if (!vote_average) {
    error.rating = "Falta ingresar un rating";
  } else if (isNaN(vote_average)) {
    error.rating = "El rating debe ser un valor numerico";
  } else if (!regRating.test(vote_average)) {
    error.rating = "El rating debe ser un valor numerico entre 0 y 5";
  } else if (!cast) {
    error.cast = "El rating debe ser un valor numerico entre 0 y 5";
  } else if (!posterImagen) {
    error.posterImagen = "El rating debe ser un valor numerico entre 0 y 5";
  } else if (!backDropImagen) {
    error.backDropImagen = "El rating debe ser un valor numerico entre 0 y 5";
  } else if (!popularity) {
    error.popularity = "El rating debe ser un valor numerico entre 0 y 5";
  }

  if (tipo && tipo === "serie") {
    if (!number_of_episodes) {
      error.number_of_episodes = "Debe existir un numero de episodio";
    } else if (!episode_run_time) {
      error.episode_run_time = "Debe existir una duracion de episodio";
    }
  } else if (tipo && tipo === "pelicula") {
    if (!runtime) {
      error.runtime = "Debe existir una duracion de pelicula";
    }
  }

  return error;
};

module.exports = {
  parseador,
  validate,
};
