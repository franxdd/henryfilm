const axios = require("axios");
const { Peliculas, Series, Usuarios } = require("../DB/db");
const { parseador } = require("../utils/utils.js");
const { API_KEY } = process.env;
const API_URL_SERIES = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=`;

const API_GENRES = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`;

const getSeriesInfo = async (req, res) => {
  const paginas = 5;
  let generosAEnviar = {};
  let idGenero;
  var urlImg;
  let seriesAEnviar = [];

  try {
    let generosApi = await axios(API_GENRES);
    let generos = generosApi.data.genres;
    console.log("Hola");
    console.log("generos", generos)

    var imagenesConfig = await axios.get(
      "https://api.themoviedb.org/3/configuration?api_key=3832b93c32749d817ba7fc39076d3398"
    );
    urlImg = imagenesConfig.data.images.base_url + "original";

    for (let i = 0; i < generos.length; i++) {
      // console.log(generos)
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
      let seriesApi = await axios(`${API_URL_SERIES}${o + 1}`);
      // console.log("Series:", seriesApi.data.results.slice(0,1))
      let series = seriesApi.data.results;
      for (let s = 0; s < series.length; s++) {
        for (let a = 0; a < series[s].genre_ids.length; a++) {
          series[s].genre_ids[a] = generosAEnviar[series[s].genre_ids[a]];
        }
        // console.log("Quedo?:", series)
        seriesAEnviar = [...seriesAEnviar, series[s]];
      }
    }
    // console.log("Series a enviar:", seriesAEnviar)

    for (let img = 0; img < seriesAEnviar.length; img++) {
      seriesAEnviar[img].tipo = "serie"
      seriesAEnviar[img].backDropImagen =
        urlImg + seriesAEnviar[img].backdrop_path;
      seriesAEnviar[img].posterImagen = urlImg + seriesAEnviar[img].poster_path;
    }

    return seriesAEnviar;
  } catch (error) {
    console.log(error);
  }
};

const getInfoFromDb = async (req, res) => {
  const theInfoFromDb = await Series.findAll({
    includes: {
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return theInfoFromDb.map((e) => {
    return {
      id: e.id,
      name: e.name,
      backDropImagen: e.backDropImagen,
      posterImagen: e.posterImagen,
      vote_average: e.vote_average,
      overview: e.overview,
      episode_run_time: e.episode_run_time,
      genre_ids: e.genre_ids,
      popularity: e.popularity,
      number_of_episodes: e.number_of_episodes,
      cast: e.cast,
    };
  });
};

const allInfo = async (req, res) => {
  const dataFromApi = await getSeriesInfo();
  const dataFromDb = await getInfoFromDb();
  const allTheData = [...dataFromDb, ...dataFromApi];
  return allTheData;
};

const infoQuery = async (req, res) => {
  const { name } = req.query;
  let allSeries = await allInfo();
  // console.log("aaaaaaaaaaaaaaaaaaaaaa", allSeries)
  if (name) {
    const serie = allSeries.filter((s) =>
      s.name.toLowerCase().includes(name.toLowerCase())
    );

    serie.length
      ? res.status(200).send(serie)
      : res.status(404).send("No hay series");
  } else {
    res.status(200).json(allSeries);
  }
};

const seriePorId = async (req, res) => {
  try {
    // console.log('Hola?')
    const { id } = req.query;

    const allSeries = await axios(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
    );
    var imagenesConfig = await axios.get(
      `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
    );
    urlImg = imagenesConfig.data.images.base_url + "original";

    var generosData = await axios.get(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
    );

    var data_parseado = [allSeries.data];

    var datosAEnviar = parseador(data_parseado, urlImg, generosData);

    // console.log("Esto es para obtener la info de los detalles:", serieId)
    res.status(200).json(datosAEnviar);
  } catch (error) {
    console.log(error);
  }
};

const seriePorIdParms = async (req, res) => {
  try {
    // console.log('Hola?')
    const { id } = req.params;

    const allSeries = await axios(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
    );
    var imagenesConfig = await axios.get(
      `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
    );
    urlImg = imagenesConfig.data.images.base_url + "original";

    var generosData = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );

    var data_parseado = [allSeries.data];

    var datosAEnviar = parseador(data_parseado, urlImg, generosData);

    // console.log("Esto es para obtener la info de los detalles:", serieId)
    res.status(200).json(datosAEnviar);
  } catch (error) {
    console.log(error);
  }
};

// const languages = async (req, res) => {
//   var idioma = {}

//   try {
//     console.log("Hola?");
//     const { id } = req.params;
//     const tvLanguages = await axios(
//       `https://api.themoviedb.org/3/tv/${id}/translations?api_key=${API_KEY}`
//     );
//     const languages = tvLanguages.data.translations;
//     // console.log(languages)
//     res.status(200).json(languages)
//   } catch (error) {
//     console.log(error);
//   }
// };

const seriePorIdParmsTrad = async (req, res) => {
  try {
    const { id, iso1, iso2 } = req.params;

    const allSeries = await axios(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=${iso1}-${iso2}`
    );
    var imagenesConfig = await axios.get(
      `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
    );
    urlImg = imagenesConfig.data.images.base_url + "original";
    var generosData = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${iso1}-${iso2}`
    );
    var data_parseado = [allSeries.data];
    var datosAEnviar = parseador(data_parseado, urlImg, generosData);
    console.log(datosAEnviar);
    res.status(200).json(datosAEnviar);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  infoQuery,
  seriePorId,
  seriePorIdParms,
  seriePorIdParmsTrad,
  // languages,
};
