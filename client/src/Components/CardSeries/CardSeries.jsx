import React from "react";
<<<<<<< HEAD
import Carousel from "../Carousel/Carousel";
import { useContext } from "react";
import Context from "../../contexto/Context";

function CardSeries({ name, poster }) {
  const lenguajeSeleccionado = useContext(Context).lenguaje;
=======
import { Link } from "react-router-dom";

function CardSeries({ id, name, poster }) {
>>>>>>> a630283ffaa9ac0e0fc19e1c8ff70c839993bd35
  return (
    <Link to={`/home/series/${id}`}>
      <div>
        <div>
          <h1>{name}</h1>
        </div>
        <div>
          <img src={poster} alt="poster" width="200px" height="350px" />
        </div>
      </div>
<<<<<<< HEAD
      <div>
        <img src={poster} alt="poster" width="300px" height="450px" />
      </div>
    </div>
=======
    </Link>
>>>>>>> a630283ffaa9ac0e0fc19e1c8ff70c839993bd35
  );
}
export default CardSeries;
