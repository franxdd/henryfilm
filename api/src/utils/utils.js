const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
[1,2,3,3,1,3,1,3,1,2,1,2,]

const parseador = (
  data,
  urlImg,
  generosData,
  cast,
  videosAEnviar,
  urlVideos
) => {
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

    if (cast) {
      data[index].cast = [];

      for (let c = 0; c < cast.length; c++) {
        if (cast[c].known_for_department === "Acting") {
          data[index].cast = [...data[index].cast, cast[c].name];
        }
      }
    }

    if (videosAEnviar) {
      data[index].videosAMostrar = [];
      for (let v = 0; v < videosAEnviar.length; v++) {
        if (videosAEnviar[v].site === "YouTube") {
          data[index].videosAMostrar = [
            ...data[index].videosAMostrar,
            urlVideos + videosAEnviar[v].key,
          ];
        }
      }
    }

    resultado = [...resultado, data[index]];
  }
  for (let img = 0; img < resultado.length; img++) {
    if (resultado[img].hasOwnProperty("title")) {
      resultado[img].name = resultado[img].title;
      resultado[img].tipo = "pelicula";
      resultado[img].price = Math.floor(Math.random() * (30 - 10) + 10); //max - min
    } else {
      resultado[img].price = Math.floor(Math.random() * (30 - 10) + 10);
      resultado[img].tipo = "serie";
    }

    resultado[img].backDropImagen = urlImg + resultado[img].backdrop_path;
    resultado[img].posterImagen = urlImg + resultado[img].poster_path;
  }

  return resultado;
};

const validate = ({
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
  tipo,
}) => {
  let error = {};
  let regCaracteresEspeciales = new RegExp(
    /([@${}[<>,.:;#%^&()`~+=\*\]\-\.\'\"\\\/\|_])+/g
  );
  let regPrimerLetraMayus = new RegExp(/^[A-Z]/);
  let regRelease = new RegExp(
    /[0-9]{0,2}-[0-9]{0,2}-[2]{1,1}[0]{1,1}[2-9]{1,1}[0-9]{1,1}$/
  );
  console.log(backDropImagen);
  console.log(backDropImagen !== "Alt");

  if (!name) {
    error.name = "Falta ingresar un nombre";
  } else if (!regPrimerLetraMayus.test(name)) {
    error.name = "La primer letra debe ser mayuscula";
  } else if (regCaracteresEspeciales.test(name)) {
    error.name = "Solo se permiten letras en el nombre";
  } else if (name.length > 20) {
    error.name = "Excedido cantidad de caracteres";
  } else if (!overview) {
    error.overview = "Falta ingresar una descripcion";
  } else if (!isNaN(overview)) {
    error.overview = "Solo se pueden ingresar letras";
  } else if (!release_date) {
    error.release_date = "Falta ingresar fecha de lanzamiento";
  } else if (!regRelease.test(release_date)) {
    error.release_date = "La fecha debe tener formato dd-mm-aaaa";
  } else if (!vote_average) {
    error.vote_average = "Falta ingresar un rating";
  } else if (isNaN(vote_average)) {
    error.vote_average = "El rating debe ser un valor numerico";
  } else if (vote_average < 0 && vote_average > 10) {
    error.vote_average = "El rating debe ser un valor numerico entre 0 y 10";
  } else if (!popularity) {
    error.popularity = "Debe ingresar la popularidad";
  } else if (isNaN(popularity)) {
    error.popularity = "La popuralidad debe ser un numero";
  } else if (!runtime) {
    error.popularity = "Debe ingresar la duracion";
  } else if (isNaN(runtime)) {
    error.popularity = "La duracion debe ser un numero";
  } else if (cast.length === 0) {
    error.cast = "Debe existir al menos un actor/a";
  } else if (cast.includes("")) {
    error.cast = "Debe existir al menos un actor/a";
  } else if (!backDropImagen) {
    error.backDropImagen =
      "Debe existir una opcion para back-image, caso contrario escribir Alt";
  } else if (backDropImagen !== "Alt" && backDropImagen.length < 30) {
    error.backDropImagen = "Ingresar una opcion correcta";
  } else if (!posterImagen) {
    error.posterImagen =
      "Debe existir una opcion para poster,  caso contrario escribir Alt";
  } else if (posterImagen !== "Alt" && posterImagen.length < 30) {
    error.posterImagen = "Ingresar una opcion correcta";
  } else if (!genre_ids.length) {
    error.genre_ids = "Debe existir un genero";
  } else if (genre_ids.length === 0) {
    error.genre_ids = "Se debe ingresar al menos un genero";
  } else if (!tipo) {
    error.tipo = "Se debe seleccionar un tipo";
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
