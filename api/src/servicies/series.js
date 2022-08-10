const axios = require("axios");
const {
  Peliculas,
  Series,
  Usuarios,
  ProductosModificados,
} = require("../DB/db");
const { parseador } = require("../utils/utils.js");
const { API_KEY } = process.env;
const API_URL_SERIES = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=es-SP&page=`;
const API_GENRES = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=es-SP`;

const getSeriesInfo = async (req, res) => {
  const paginas = 5;
  let generosAEnviar = {};
  let idGenero;
  var urlImg;
  let seriesAEnviar = [];

  try {
    let generosApi = await axios(API_GENRES);
    let generos = generosApi.data.genres;

    var imagenesConfig = await axios.get(
      "https://api.themoviedb.org/3/configuration?api_key=3832b93c32749d817ba7fc39076d3398"
    );
    urlImg = imagenesConfig.data.images.base_url + "original";

    for (let i = 0; i < generos.length; i++) {
      for (const key in generos[i]) {
        if (typeof generos[i][key] === "number") {
          idGenero = generos[i][key];
        } else if (typeof generos[i][key] === "string") {
          generosAEnviar[idGenero] = generos[i][key];
        }
      }
    }

    for (let o = 0; o < paginas; o++) {
      let seriesApi = await axios(`${API_URL_SERIES}${o + 1}`);

      let series = seriesApi.data.results;
      for (let s = 0; s < series.length; s++) {
        for (let a = 0; a < series[s].genre_ids.length; a++) {
          series[s].genre_ids[a] = generosAEnviar[series[s].genre_ids[a]];
        }

        seriesAEnviar = [...seriesAEnviar, series[s]];
      }
    }

    for (let img = 0; img < seriesAEnviar.length; img++) {
      seriesAEnviar[img].tipo = "serie";
      seriesAEnviar[img].backDropImagen =
        urlImg + seriesAEnviar[img].backdrop_path;
      seriesAEnviar[img].posterImagen = urlImg + seriesAEnviar[img].poster_path;
    }

    return seriesAEnviar;
  } catch (error) {}
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
    const { id } = req.query;

    const allSeries = await axios(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=es-SP`
    );
    var imagenesConfig = await axios.get(
      `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
    );
    urlImg = imagenesConfig.data.images.base_url + "original";

    var generosData = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=es-SP`
    );

    var cast = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=es-SP`
    );

    var castAEnviar = cast.data.cast;

    var videos = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=es-SP`
    );

    var videosAEnviar = videos.data.results;

    var urlVideos = `https://www.youtube.com/embed/`;

    var data_parseado = [allSeries.data];

    var datosAEnviar = parseador(
      data_parseado,
      urlImg,
      generosData,
      castAEnviar,
      videosAEnviar,
      urlVideos
    );

    // console.log("Esto es para obtener la info de los detalles:", serieId)
    res.status(200).json(datosAEnviar);
  } catch (error) {
    console.log(error);
  }
};

const seriePorIdParms = async (req, res) => {
  let { id } = req.params;

  try {
    // console.log('Hola?')
    // const { id, iso1, iso2 } = req.params;
    if (isNaN(id)) {
      const seriesDb = await Series.findOne({
        where: {
          id: id,
        },
      });

      var datosAEnviar = [seriesDb];
    } else {
      const allSeries = await axios(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=es-SP`
      );
      var imagenesConfig = await axios.get(
        `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
      );
      urlImg = imagenesConfig.data.images.base_url + "original";

      var generosData = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=es-SP`
      );
      var cast = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=es-SP`
      );

      var castAEnviar = cast.data.cast;

      var videos = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=es-SP`
      );

      var videosAEnviar = videos.data.results;

      var urlVideos = `https://www.youtube.com/embed/`;

      var data_parseado = [allSeries.data];

      var datosAEnviar = parseador(
        data_parseado,
        urlImg,
        generosData,
        castAEnviar,
        videosAEnviar,
        urlVideos
      );

      let modificado = await ProductosModificados.findOne({
        where: {
          idProducto: id,
        },
      });

      if (modificado) {
        for (const propOriginal in datosAEnviar[0]) {
          for (const propMod in modificado.dataValues.contenido[0]) {
            if (propOriginal === propMod) {
              datosAEnviar[0][propOriginal] =
                modificado.dataValues.contenido[0][propMod];
            }
          }
        }
      }
    }

    res.status(200).json(datosAEnviar);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
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

    if (isNaN(id)) {
      const seriesBd = await Series.findOne({
        where: {
          id: id,
        },
      });

      var datosAEnviar = seriesBd;
    } else {
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
      // console.log(datosAEnviar);.
    }

    res.status(200).json(datosAEnviar);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

//     }

//     res.status(200).json(datosAEnviar);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(error);
//   }
// };

// const postNuevaSerie = async(req,res) => {

//   let {
//     name, //*
//     genre_ids,
//     overview, //*
//     cast, //*
//     runtime, //*
//     release_date, //*
//     episode_run_time,
//     number_of_episodes,
//     posterImagen, //*
//     backDropImagen, //*
//     vote_average, //*
//     popularity, //*
//     tipo,
//   } = req.body;

//   var errores = validate({
//     name,//*
//     genre_ids,//*
//     overview,//*
//     cast,//*
//     episode_run_time,//*
//     popularity,//*
//     backDropImagen, //*
//     posterImagen,//*
//     vote_average,//*
//     number_of_episodes,//*
//     tipo,
//   });

//   if (Object.keys(errores).length !== 0) res.status(400).json(errores);
//   try {
//     if (
//       !name ||
//       !genre_ids ||
//       !overview ||
//       !cast ||
//       !episode_run_time ||
//       !number_of_episodes ||
//       !posterImagen
//     )
//       return res.status(404).send("Falta completar un dato..");

//     const upload = await cloudinary.uploader.upload(posterImagen, {
//       upload_preset: "mf7vmjsa",
//     });
//     const upload2 = await cloudinary.uploader.upload(backDropImagen, {
//       upload_preset: "mf7vmjsa",
//     });
//     if (tipo === "serie") {
//       const response = await Series.create({
//         name,
//         genre_ids,
//         overview,
//         cast,
//         episode_run_time,
//         number_of_episodes,
//         release_date,
//         posterImagen: upload.url,
//         backDropImagen: upload2.url,
//         vote_average,
//         popularity,
//         tipo,
//       });
//       res.status(200).json(response.data);
//     } else {
//       const response = await Peliculas.create({
//         name,
//         genre_ids,
//         overview,
//         cast,
//         runtime,
//         release_date,
//         posterImagen: upload.url,
//         backDropImagen: upload2.url,
//         vote_average,
//         popularity,
//         tipo,
//       });
//       console.log("estoy entrando en el back");
//       res.status(200).json(response.data);
//     }
//   } catch (error) {
//     console.log("hubo un error con la API", error);
//   }

// }

module.exports = {
  infoQuery,
  seriePorId,
  seriePorIdParms,

  // languages,
};
