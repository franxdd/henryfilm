const axios = require("axios");
const { Peliculas, Series, Usuarios } = require("../DB/db");
const { parseador, validate } = require("../utils/utils.js");
const { API_KEY } = process.env;

const postNuevaSerie = async (req, res) => {
  let {
    name,
    backDropImagen,
    posterImagen,
    vote_average,
    overview,
    episode_run_time,
    genre_ids,
    popularity,
    number_of_episodes,
    cast,
  } = req.body;

  var errores = validate({
    name,
    backDropImagen,
    posterImagen,
    vote_average,
    overview,
    episode_run_time,
    genre_ids,
    popularity,
    number_of_episodes,
    cast,
  });

  if(errores) res.json(errores);

  if (
    !name ||
    !episode_run_time ||
    !number_of_episodes ||
    !overview ||
    !genre_ids ||
    !cast
  )
    return res.status(404).send("Faltan completar datos.");

  let nuevaSerie = await Series.create({
    name,
    backDropImagen: backDropImagen
      ? backDropImagen
      : "https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg",
    posterImagen: posterImagen
      ? posterImagen
      : "https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg",
    vote_average: vote_average ? vote_average : 0,
    overview,
    episode_run_time: episode_run_time ? episode_run_time : "25-30",
    genre_ids,
    popularity: popularity ? popularity : 0,
    number_of_episodes,
    cast,
  });
  res.status(200).send("Se agrego la serie de forma correcta.", nuevaSerie);
};

const modificarSerie = async (req, res) => {
  // console.log("entro al modificar")
   let{
      name,
      backDropImagen,
      posterImagen,
      vote_average,
      overview,
      episode_run_time,
      genre_ids,
      popularity,
      number_of_episodes,
      cast,
   } = req.body;
   let { id } = req.params;
   try {
      let serieActualizada = await Series.findByPk(id);
      let littleSeries = {
         name,
         backDropImagen,
         posterImagen,
         vote_average,
         overview,
         episode_run_time,
         genre_ids,
         popularity,
         number_of_episodes,
         cast,
      }
      let serieNueva = await serieActualizada.update(littleSeries);
      return res.status(200).send(serieNueva);
   } catch (error) {
      console.log(error);
   }
}

module.exports = {
  postNuevaSerie,
  modificarSerie
};
