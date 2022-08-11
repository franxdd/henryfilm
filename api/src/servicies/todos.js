const axios = require("axios");
require("dotenv").config();
const { parseador } = require("../utils/utils.js");
const {
  Peliculas,
  ProductosEliminados,
  ProductosModificados,
} = require("../DB/db.js");
const { Series } = require("../DB/db.js");
const { API_KEY } = process.env;

const todos = async (req, res) => {
  let { name, tipo } = req.query;

  try {

    var urlImg;
    var datosParseadosMovies = "";
    var datosParseadosSeries = "";
    var newGetMovies = "";
    var newGetSeries = "";
    var promises = [];

    var imagenesConfig = axios.get(
      `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
    );
    // urlImg = imagenesConfig.data.images.base_url + "original";

    var generosDataMovie = axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=es-SP`
    );

    var generosDataSerie = axios.get(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=es-SP`
    );

    var listaGetMovies1 = axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=es-SP&page=1`
    );
    var listaGetMovies2 = axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=es-SP&page=2`
    );
    var listaGetMovies3 = axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=es-SP&page=3`
    );
    var listaGetMovies4 = axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=es-SP&page=4`
    );
    var listaGetMovies5 = axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=es-SP&page=5`
    );

    //ACA ESTAN LAS SERIES

    var listaGetSeries1 = axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=es-SP&page=1`
    );

    var listaGetSeries2 = axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=es-SP&page=2`
    );

    var listaGetSeries3 = axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=es-SP&page=3`
    );
    var listaGetSeries4 = axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=es-SP&page=4`
    );
    var listaGetSeries5 = axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=es-SP&page=5`
    );

    promises = [
      imagenesConfig,
      generosDataMovie,
      generosDataSerie,
      listaGetMovies1,
      listaGetMovies2,
      listaGetMovies3,
      listaGetMovies4,
      listaGetMovies5,
      listaGetSeries1,
      listaGetSeries2,
      listaGetSeries3,
      listaGetSeries4,
      listaGetSeries5,
    ];

    const resultado = await Promise.all(promises);

    urlImg = resultado[0].data.images.base_url + "original";
    generosDataMovie = resultado[1];
    generosDataSerie = resultado[2];
    newGetMovies = [
      ...resultado[3].data.results,
      ...resultado[4].data.results,
      ...resultado[5].data.results,
      ...resultado[6].data.results,
      ...resultado[7].data.results,
    ];
    newGetSeries = [
      ...resultado[8].data.results,
      ...resultado[9].data.results,
      ...resultado[10].data.results,
      ...resultado[11].data.results,
      ...resultado[12].data.results,
    ];

    // console.log(urlImg)
    // console.log(generosDataMovie.data.genres.length)
    // console.log(generosDataSerie.data.genres.length)
    // console.log(newGetMovies.length)
    // console.log(newGetSeries.length)

    // for (let i = 0; i < cantidad; i++) {
    //   var listaGetMovies = await axios.get(
    //     `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=es-SP&page=${
    //       i + 1
    //     }`
    //   );

    //   newGetMovies = [...newGetMovies, ...listaGetMovies.data.results];
    //   listaGetMovies = "";
    // }

    // for (let j = 0; j < cantidad; j++) {
    //   var listaGetSeries = await axios.get(
    //     `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=es-SP&page=${
    //       j + 1
    //     }`
    //   );

    //   newGetSeries = [...newGetSeries, ...listaGetSeries.data.results];
    //   listaGetSeries = "";
    // }

    const peliculasBd = await Peliculas.findAll();
    const seriesBd = await Series.findAll();

    const moviesEliminadas = await ProductosEliminados.findAll({
      attributes: ["idProducto"],
    });

    var arrMoviesElim = moviesEliminadas.map((m) => {
      return m.dataValues.idProducto;
    });

    const seriesEliminadas = await ProductosEliminados.findAll({
      attributes: ["idProducto"],
    });

    var arrSeriesElim = seriesEliminadas.map((s) => {
      return s.dataValues.idProducto;
    });

    const Modificadas = await ProductosModificados.findAll();

    var arrAuxModificado = Modificadas.map((m) => {
      return m.dataValues;
    });

    datosParseadosMovies = parseador(newGetMovies, urlImg, generosDataMovie);
    datosParseadosSeries = parseador(newGetSeries, urlImg, generosDataSerie);

    datosParseadosMovies = datosParseadosMovies.filter((m) => {
      if (!arrMoviesElim.includes(m.id + "")) {
        return m;
      }
    });

    datosParseadosSeries = datosParseadosSeries.filter((s) => {
      if (!arrSeriesElim.includes(s.id + "")) {
        return s;
      }
    });

    datosParseadosSeries = datosParseadosSeries.map((s) => {
      for (let i = 0; i < arrAuxModificado.length; i++) {
        if (s.id + "" === arrAuxModificado[i].idProducto) {
          s = arrAuxModificado[i].contenido[0];
        }
      }
      return s;
    });

    datosParseadosMovies = datosParseadosMovies.map((m) => {
      for (let i = 0; i < arrAuxModificado.length; i++) {
        if (m.id + "" === arrAuxModificado[i].idProducto) {
          m = arrAuxModificado[i].contenido[0];
        }
      }
      return m;
    });

    var datosAEnviar = [
      ...peliculasBd,
      ...datosParseadosMovies,
      ...seriesBd,
      ...datosParseadosSeries,
    ];

    if (name === "peliculas") {
      var datosPeliculas = [...peliculasBd, ...datosParseadosMovies];

      res.status(200).json(datosPeliculas);
    } else if (name === "series") {
      var datosSeries = [...seriesBd, ...datosParseadosSeries];

      res.status(200).json(datosSeries);
    } else if (name === "caruselPeliculas") {
      var auxobj = {
        results: datosParseadosMovies,
      };

      res.status(200).json(auxobj);
    } else if (name === "caruselSeries") {
      var auxobj = {
        results: datosParseadosSeries,
      };

      res.status(200).json(auxobj);
    } else {
      res.status(200).json(datosAEnviar);
    }
  } catch (error) {
    res.status(200).json(error);
  }
};

module.exports = {
  todos,
};
