import React from "react";
import Carousel from "../Carousel/Carousel";
import { useContext } from "react";
import Context from "../../contexto/Context";

function CardSeries({ name, poster }) {
  const lenguajeSeleccionado = useContext(Context).lenguaje;
  return (
    <div>
      <div>
        <h1>{name}</h1>
      </div>
      <div>
        <img src={poster} alt="poster" width="300px" height="450px" />
      </div>
    </div>
  );
}
export default CardSeries;
