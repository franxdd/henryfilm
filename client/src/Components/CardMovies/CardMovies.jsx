import React from "react";
import { Link } from "react-router-dom";

function CardMovies({ id, name, poster }) {
  return (
    <Link to={`/home/peliculas/${id}`}>
      <div>
        <div>
          <h1>{name}</h1>
        </div>
        <div>
          <img src={poster} alt="poster" width="200px" height="350px" />
        </div>
      </div>
    </Link>
  );
}
export default CardMovies;
