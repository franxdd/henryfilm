import "../Card/_Card.scss";
import { mostrarImagen } from "../../auxiliares/Funciones";

const Card = ({ resultado}) => {
  const src= mostrarImagen(resultado,"w300")
  
  return (

      <article  className="tarjeta">
        <div className="contenedor-img">
          <img
            src={src}
            // alt={resultado.title ? resultado.title : resultado.name}
          ></img>
        </div>
         <h3 className="titulo-resultado">
          {resultado.title ? resultado.title : resultado.name}
        </h3> 
      </article>

  );
};

export default Card;
