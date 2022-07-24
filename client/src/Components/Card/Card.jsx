import "../Card/_Card.scss";
import { mostrarImagen } from "../../auxiliares/Funciones";
import { Link } from "react-router-dom"

const Card = ({ resultado, clase }) => {
  const src= mostrarImagen(resultado,"w300")
  
  return (
      <article  className="tarjeta">
      <Link to={`/home/peliculas`}>
        <div className="contenedor-img">
          <img
            src={src}></img>
        </div>
        </Link>
         <h3 className="titulo-resultado">
          {resultado.title ? resultado.title : resultado.name}
        </h3> 
      </article>
  );
};

export default Card;
