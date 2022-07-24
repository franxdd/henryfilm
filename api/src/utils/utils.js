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
      resultado[img].tipo = "pelicula"
    }else{
      resultado[img].tipo = "serie"

    }

    resultado[img].backDropImagen = urlImg + resultado[img].backdrop_path;
    resultado[img].posterImagen = urlImg + resultado[img].poster_path;
  }

  return resultado;
};



module.exports = {
  parseador,
};
