const axios = require("axios")
const { Peliculas, Series, Usuarios } = require('../DB/db')
const { API_KEY } = process.env;
const API_URL_SERIES = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
const API_GENRES = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`


const getSeriesInfo = async (req, res) => {
   const paginas = 5;
   let generosAEnviar = {};
   let idGenero;
   let seriesAEnviar = [];
   // let series

   try {
      let generosApi = await axios(API_GENRES);
      let generos = generosApi.data.genres
      // console.log("generos", generos)
      for (let i = 0; i < generos.length; i++) {
         for (const key in generos[i]) {
            if (typeof generos[i][key] === "number") {
               idGenero = generos[i][key];
             } else if (typeof generos[i][key] === "string") {
               generosAEnviar[idGenero] = generos[i][key];
             }
         }
      }
      // console.log("Generos a Enviar", generosAEnviar)
   
      for (let o = 0; o < paginas; o++) {
         let seriesApi = await axios(`${API_URL_SERIES}${o + 1}`)
         // console.log("Series:", seriesApi.data.results)
         let series = seriesApi.data.results
         for (let s = 0; s < series.length; s++) {
            for (let a = 0; a < series[s].genre_ids.length; a++) {
               series[s].genre_ids[a] = generosAEnviar[series[s].genre_ids[a]]
            }
            // console.log("Quedo?:", series)
            seriesAEnviar = [...seriesAEnviar, series[s]]
         }
         console.log("Series a enviar:", seriesAEnviar)
      }
      res.status(200).send(seriesAEnviar)      
   } catch (error) {
      console.log(error)
   }

}

module.exports = {
   getSeriesInfo
}