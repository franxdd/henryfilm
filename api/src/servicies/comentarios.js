const axios = require("axios");
require("dotenv").config();
const { parseador } = require("../utils/utils.js");
const { Comentarios, Usuarios, Peliculas } = require("../DB/db.js");
const { API_KEY } = process.env;





const getComentarios = async (req, res) => {
   
    let {id } = req.params
    // console.log(id)
    // console.log(idSerie)
    

    if(id){

        var comentarios = await Comentarios.findAll({where: {PeliculaId : id }})
    }
    //  else if(id){
        
        
    //     var comentarios = await Comentarios.findAll({where: {SerieId : idSerie }}) 
    // }
    
    
    res.status(200).json(comentarios)



}


const postComentario = async (req, res) => {

    let {username, contenido, puntuacion, idPelicula, idUsuario } = req.body

    try {
        if (
            !username ||
            !contenido ||
            !puntuacion 
          )
            return res.status(404).send("Falta completar un dato..");

            const comentario = await Comentarios.create({
                username,
                contenido,
                puntuacion
                
              });

            comentario.setUsuario(idUsuario)
            comentario.setPelicula(idPelicula)

            res.status(200).json(comentario)

    } catch (error) {

        console.log("hubo un error con la API", error)
    }


}

module.exports = {
    getComentarios,
    postComentario
 
  };
  