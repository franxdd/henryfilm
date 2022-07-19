import axios from 'axios';
const { Peliculas, Series, Usuarios } = require('../DB/db')
const { API_KEY } = process.env;
const API_URL_SERIES = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=`

const getSeriesInfo = async () => {
   const cantPag = 5;

   try {
      const allResults = [];
      let results;
      for (let i = 0; i < cantPag; i++) {
         results = await axios(API_URL_SERIES+`${i + 1}`)
         allResults = [...allResults, results.data]
         results = '';
      }
      res.status(200).json(allResults);
   } catch (error) {
      res.send(error)
   }
}

module.exports = {
   
}